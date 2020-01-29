import { useState } from 'react';

// Gives state for different modes

export default function useVisualMode(initial) {

  const [history, setHistory] = useState([initial]);

  // Transitions to a new mode and updates state 

  function transition(newMode, replace = false) {
    if (replace) {
      return setHistory(([_, ...newHistory]) => [newMode, ...newHistory]);
    }
    setHistory(history => [ newMode, ...history])
  }

// Goes back to previous state

  function back() {
    if (history.length === 1) {
      return;
    }
    setHistory(([_, ...newHistory]) => newHistory);
  }
  
  return { mode: history[0], transition, back };
}