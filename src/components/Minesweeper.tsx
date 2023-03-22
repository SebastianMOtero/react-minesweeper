import { useState, useEffect } from 'react';

import { Display } from './Display';
import { StartButton } from './StartButton';
import { Board } from './Board';

import { DifficultyModal } from './DifficultyModal';
import { StyledMinesweeper } from './styles/minesweeper';

import { ICell, StateCell, MINES, Difficulty } from '../utils/gameHelpers'

import { useBoard } from '../hooks/useBoard';

export enum GameStates {
    IDLE,
    SELECT_DIFFICULTY,
    START_GAME,
    PLAYING,
    GAME_OVER,
    WIN
}

const Minesweeper = () => {
    const [board, setBoard, newBoard] = useBoard();
    const [difficulty, setDifficulty] = useState(Difficulty.Easy);
    const [mines, setMines] = useState(MINES[difficulty]);
    const [gameState, setGameState] = useState(GameStates.IDLE);

    useEffect(() => {
        // Initialize game values
        if (gameState === GameStates.START_GAME) {
            setMines(MINES[difficulty])
            setGameState(GameStates.PLAYING);
            newBoard(difficulty);
        }

        // Make mines visible
        if (gameState === GameStates.GAME_OVER) {
            const newBoard: ICell[][] = JSON.parse(JSON.stringify(board));
            for (let row = 0; row < newBoard.length; row++) {
                for (let col = 0; col < newBoard[0].length; col++) {
                    const cell = newBoard[row][col];
                    if (cell.hasAMine && cell.stateCell !== StateCell.Detonated) {
                        cell.stateCell = StateCell.VisibleMine
                    }
                }
            }
            setBoard(prev => newBoard)
        }
    }, [gameState])

    return (
        <>
            <StyledMinesweeper >
                <header> Minesweeper </header>
                <Board board={board} difficulty={difficulty} setMines={setMines} mines={mines}
                    totalMines={MINES[difficulty]} setBoard={setBoard} setGameState={setGameState} gameState={gameState} />
                <aside>
                    {
                        <div className='gameResult'>

                            <h1>{gameState === GameStates.GAME_OVER
                                ? 'GAME OVER'
                                : gameState === GameStates.WIN
                                    ? 'GAME FINISHED'
                                    : ''}</h1>
                        </div>
                    }
                    {gameState === GameStates.GAME_OVER || gameState === GameStates.WIN
                        || gameState === GameStates.PLAYING
                        ?
                        (
                            <div>
                                <h2>Mines: {mines}</h2>
                                <Display gameState={gameState} />
                            </div>
                        )
                        : ''
                    }
                    <StartButton setGameState={setGameState} />
                    {gameState === GameStates.SELECT_DIFFICULTY ? <DifficultyModal setGameState={setGameState} setDifficulty={setDifficulty} /> : ''}
                </aside>
            </StyledMinesweeper>
        </>
    )
}

export default Minesweeper;