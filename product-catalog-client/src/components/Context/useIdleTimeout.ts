import { useState, useEffect, useCallback } from 'react';

const useIdleTimeout = (idleTimeout: number, onIdle: () => void) => {
    const [lastActivity, setLastActivity] = useState(Date.now());
    const enableAutoLogout = false;

    const resetTimer = useCallback(() => {
        setLastActivity(Date.now());
    }, []);

    useEffect(() => {
        const handleActivity = () => resetTimer();

        document.addEventListener('mousemove', handleActivity);
        document.addEventListener('keypress', handleActivity);
        document.addEventListener('mousedown', handleActivity);
        document.addEventListener('touchstart', handleActivity);

        return () => {
            document.removeEventListener('mousemove', handleActivity);
            document.removeEventListener('keypress', handleActivity);
            document.removeEventListener('mousedown', handleActivity);
            document.removeEventListener('touchstart', handleActivity);
        };
    }, [resetTimer]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (enableAutoLogout && (Date.now() - lastActivity >= idleTimeout)) {
                onIdle();
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [lastActivity, idleTimeout, onIdle]);

    return resetTimer;
};

export default useIdleTimeout;