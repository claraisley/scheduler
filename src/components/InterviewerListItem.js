import React from "react";
import "components/InterviewerListItem.scss";

import classnames from 'classnames';

// Renders the list of interviewers, shows the name and picture of selected interviewer

export default function DayListItem(props) {

  const interviewerClass = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });
  return (
    <li id={props.id} className={interviewerClass} onClick={props.setInterviewer}>
    <img
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
    />
      {props.selected && props.name}
    </li>
  );
}
