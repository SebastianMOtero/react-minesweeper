import React, { useState, createContext } from 'react';

import { Display } from './Display';
import { StartButton } from './StartButton';
import { Board } from './Board';

import { StyledMinesweeper } from './styles/minesweeper';

import { useBoard } from '../hooks/useBoard';

const GameOverContext = createContext(12);

const Minesweeper = () => {
    console.log('render Minesweeper');

    const [board, setBoard, newBoard] = useBoard();
    const [gameOver, setGameOver] = useState(true);

    const startGame = () => {
        setGameOver(false)
        newBoard();
    }

    return (
        <StyledMinesweeper>
            <GameOverContext.Provider value={12}>
            <header> Minesweeper </header>
            <h1>{gameOver ? 'game over' : 'playing'}</h1>
            <Board board={board} setGameOver={setGameOver}/>
            <aside>
                <Display />
                <StartButton startGame={startGame} />
            </aside>
            </GameOverContext.Provider>
        </StyledMinesweeper>

    )

}

export default Minesweeper;