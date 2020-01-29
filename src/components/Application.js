import React from "react";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointments";
import useApplicationData from "hooks/useApplicationData";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";

// Loads application page with all appointments and days

export default function Application() {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

 
  const intsForDay = getInterviewersForDay(state, state.day);
  const apptsForDay = getAppointmentsForDay(state, state.day);

  const appts = apptsForDay.map(appointment => {

  
    const interview = getInterview(state, appointment.interview);
   
    return (
    <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={intsForDay}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
    />
    )
  })

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
          <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu">
            <DayList
              days={state.days}
              day={state.day}
              setDay={setDay}
            />
            </nav>
              <img
                className="sidebar__lhl sidebar--centered"
                src="images/lhl.png"
                alt="Lighthouse Labs"
              /> 
            </section>

          <section className="schedule">
          {appts}
          <Appointment id="last" time="5pm" />
        </section>
      </main>
  );
}
