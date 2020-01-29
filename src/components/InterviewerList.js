import React from "react";
import PropTypes from 'prop-types';


import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";

// List of interviewers to be shown for each appointment form

export default function InterviewerList(props) {
  const interviewers = props.interviewers.map(interviewer => {
    return (
    <InterviewerListItem
      key={interviewer.id}
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.interviewer}
      setInterviewer={event => props.setInterviewer(interviewer.id)}
    />
    )
  });

  return (
      <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
<ul className="interviewers__list">{interviewers}</ul> 
</section>
  )
};

InterviewerList.propTypes = {
  interviewer: PropTypes.number,
  setInterviewer: PropTypes.func.isRequired
};