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
    pomo,
    setUserMinutes,
    handleSetMinutes,
    userBreakMinutes,
    setUserBreakMinutes,
    handleSetBreakMinutes,
  } = useContext(PomodoroContext);

  return (
    <div className='pomo'>
      <div className='timer-box'>
        <h1 className="state">{state ? 'Focus' : 'Break'}</h1>
        <h1 className="time">{minutes < 10 ? `0${minutes}` : minutes} : {seconds < 10 ? `0${seconds}` : seconds}</h1>
        <p># {pomo}</p>
        <div className='button-box'>
          <button className="button-17" onClick={toggleTimer}>{isActive ? 'Pause' : 'Start'}</button>
          <button className="button-17" onClick={resetTimer}>Reset</button>
          <button className="button-17" onClick={handleSetFocus}>Focus</button>
          <button className="button-17" onClick={handleSetBreak}>Break</button>
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
          <button className="button-17" onClick={handleSetMinutes}>{'Set'}</button>
        </div>
        <div className='break-length-box'>
          <label htmlFor='break-length'>Break Length</label>
          <input className="break-length" 
          type='number'
          value={userBreakMinutes}
          onChange={(e) => setUserBreakMinutes(e.target.value)}
          />
          <button className="button-17" onClick={handleSetBreakMinutes}>{'Set'}</button>
        </div>
      </div>
      
    </div>
  );
}


// TODO:
// Add alarm sound
// Add a number to track which pomodoro it is 
// Add long break hellooooo!!
