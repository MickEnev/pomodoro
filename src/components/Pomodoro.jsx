import React, { useState, useEffect, useContext } from 'react'
import PomodoroContext from './contexts/PomodoroContext';
import '../css/Pomodoro.css'

export default function Pomodoro() {
  const {
    minutes,
    seconds,
    isActive,
    state,
    toggleTimer,
    resetTimer,
    handleSetFocus,
    handleSetBreak,
    userMinutes,
    setUserMinutes,
    handleSetMinutes,
    userBreakMinutes,
    setUserBreakMinutes,
    handleSetBreakMinutes,
  } = useContext(PomodoroContext);

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
          <input className="break-length" 
          type='number'
          value={userBreakMinutes}
          onChange={(e) => setUserBreakMinutes(e.target.value)}
          />
          <button onClick={handleSetBreakMinutes}>{'Set'}</button>
        </div>
      </div>
      
    </div>
  );
}


// TODO: Add alarm sound
// Clean up UI
// Display state and time on tab