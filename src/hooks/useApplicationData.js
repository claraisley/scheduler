import { useEffect, useReducer } from 'react';
import axios from "axios";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";

// Loads App data from API calls

export default function useApplicationData() {
  
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // Uses API call to save an interview

function bookInterview(id, interview) {

  const appointment = {
    ...state.appointments[id],
    interview
  };


  return axios.put(`/api/appointments/${id}`, appointment)
    .then(() => {
      dispatch({ type: SET_INTERVIEW, id, interview });
})
}

// Uses API call to cancel interview

function cancelInterview(id) {

const appointment = {
  ...state.appointments[id],
  interview: null
};

return axios.delete(`/api/appointments/${id}`, appointment)
.then(() => {
  dispatch({ type: SET_INTERVIEW, id, interview: null });
})
}


const setDay = day => dispatch({ type: SET_DAY, day });

// Gets all appointments and interviewers for each day from API

useEffect(() => {
  Promise.all([
    axios.get("api/days"),
    axios.get("api/appointments"),
    axios.get("api/interviewers")
   
  ]).then((all) => {
    dispatch(({ type: SET_APPLICATION_DATA, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
  }).catch((error) => {
    console.log(error)
    })
}, [])

return { state, setDay, bookInterview, cancelInterview }

}

