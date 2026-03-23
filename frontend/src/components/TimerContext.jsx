import React, { createContext, useContext, useState, useEffect } from 'react';

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [topic, setTopic] = useState('Quantum Mechanics');
    const [mode, setMode] = useState('25');
    const [sessionSavedTick, setSessionSavedTick] = useState(0);

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
        } else if (timeLeft === 0 && isActive) {
            setIsActive(false);
            
            const durationSecs = (parseInt(mode) * 60) - timeLeft;
            const durationMins = Math.floor(durationSecs / 60) || parseInt(mode); 
            fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001/api'}/study-session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-user-id': user.userId || ''
                },
                body: JSON.stringify({ topic, duration: durationMins })
            })
            .then(() => {
                setSessionSavedTick(t => t+1);
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

         fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001/api'}/study-session`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'x-user-id': user.userId || ''
              },
              body: JSON.stringify({ topic, duration: durationMins })
         })
         .then(r => r.json())
         .then(d => {
             if(d.success) {
                 setSessionSavedTick(t => t+1);
                 alert("Session Saved manually!");
                 resetTimer(parseInt(mode));
             }
         })
         .catch(() => alert("Error saving session."));
    };

    return (
        <TimerContext.Provider value={{ 
            timeLeft, isActive, topic, mode, sessionSavedTick,
            setTopic, toggleTimer, resetTimer, handleSaveSessionManually
        }}>
            {children}
        </TimerContext.Provider>
    );
};

export const useTimer = () => useContext(TimerContext);
