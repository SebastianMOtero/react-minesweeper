import { useState, useEffect } from 'react';

export const Timer = (): [() => void,() => void,number] => {
    const [isActive, setIsActive] = useState(false);
    const [time, setTime] = useState(0);

    useEffect(() => {
        let interval = null;

        if(isActive) {
            interval = setInterval(() => {
                setTime(time => time + 1);
            }, 1000);
        }
    console.log(time)
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