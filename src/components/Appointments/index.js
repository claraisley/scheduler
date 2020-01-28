/* eslint-disable react/prop-types */
import React, { Fragment } from 'react'

import "components/Appointments/styles.scss";
import Header from "components/Appointments/Header";
import Show from "components/Appointments/Show";
import Empty from "components/Appointments/Empty";
import Form from "components/Appointments/Form";
import Status from "components/Appointments/Status";
import Confirm from "components/Appointments/Confirm";
import Error from "components/Appointments/Error";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING)
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(() => transition(ERROR_SAVE, true));
  }

  function destroy(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };


    transition(DELETING, true)
    props.cancelInterview(props.id, interview)
    .then(() => transition(EMPTY))
    .catch(() => transition(ERROR_DELETE, true))

  }

  function confirm() {
    transition(CONFIRM)
  }


  return (
    <Fragment>
          <article className="appointment" data-testid="appointment">
          
      <Header 
        time={props.time}
      />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === ERROR_SAVE && <Error message="Could not save interview" onClose={back} />}
      {mode === ERROR_DELETE && <Error message="Could not delete interview" onClose={back} />}
      {mode === EDIT && <Form name={props.interview.student} interviewers={props.interviewers} interviewer={props.interview.interviewer.id} onSave={save} onCancel={back} />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && <Confirm message="Are you sure you want to delete this interview?" onConfirm={destroy} onCancel={back} />}
      {mode === SHOW && props.interview && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={confirm}
        onEdit={() => transition(EDIT)}
      />
    )}
    {mode === CREATE && (
    <Form interviewers={props.interviewers} 
    onSave={save} 
    onCancel={back}
    />
    )}
    </article>
    </Fragment>

  )
}