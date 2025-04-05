import { createContext, useState, useContext, useEffect, useRef } from 'react'

const PomodoroContext = createContext()

export const usePomodoroContext = () => useContext(PomodoroContext)

export const PomodoroProvider = ({children}) => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [userMinutes, setUserMinutes] = useState(25);
  const [userBreakMinutes, setUserBreakMinutes] = useState(5);
  const [state, setState] = useState(true);
  
  const endTimeRef = useRef(null);
  
  const switchSession = () => {
    setState((prev) => !prev);
    if (state) {
      setMinutes(userBreakMinutes);
    } else {
      setMinutes(userMinutes);
    }
    setSeconds(0);
    setIsActive(true);
    endTimeRef.current = Date.now() + (state ? userBreakMinutes : userMinutes) * 60000;
  };

  const toggleTimer = () => {
    if (!isActive) {
      endTimeRef.current = Date.now() + minutes * 60000 + seconds * 1000;
    }
    setIsActive(!isActive);
  };

  useEffect(() => {
    let animationFrameId;
    
    if (isActive) {
      if (!endTimeRef.current) {
        endTimeRef.current = Date.now() + minutes * 60000 + seconds * 1000;
      }
      
      const updateTimer = () => {
        if (!isActive) return;
        
        const now = Date.now();
        const remaining = Math.max(0, endTimeRef.current - now);
        
        if (remaining <= 0) {
          setMinutes(0);
          setSeconds(0);
          endTimeRef.current = null;
          switchSession();
          return;
        }
        
        const newMinutes = Math.floor(remaining / 60000);
        const newSeconds = Math.floor((remaining % 60000) / 1000);
        
        setMinutes(newMinutes);
        setSeconds(newSeconds);
        
        animationFrameId = requestAnimationFrame(updateTimer);
      };
      
      animationFrameId = requestAnimationFrame(updateTimer);
    } else {
      endTimeRef.current = null;
    }
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isActive, switchSession]);

  // Dynamically changes the tab title to include time
  useEffect(() => {
    const updateTitle = () => {
      if (isActive) {
        const now = Date.now();
        const remaining = Math.max(0, endTimeRef.current - now);
        const titleMinutes = Math.floor(remaining / 60000);
        const titleSeconds = Math.floor((remaining % 60000) / 1000);
        
        document.title = `${state ? 'Focus' : 'Break'} ${titleMinutes}:${titleSeconds < 10 ? '0' : ''}${titleSeconds}`;
      } else {
        document.title = "PomoTomo";
      }
    };

    let titleInterval = null;

    if (isActive) {
      updateTitle();
      titleInterval = setInterval(updateTitle, 1000);
    } else {
      document.title = "PomoTomo";
    }

    return () => {
      if (titleInterval) {
        clearInterval(titleInterval);
      }
    };
  }, [isActive, state, minutes, seconds]);

  

  const resetTimer = () => {
    setIsActive(false);
    setSeconds(0);
    if (state) {
      if (userMinutes) {
        setMinutes(userMinutes);
      } else {
        setMinutes(25);
      }
    } else {
      if (userBreakMinutes) {
        setMinutes(userBreakMinutes);
      } else {
        setMinutes(5);
      }
    }
    endTimeRef.current = null;
  }

  const handleSetMinutes = () => {
    if (state) {
      if (userMinutes) {
        setMinutes(userMinutes);
      } else {
        setMinutes(25);
      }
      setSeconds(0);
      endTimeRef.current = null;
    }
  };

  const handleSetBreakMinutes = () => {
    if (!state) {
      if (userBreakMinutes) {
        setMinutes(userBreakMinutes);
      } else {
        setMinutes(5);
      }
      setSeconds(0);
      endTimeRef.current = null;
    }
  }

  const handleSetFocus = () => {
    setState(true);
    setIsActive(false);
    if (userMinutes) {
      setMinutes(userMinutes);
    } else {
      setMinutes(25);
    }
    setSeconds(0);
    endTimeRef.current = null;
  }

  const handleSetBreak = () => {
    setState(false);
    setIsActive(false);
    if (userBreakMinutes) {
      setMinutes(userBreakMinutes);
    } else {
      setMinutes(5);
    }
    setSeconds(0);
    endTimeRef.current = null;
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