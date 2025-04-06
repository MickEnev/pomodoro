import React, { useState, useEffect, useContext } from 'react'
import PomodoroContext from './contexts/PomodoroContext';
import '../css/Pomodoro.css'

export default function Pomodoro() {
  const {
    minutes,
    seconds,
    isActive,
    state,
    userMinutes,
    userBreakMinutes,
    userLongBreakMinutes,
    pomo,
    loop,
    toggleTimer,
    resetTimer,
    switchSession,
    handleSetMinutes,
    handleSetBreakMinutes,
    handleSetFocus,
    handleSetBreak,
    setUserMinutes,
    setUserBreakMinutes,
    handleSetLongBreak,
    handleSetLongBreakMinutes,
    setUserLongBreakMinutes,
  } = useContext(PomodoroContext);

  return (
    <div className='pomo'>
      <div className='timer-box'>
        <h1 className="state">
          {state === 0 ? 'Focus' : state === 1 ? 'Break' : 'Long Break'}
        </h1>
        <h1 className="time">{minutes < 10 ? `0${minutes}` : minutes} : {seconds < 10 ? `0${seconds}` : seconds}</h1>
        <p># {pomo + loop}</p>
        <div className='button-box'>
          <div className='start-reset-buttons'>
            <button className="button-17" onClick={toggleTimer}>{isActive ? 'Pause' : 'Start'}</button>
            <button className="button-17" onClick={resetTimer}>Reset</button>
          </div>
          <div className='state-buttons'>
            <button className="button-17" onClick={handleSetFocus}>Focus</button>
            <button className="button-17" onClick={handleSetBreak}>Break</button>
            <button className="button-17" onClick={handleSetLongBreak}>Long Break</button>
          </div>
        </div>
      </div>
      <div className='control-box'>
        <div className='session-length-box'>
          <label htmlFor='session-length'>Focus</label>
          <input 
          className="session-length" 
          type='number'
          value={userMinutes}
          onChange={(e) => setUserMinutes(e.target.value)}
          />
          <button className="button-17" onClick={handleSetMinutes}>{'Set'}</button>
        </div>
        <div className='break-length-box'>
          <label htmlFor='break-length'>Break</label>
          <input className="break-length" 
          type='number'
          value={userBreakMinutes}
          onChange={(e) => setUserBreakMinutes(e.target.value)}
          />
          <button className="button-17" onClick={handleSetBreakMinutes}>{'Set'}</button>
        </div>
        <div className='long-break-length-box'>
          <label htmlFor='long-break-length'>Long Break</label>
          <input className="long-break-length" 
          type='number'
          value={userLongBreakMinutes}
          onChange={(e) => setUserLongBreakMinutes(e.target.value)}
          />
          <button className="button-17" onClick={handleSetLongBreakMinutes}>{'Set'}</button>
        </div>
      </div>
      
    </div>
  );
}


// TODO:
// Add alarm sound
// Add a way to reset pomos or keep track of highest pomo?
// Mvp is definitley done tho
// Add feature to change how many intervals are needed for a long break