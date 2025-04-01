import React, { useState, useEffect } from 'react'
import '../css/Pomodoro.css'

export default function Pomodoro() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [userMinutes, setUserMinutes] = useState(25)
  const [state, setState] = useState(1)

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
    setMinutes(userMinutes);
  }

  const handleSetMinutes = () => {
    setMinutes(userMinutes);
    setSeconds(0);
  };

  const handleSetFocus = () => {
    setState(1)
  }

  const handleSetBreak= () => {
    setState(0)
  }

  return (
    <div className='pomo'>
      <div className='timer-box'>
        {/* TODO: Change this so it says 'Focus' or 'Break' on state change */}
        <h1>{state ? 'Focus' : 'Break'}: {minutes} mins {seconds} secs</h1>
        <div className='button-box'>
          <button onClick={toggleTimer}>{isActive ? 'Pause' : 'Start'}</button>
          <button onClick={resetTimer}>Reset</button>
          <button onClick={handleSetFocus}>Focus</button>
          <button onClick={handleSetBreak}>Break</button>
        </div>
      </div>
      <div className='control-box'>
        <div className='session-length-box'>
          <label htmlFor='session-length'>Session Length</label>
          <input 
          className="session-length" 
          type='number'
          value={userMinutes}
          onChange={(e) => setUserMinutes(e.target.value)}
          />
          <button onClick={handleSetMinutes}>{'Set'}</button>
        </div>
        <div className='break-length-box'>
          <label htmlFor='break-length'>Break Length</label>
          <input className="break-length" type='text'></input>
        </div>
      </div>
      
    </div>
  );
}
