import React, { Fragment } from 'react'

import "components/Appointments/styles.scss";
import Header from "components/Appointments/Header";
import Show from "components/Appointments/Show";
import Empty from "components/Appointments/Empty";

export default function Appointment(props) {

  return (
    <Fragment>
          <article className="appointment">
      <Header 
        time={props.time}
      />
      {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty />}
    </article>
    </Fragment>

  )
}