export function getAppointmentsForDay(state, day) {

  if (state.days.length === 0) {
    return [];
  } 

  const nameMatch  = state.days.filter(d => d.name === day);
    if (nameMatch.length === 0) {
      return [];
    }
   nameMatch[0].appointments;

  const array = [];

  nameMatch[0].appointments.forEach(apptKey => {
    array.push(state.appointments[apptKey]);

  })
  return array;
}
