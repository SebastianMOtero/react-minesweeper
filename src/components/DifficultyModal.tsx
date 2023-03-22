import React from 'react';

import { StyledDifficultyModal } from './styles/difficultyModal';

import { Difficulty } from '../utils/gameHelpers';

import { GameStates } from './Minesweeper';

interface Props {
    setGameState: React.Dispatch<React.SetStateAction<GameStates>>;
    setDifficulty: React.Dispatch<React.SetStateAction<Difficulty>>;
}

export const DifficultyModal = ({ setGameState, setDifficulty }: Props) => {
    const handleStartGame = (difficulty: Difficulty) => {
        setDifficulty(difficulty);
        setGameState(GameStates.START_GAME);
    }

    return (
        <StyledDifficultyModal>
            <div className='modal1'>
                <h1>Select difficulty:</h1>
                <div className='difficultyButtons'>
                    <button onClick={() => handleStartGame(Difficulty.Easy)}>Easy</button>
                    <button onClick={() => handleStartGame(Difficulty.Intermediate)}>Intermediate</button>
                    <button onClick={() => handleStartGame(Difficulty.Expert)}>Hard</button>
                </div>
                <button onClick={() => setGameState(GameStates.IDLE)}>Cancel</button>
            </div>
        </StyledDifficultyModal>
    )
}