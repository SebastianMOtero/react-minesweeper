import { useState, useEffect } from 'react';

export const Timer = () => {
    const [isActive, setIsActive] = useState(false);
    const [time, setTime] = useState(0);

    useEffect(() => {
        let interval = null;

        if(isActive) {
            interval = setInterval(() => {
                setTime(time => time + 10);
            }, 10);
        }
    }, [isActive])

    const handleStart = () => {
        setIsActive(true);
    }

    const handleReset = () => {
        setIsActive(false);
        setTime(0);
    }

    return [handleReset, handleStart, time];
}