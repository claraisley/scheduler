export function getAppointmentsForDay(state, day) {

  if (state.days.length === 0) {
    return [];
  } 

  const nameMatch  = state.days.filter(d => d.name === day);
    if (nameMatch.length === 0) {
      return [];
    }
  const dayName = nameMatch[0].appointments;

  const array = [];

  dayName.forEach(apptKey => {
    array.push(state.appointments[apptKey]);

  })
  return array;
}

export function getInterview(state, interview) {

  if (interview === null) {
    return null;
  }
  const interviewerId = interview.interviewer;
  const newInterview = state.interviewers[interviewerId];

   return {student: interview.student, interviewer: newInterview}
}