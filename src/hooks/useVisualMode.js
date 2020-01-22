import { useState } from 'react';

export default function useVisualMode(initial) {

  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {

    if (replace === true) {
      const newHistory = history.slice(0, history.length -1);
      return setHistory([...newHistory, newMode])
    }
    setHistory([ ...history, newMode])

  }

  function back() {
    if (history.length === 1) {
      return;
    }

    const newHistory = history.slice(0, history.length -1);
    setHistory(newHistory);
  }
  
  return { mode: history[history.length -1], transition, back };
}