import React from 'react'
import H1 from './tokens/H1'
import H4 from './tokens/H4'
import Button from './tokens/Button'
import Label from './tokens/Label'
import Input from './tokens/Input'

const Tokens = () => {
  return (
    <div>
        <H1 text="Welcome to"/>
        <H4 text="Electronic Health Record (EHR) De-identification Tool"/>
        <Button title="Export Redacted Document" type="btn-primary"/>      
        <Button title="Doctor" type="btn-secondary"/>     
        <Label text="email" type="lbl-solid"/> 
        <Label text="Don’t have an account yet? Sign up" type="lbl-light"/> 
        <Input type="email" placeholder="johndoe@mail.com"/>
        <Input type="password" placeholder="6 characters required"/>
        <Input type="text" placeholder="John Doe"/>
        <p> Ms. Louise Iles NAME-PATIENT is a 70 AGE year old female patient of Dr. Xue NAME-DOCTOR here today with first visit with me for several issues. Met with PCP in Feb DATE for multiple issues, DM changed from Actos to  Metformin, referral to Internal Medicine; GERD/H-pylori,  (on meds, GI consult) HTN (changed from nitrates to Lisinopril) cholesterol, HA (lab done to r/o TA and PMR) Hepatitis.</p>
    </div>
  )
}

export default Tokens