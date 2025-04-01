import React, { useState, useEffect } from 'react'
import '../css/Pomodoro.css'

export default function Pomodoro() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isActive) { 
      intervalId = setInterval(() => {
        setSeconds(prevSeconds => {
          if (prevSeconds === 4) {
            setMinutes(prevMinutes => prevMinutes + 1);
            return 0;
          }
          return prevSeconds + 1
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSeconds(0);
    setMinutes(0);
  }

  return (
    <div>
      <h1>Timer: {minutes} minutes {seconds} seconds</h1>
      <button onClick={toggleTimer}>{isActive ? 'Pause' : 'Start'}</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}
