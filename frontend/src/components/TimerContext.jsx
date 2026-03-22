import React, { createContext, useContext, useState, useEffect } from 'react';

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [topic, setTopic] = useState('Quantum Mechanics');
    const [mode, setMode] = useState('25');

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
        } else if (timeLeft === 0 && isActive) {
            setIsActive(false);
            
            const durationSecs = (parseInt(mode) * 60) - timeLeft;
            const durationMins = Math.floor(durationSecs / 60) || parseInt(mode); 
            fetch('http://localhost:3001/api/study-session', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ topic, duration: durationMins })
            })
            .then(() => {
                alert("Session Finished & Saved successfully!");
                resetTimer(parseInt(mode));
            })
            .catch(console.error);
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft, mode, topic]);

    const toggleTimer = () => setIsActive(!isActive);
    
    const resetTimer = (mins) => {
        setIsActive(false);
        setMode(mins.toString());
        setTimeLeft(mins * 60);
    };

    const handleSaveSessionManually = () => {
         setIsActive(false);
         const durationSecs = (parseInt(mode) * 60) - timeLeft;
         const durationMins = Math.floor(durationSecs / 60) || 1; 

         fetch('http://localhost:3001/api/study-session', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({ topic, duration: durationMins })
         })
         .then(r => r.json())
         .then(d => {
             if(d.success) {
                 alert("Session Saved manually!");
                 resetTimer(parseInt(mode));
             }
         })
         .catch(() => alert("Error saving session."));
    };

    return (
        <TimerContext.Provider value={{ 
            timeLeft, isActive, topic, mode, 
            setTopic, toggleTimer, resetTimer, handleSaveSessionManually
        }}>
            {children}
        </TimerContext.Provider>
    );
};

export const useTimer = () => useContext(TimerContext);
