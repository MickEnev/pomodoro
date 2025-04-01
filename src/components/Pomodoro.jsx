import React, { useState, useEffect } from 'react'
import '../css/Pomodoro.css'

export default function Pomodoro() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval;

      interval = setInterval(() => {
        if (isActive) {
          if (seconds > 0) {
            setSeconds((seconds) => seconds - 1);
          } else if (minutes > 0) {
            setMinutes((minutes) => minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);

    return () => clearInterval(interval);
  }, [seconds, minutes, isActive]);


  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSeconds(0);
    setMinutes(25);
  }

  return (
    <div>
      <h1>Timer: {minutes} mins {seconds} secs</h1>
      <button onClick={toggleTimer}>{isActive ? 'Pause' : 'Start'}</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}
