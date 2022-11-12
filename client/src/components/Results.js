import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import logo from '../img/logo.svg'
import logoPNG from '../img/logo.png'
import H4 from './tokens/H4'
import Label from './tokens/Label'
import { Page, Text, Image, Document, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer"

const Results = () => {
    //redirect to login if no user is logged in
    if(sessionStorage['user'] == null){
        window.open("/","_self")
    }

    var text = `
    Record Date: 2080-03-13

    Ms. Louise Iles is a 70 year old female patient of Dr. Xue here today with first visit with me for several issues.
    Met with PCP in Feb for multiple issues, DM changed from Actos to Metformin, referral to Internal Medicine; GERD/H-pylori,  (on meds, GI consult) HTN (changed from nitrates to Lisinopril) cholesterol, HA (lab done to r/o TA and PMR) Hepatitis
    
    Problems
    Diabetes mellitus : dx late 2060s. No h/o macro or microvascular complications.
    Hypertensive disorder : dx 2060s, was taking atenolol, enalapril and isosorbide in UNITED KINGDOM
    Helicobacter pylori : serology positive 2068 and re-check 2/2080, no Ag done. Given triple therapy Rx by Internal Medicine
    Vitamin D deficiency 
    Hepatitis B antibody present : Had HbsAg+ and HbsAb+ in 2067. LFTs wnl 2067 and 2080
    Osteoarthritis : L knee worst spot
    Gastroesophageal reflux disease : x years, never had EGD. H. pylori serology+`;
    const results  ={
        "token": ["2080-03-13","Louise Iles","70","Dr. Xue","Feb", "2060s", "2060s","UNITED KINGDOM","2068","2/2080","2067","2067","2080"],
        "tag": ["DATE","NAME","AGE", "NAME", "DATE", "DATE", "DATE", "LOC", "DATE","DATE","DATE","DATE","DATE"]
    };
    const user = JSON.parse(sessionStorage.getItem('user'));
    console.log(user);    
    var today = new Date();
    var date = today.toLocaleDateString();
    var time = today.toLocaleTimeString();


    function parseStyle() {
        var rawText = text;
        var styledText = "";
        var lastIndex = 0; 
        results["token"].forEach((token, index) => {
            rawText = rawText.replace(token, "<span class=\"token\"><span class='phi'>"+token+"</span> "+results["tag"][index]+"</span>");
            lastIndex = rawText.lastIndexOf("</span>")
            styledText += rawText.substring(0, lastIndex+7)
            rawText = rawText.slice(lastIndex+7);
        })
        styledText+=rawText;
        return styledText;       
    }

    function redactText() {
        var rawText = text;
        var redactedText = "";
        var lastIndex = 0; 
        results["token"].forEach(token => {
            rawText = rawText.replace(token, "[REDACTED]");
            lastIndex = rawText.lastIndexOf("[REDACTED]")
            redactedText += rawText.substring(0, lastIndex+12)
            rawText = rawText.slice(lastIndex+12);
        })
        redactedText+=rawText;
        return redactedText;    
    }

    function renderAsHTML(){

        return(
          {__html:parseStyle()}
        )
    }

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
            fontSize: 12,
            textAlign: "justify",
            fontFamily: "Times-Roman",
            border: "1px",
            borderColor: "#808080",
            borderRadius: 8,
            padding: "8px 24px"
        },
    });

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
    
  return (

    <div className="flex">
        <div className='row'>
            <img src={logo} className="logo" />
            <H4 text="Electronic Health Record (EHR) De-identification Tool"/>
        </div>
        <div className='row'>
            <Label text="TOKEN CLASSIFICATION PREVIEW" type="lbl-solid"/>
            <hr width="480px"/>
        </div>
        <div className='results-container'>
            <div className="results-container-scroll">
                <p dangerouslySetInnerHTML={renderAsHTML()}></p>
            </div>
        </div>
        <div className='row'>
            <Link className="btn btn-primary" to="/upload">Try Another Document</Link>
            <PDFDownloadLink document={<Export />}><button className="btn btn-primary">Export Redacted Document</button></PDFDownloadLink>
        </div>
    </div>
  )
}

export default Results