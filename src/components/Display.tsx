import { useEffect, useState } from 'react';

import { GameStates } from './Minesweeper';

interface Props {
    gameState: GameStates;
}

export const Display = ({ gameState }: Props) => {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(true);

    const startStop = (isRunning: boolean) => {
        setRunning(isRunning);
    }

    useEffect(() => {
        if (running) {
            const interval = setInterval(() => {
                setTime(time + 1);
            }, 1000)

            return () => clearInterval(interval);
        }

    }, [time]);

    if (running) {
        switch (gameState) {
            case GameStates.START_GAME:
                startStop(true);
                break;
            case GameStates.GAME_OVER:
            case GameStates.WIN:
                startStop(false);
                break;
            default:
                break;
        }
    }

    return (
        <>
            {`Time: ${Math.floor(time) | time}`}
        </>
    )
}