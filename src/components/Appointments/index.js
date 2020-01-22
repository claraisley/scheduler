import React, { Fragment } from 'react'

import "components/Appointments/styles.scss";
import Header from "components/Appointments/Header";
import Show from "components/Appointments/Show";
import Empty from "components/Appointments/Empty";
import Form from "components/Appointments/Form";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <Fragment>
          <article className="appointment">
      <Header 
        time={props.time}
      />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
      />
    )}
    {mode === CREATE && (
    <Form interviewers={props.interviewers} 
    onSave={props.onSave} 
    onCancel={() => back(EMPTY)}
    />
    )}
    </article>
    </Fragment>

  )
}