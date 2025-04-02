import { createContext, useState, useContext, useEffect } from 'react'

const PomodoroContext = createContext()

export const usePomodoroContext = () => useContext(PomodoroContext)

export const PomodoroProvider = ({children}) => {
const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [userMinutes, setUserMinutes] = useState(25);
  const [userBreakMinutes, setUserBreakMinutes] = useState(5);
  const [state, setState] = useState(true);

  useEffect(() => {
    let interval;

      interval = setInterval(() => {
        if (isActive) {
          if (seconds === 0 && minutes === 0) {
            switchSession();
          }
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

  const switchSession = () => {
    setState((prev) => !prev);
    if (state) {
      setMinutes(userBreakMinutes);
    } else {
      setMinutes(userMinutes);
    }
    setSeconds(0);
    setIsActive(true);
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSeconds(0);
    if (state) {
      setMinutes(userMinutes);
    } else {
      setMinutes(userBreakMinutes);
    }
    
  }

  const handleSetMinutes = () => {
    if (state) {
      setMinutes(userMinutes);
      setSeconds(0);
    }
    
  };

  const handleSetBreakMinutes = () => {
    if (!state) {
      setMinutes(userBreakMinutes);
      setSeconds(0);
    }
  }

  const handleSetFocus = () => {
    setState(true);
    setIsActive(false);
    setMinutes(userMinutes);
    setSeconds(0);
  }

  const handleSetBreak= () => {
    setState(false);
    setIsActive(false);
    setMinutes(userBreakMinutes);
    setSeconds(0);
  }

  return (
  <PomodoroContext.Provider
    value={{
        minutes,
        seconds,
        isActive,
        state,
        userMinutes,
        userBreakMinutes,
        toggleTimer,
        resetTimer,
        switchSession,
        handleSetMinutes,
        handleSetBreakMinutes,
        handleSetFocus,
        handleSetBreak,
        setUserMinutes,
        setUserBreakMinutes,
    }}
    >
        {children}
    </PomodoroContext.Provider>
  );
};

export default PomodoroContext;