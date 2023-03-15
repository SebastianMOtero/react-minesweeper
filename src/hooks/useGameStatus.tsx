import React, { useState } from 'react';

export const useGameStatus = (): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
    console.log('render useGameStatus')
    const [gameOver, setGameOver] = useState(false);

    console.log(gameOver)
    return [gameOver, setGameOver];
}