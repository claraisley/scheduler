import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointments";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";


   

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

    function bookInterview(id, interview) {
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, {interview})
      .then(() => {
    setState({
      ...state,
      appointments
    })
  }).catch((error) => {
    console.log(error)
  })
}

  function cancelInterview(id) {

  const appointment = {
    ...state.appointments[id],
    interview: null
  };

  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

  return axios.delete(`/api/appointments/${id}`)
  .then(() => {
setState({
  ...state,
  appointments
})
}).catch((error) => {
console.log(error)
})
}

  const setDay = day => setState({ ...state, day });


  useEffect(() => {
    Promise.all([
      axios.get("api/days"),
      axios.get("api/appointments"),
      axios.get("api/interviewers")
     
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, [])
  
 
  const intsForDay = getInterviewersForDay(state, state.day);
  const apptsForDay = getAppointmentsForDay(state, state.day);

  const appts = apptsForDay.map(appointment => {

  
    const interview = getInterview(state, appointment.interview);
    console.log(bookInterview)
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
