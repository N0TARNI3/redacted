import React from 'react'
import logo from '../img/logo.svg'
import folder from '../img/folder.png'
import H4 from './tokens/H4'
import Button from './tokens/Button'
import Label from './tokens/Label'
import H1 from './tokens/H1'

const Results = () => {
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
            <p>
                Ms. <span className="token"><span className='phi'>Louise Iles</span> NAME</span> is a 70 AGE year old female patient of <span className="token"><span className='phi'>Dr. Xue</span> NAME</span> here today with first visit with me for several issues. Met with PCP in Feb DATE for multiple issues, DM changed from Actos to  Metformin, referral to Internal Medicine; GERD/H-pylori,  (on meds, GI consult) HTN (changed from nitrates to Lisinopril) cholesterol, HA (lab done to r/o TA and PMR) Hepatitis.

                Problems
                Diabetes mellitus : dx late <span className="token"><span className='phi'>2060s</span> DATE</span>. No h/o macro or microvascular complications.
                Hypertensive disorder : dx <span className="token"><span className='phi'>2060s</span> DATE</span>, was taking atenolol and isosorbide in <span className="token"><span className='phi'>UNITED KINGDOM</span> LOC</span>
                Helicobacter pylori : serology positive 2068 and re-check 2/2080, no Ag done. Given triple therapy Rx by Internal Medicine

                Hepatitis B antibody present : Had HbsAg+ and HbsAb+ in <span className="token"><span className='phi'>2067</span> DATE</span>. LFTs wnl <span className="token"><span className='phi'>2067</span> DATE</span> and <span className="token"><span className='phi'>2080</span> DATE</span>.
            </p>
        </div>
        <div className='row'>
            <Button title="Try Another Document" type="btn-primary"/>
            <Button title="Export Redacted Document" type="btn-primary"/>
        </div>
    </div>
  )
}

export default Results