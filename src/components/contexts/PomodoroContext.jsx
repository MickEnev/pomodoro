import { createContext, useState, useContext, useEffect, useRef, use } from 'react'

const PomodoroContext = createContext()

export const usePomodoroContext = () => useContext(PomodoroContext)

export const PomodoroProvider = ({children}) => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [userMinutes, setUserMinutes] = useState(25);
  const [userBreakMinutes, setUserBreakMinutes] = useState(5);
  const [userLongBreakMinutes, setUserLongBreakMinutes] = useState(25);
  const [state, setState] = useState(0);
  const [pomo, setPomo] = useState(1);
  const [loop, setLoop] = useState(0);
  
  const endTimeRef = useRef(null);
  
  const switchSession = () => {
    
    let nextState;
    let nextPomo = pomo;
    
    if (state === 0) {
      if (pomo >= 4) {
        nextState = 2;
        nextPomo = 1;
        console.log('Switching to long break');
      } else {
        nextState = 1;
        
        console.log(`Switching to short break, next pomo will be ${nextPomo + 1}`);
      }
    } else {
      nextState = 0;
      nextPomo = pomo + 1;
      console.log(`Switching to focus mode, pomo ${nextPomo}`);
    }

    if (nextState === 2) {
      setLoop(loop => loop + 3);
    }
    
    setState(nextState);
    setPomo(nextPomo);
    
    if (nextState === 0) {
      setMinutes(userMinutes);
    } else if (nextState === 1) {
      setMinutes(userBreakMinutes);
    } else {
      setMinutes(userLongBreakMinutes);
    }

    setSeconds(0);
    setIsActive(true);
    
    const minutesToUse = nextState === 0 
      ? userMinutes 
      : nextState === 1 
        ? userBreakMinutes 
        : userLongBreakMinutes;
        
    endTimeRef.current = Date.now() + minutesToUse * 60000;
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
    // Update title independently of clock
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
    if (state == 0) {
      if (userMinutes) {
        setMinutes(userMinutes);
      } else {
        setMinutes(25);
      }
    } else if (state == 1) {
      if (userBreakMinutes) {
        setMinutes(userBreakMinutes);
      } else {
        setMinutes(5);
      }
    } else {
      if (userLongBreakMinutes) {
        setMinutes(userLongBreakMinutes);
      } else {
        setMinutes(25);
      }
    }
    endTimeRef.current = null;
  }

  const handleSetMinutes = () => {
    if (state == 0) {
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
    if (state == 1) {
      if (userBreakMinutes) {
        setMinutes(userBreakMinutes);
      } else {
        setMinutes(5);
      }
      setSeconds(0);
      endTimeRef.current = null;
    }
  }

  const handleSetLongBreakMinutes = () => {
    if (state == 2) {
      if (userLongBreakMinutes) {
        setMinutes(userLongBreakMinutes);
      } else {
        setMinutes(25);
      }
      setSeconds(0);
      endTimeRefcurrent = null;
    }
  }

  const handleSetFocus = () => {
    setState(0);
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
    setState(1);
    setIsActive(false);
    if (userBreakMinutes) {
      setMinutes(userBreakMinutes);
    } else {
      setMinutes(5);
    }
    setSeconds(0);
    endTimeRef.current = null;
  }

  const handleSetLongBreak = () => {
    setState(2);
    setIsActive(false);
    if (userLongBreakMinutes) {
      setMinutes(userLongBreakMinutes);
    } else {
      setMinutes(25);
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
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
};

export default PomodoroContext;