export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";


export function getDayIndexByAppointmentId(state, id) {
  
  for (let day of state.days) {
    if (day.appointments.includes(id)) {
      return state.days.indexOf(day);
    }
  }
}

export default function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.day }
    case SET_APPLICATION_DATA:
      return { ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers }
    case SET_INTERVIEW: {
      const { id, interview } = action;
      const dayIndex = getDayIndexByAppointmentId(state, action.id);
      const newDays = [...state.days];
      newDays[dayIndex] = {...newDays[dayIndex], spots: newDays[dayIndex].spots + (action.interview ? - 1 : 1)};

      return    { ...state,
      appointments: {
        ...state.appointments,
        [id]: {
          ...state.appointments[action.id],
          interview:action.interview ? { ...interview } : null
        }
      },
      days: newDays
    }
  }
  default:
    throw new Error(
      `Tried to reduce with unsupported action type: ${action.type}`
    );
  }
}