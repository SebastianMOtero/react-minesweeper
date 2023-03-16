import React, { useState, createContext, useEffect } from 'react';

import { Display } from './Display';
import { StartButton } from './StartButton';
import { Board } from './Board';
import { Timer } from './Timer';
import { DifficultyModal } from './DifficultyModal';

import { StyledMinesweeper } from './styles/minesweeper';

import {ICell, StateCell } from '../utils/gameHelpers'

import { useBoard } from '../hooks/useBoard';

const GameOverContext = createContext(12);

const Minesweeper = () => {
    console.log('render Minesweeper');

    const [board, setBoard, newBoard] = useBoard();
    const [gameOver, setGameOver] = useState(true);
    const [startGame, setStartGame] = useState(false);
    const [mines, setMines] = useState(10);
    const [handleReset, handleStart, time] = Timer();
    const [selectDifficulty, setSelectDifficulty] = useState(false);
    const [difficulty, setDifficulty] = useState(0);

    // console.log(time);

    const handleStartGame = () => {
        setGameOver(false);
        setStartGame(true);
        // setSelectDifficulty(true);
        newBoard(difficulty);
        // handleStart()
        // if (typeof handleStart !== 'number') handleStart()
    }

    useEffect(() => {
        console.log('difficulty use effect')
        setGameOver(false);
        setStartGame(true);
        // setSelectDifficulty(true);
        newBoard(difficulty);
    }, [difficulty])

    useEffect(() => {
        console.log('useEffect')
        if (gameOver && startGame) {
            const newBoard: ICell[][] = JSON.parse(JSON.stringify(board));
            for (let row = 0; row < newBoard.length; row++) {
                for (let col = 0; col < newBoard[0].length; col++) {
                    const cell = newBoard[row][col];
                    if(cell.hasAMine && cell.stateCell !== StateCell.Detonated) {
                        cell.stateCell = StateCell.VisibleMine
                    }
                }
                
            }
            setBoard(prev => newBoard)
            setStartGame(false);
        }

    }, [gameOver])

    return (
        <>
            <header> Minesweeper </header>
        <StyledMinesweeper>
            {/* <GameOverContext.Provider value={12}> */}
            <Board board={board} gameOver={gameOver} setGameOver={setGameOver} setMines={setMines} mines={mines}/>
            <aside>
                <h1>{gameOver ? 'game over' : 'playing'}</h1>
                <Display time={time}/>
                <h2>Remaining mines: {mines}</h2>
                {/* <StartButton startGame={handleStartGame} /> */}

                <StartButton setSelectDifficulty={setSelectDifficulty}/>

                {selectDifficulty ? <DifficultyModal setSelectDifficulty={setSelectDifficulty} setDifficulty={setDifficulty}/>: ''}
            </aside>
            {/* </GameOverContext.Provider> */}
        </StyledMinesweeper>
                </>

    )

}

export default Minesweeper;