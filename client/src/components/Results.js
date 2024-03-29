/* 
Program:        Login.js
Programmer/s:   Arnie Fraga
Description:    React component for the results section of the web app
Date Written:   Oct. 03, 2022
Last Modified:  Feb. 15, 2023
Data:           React Components, HTML DOM Elements (FormData),
                React Router DOM objects, React-PDF objects, JSON Objects
*/

//Import needed components and libraries
import {Link} from 'react-router-dom'
import logo from '../img/logo.svg'
import logoPNG from '../img/logo.png'
import H4 from './tokens/H4'
import Label from './tokens/Label'
import { Page, Text, Image, Document, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer"

//Main React Component object
const Results = () => {
    //redirect to login if no user is logged in
    if(sessionStorage['user'] == null){
        window.open("/","_self")
    }

    //States and variables for this component, mainly for document content
    var text = sessionStorage.getItem('text');
    var results = JSON.parse(sessionStorage.getItem('results'));
    const user = JSON.parse(sessionStorage.getItem('user'));
    const isNotDoctor = !(user.role === 'Doctor');   
    var today = new Date();
    var date = today.toLocaleDateString();
    var time = today.toLocaleTimeString();

    //Function that applies style to the tokens and labels
    function parseStyle() {
        var rawText = text.replaceAll("\n", " ");
        rawText = rawText.replaceAll(/  +/g," ");
        var styledText = "";
        var lastIndex = 0;
        results.data.labels.forEach((labels, index) => {
            if(results.data.tags[index] === "NAME"){
                if((rawText.charAt(rawText.lastIndexOf(labels)-4) === 'D' && (rawText.charAt(rawText.lastIndexOf(labels)-3) === 'r')) || 
                   (rawText.charAt(rawText.lastIndexOf(labels)+labels.length+2) === 'M' || rawText.charAt(rawText.lastIndexOf(labels)+labels.length+1) === 'M')) {
                    rawText = rawText.replace(labels, "<span class=\"token\"><span class='phi'>"+labels+"</span> "+results.data.tags[index]+"-DOCTOR</span>");
                } else {
                    rawText = rawText.replace(labels, "<span class=\"token\"><span class='phi'>"+labels+"</span> "+results.data.tags[index]+"-PATIENT</span>");
                }
            } else {
                rawText = rawText.replace(labels, "<span class=\"token\"><span class='phi'>"+labels+"</span> "+results.data.tags[index]+"</span>");
            }
            lastIndex = rawText.lastIndexOf("</span>")
            styledText += rawText.substring(0, lastIndex+8)
            rawText = rawText.slice(lastIndex+8);
        })
        styledText+=rawText;
        return styledText;       
    }

    //Function that renders a string as HTML elements
    function renderAsHTML(){
        return(
          {__html:parseStyle()}
        )
    }

    //Function that changes tagged PHIs into redacted form
    function redactText() {
        var rawText = text;
        var redactedText = "";
        var lastIndex = 0; 
        results.data.labels.forEach((labels, index) => {
            //Additional Redaction Levels
            if((user.role === "Nurse Assistant") && (results.data.tags[index] === "NAME" || results.data.tags[index] === "AGE" || results.data.tags[index] === "CONTACT")) {
                return;
            } else if ((user.role === "Nurse") && (results.data.tags[index] === "NAME" || results.data.tags[index] === "AGE" || results.data.tags[index] === "CONTACT" || results.data.tags[index] === "DATE")){
                return;
            } else if ((user.role === "Secretary") && (results.data.tags[index] === "NAME" || results.data.tags[index] === "LOCATION" || results.data.tags[index] === "CONTACT" || results.data.tags[index] === "ID")){
                return;
            }

            if(results.data.tags[index] === "NAME"){
                if((rawText.charAt(rawText.lastIndexOf(labels)-4) === 'D' && (rawText.charAt(rawText.lastIndexOf(labels)-3) === 'r')) || 
                   (rawText.charAt(rawText.lastIndexOf(labels)+labels.length+2) === 'M' || rawText.charAt(rawText.lastIndexOf(labels)+labels.length+1) === 'M')){
                    rawText = rawText.replace(labels, "["+results.data.tags[index]+"-DOCTOR]");
                    lastIndex = rawText.lastIndexOf("["+results.data.tags[index]+"-DOCTOR]")
                } else {
                    rawText = rawText.replace(labels, "["+results.data.tags[index]+"-PATIENT]");
                    lastIndex = rawText.lastIndexOf("["+results.data.tags[index]+"-PATIENT]")
                }
            } else {
                rawText = rawText.replace(labels, "["+results.data.tags[index]+"]");
                lastIndex = rawText.lastIndexOf("["+results.data.tags[index]+"]")
            }
            redactedText += rawText.substring(0, lastIndex+results.data.tags[index].length+2)
            console.log(redactedText);
            rawText = rawText.slice(lastIndex+results.data.tags[index].length+2);
            console.log(rawText);
        })
        redactedText+=rawText;
        return redactedText;    
    }

     //Stylesheet for the document to be exported
    const styles = StyleSheet.create({
        logo: {
            height: 40,
            width: 160.49,
            margin: "0 auto"
        },
        subheading: {
            margin: 12,
            fontSize: 16,
            textAlign: "center"
        },
        body: {
            paddingTop: 65,
            paddingBottom: 65,
            paddingHorizontal: 35,
        },
        subtitle: {
            margin: 12,
            fontSize: 12,
            textAlign: "center"
        },
        redactedText: {
            margin: 12,
            fontSize: 10,
            textAlign: "justify",
            fontFamily: "Times-Roman",
            border: "1px",
            borderColor: "#808080",
            borderRadius: 8,
            padding: "8px 24px"
        },
    });

    //Function for parsing the redacted text into PDF format
    const Export = () => (        
    <Document>
        <Page style={styles.body}>
            <Image src={logoPNG} style={styles.logo}/>
            <Text style={styles.subheading}>Electronic Health Record (EHR) De-identification Tool</Text>
            <Text style={styles.subtitle}>
                Redacted by: {user.first_name +" "+user.last_name}                            Date: {date}      Time: {time}
            </Text>
            <Text style={styles.redactedText}>
                {redactText()}
            </Text>
            <Text style={styles.subtitle}>FOR RESEARCH PURPOSES ONLY</Text>
        </Page>
    </Document>
    );
   
  //HTML to be rendered for this component  
  return (
    <div className="flex">
        <div className='row'>
            <img src={logo} className="logo" alt="logo"/>
            <H4 text="Electronic Health Record (EHR) De-identification Tool"/>
        </div>
        <div className='row'>
            <Label text="TOKEN CLASSIFICATION PREVIEW" type="lbl-solid"/>
            <hr width="480px"/>
        </div>
        <div className='results-container'>
            <div className="results-container-scroll">
                <p dangerouslySetInnerHTML={renderAsHTML()} className="results"></p>
            </div>
        </div>
        <div className='row'>
            <Link className="btn btn-primary" to="/upload">Try Another Document</Link>
            {isNotDoctor ? (
                <PDFDownloadLink document={<Export />} fileName={"REDACTED-"+date+"-"+time}><button className="btn btn-primary">Export Redacted Document</button></PDFDownloadLink>
            ):(null)}    
        </div>
    </div>
  )
}

export default Results