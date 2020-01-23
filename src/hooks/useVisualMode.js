import { useState } from 'react';

export default function useVisualMode(initial) {

  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    console.log("transition", newMode, history);
    if (replace) {
      return setHistory(([_, ...newHistory]) => [newMode, ...newHistory]);
    }
    setHistory(history => [ newMode, ...history])

  }

  function back() {
    if (history.length === 1) {
      return;
    }
    console.log("going back", history);
    setHistory(([_, ...newHistory]) => newHistory);
  }
  
  return { mode: history[0], transition, back };
}