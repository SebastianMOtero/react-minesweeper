import React, { useState } from 'react';

import { StyledDifficultyModal } from './styles/difficultyModal';

import { ICell, Difficulty } from '../utils/gameHelpers';

interface Props {
    setSelectDifficulty: React.Dispatch<React.SetStateAction<boolean>>;
    setDifficulty: React.Dispatch<React.SetStateAction<Difficulty>>;
}

export const DifficultyModal = ({ setSelectDifficulty, setDifficulty }: Props) => {

    const handleStartGame = (difficulty: Difficulty) => {
        setDifficulty(difficulty);
        setSelectDifficulty(false);
    }

    return(
        <StyledDifficultyModal>
            <button onClick={() => handleStartGame(Difficulty.Easy)}>Easy</button>
            <button onClick={() => handleStartGame(Difficulty.Intermediate)}>Intermeadite</button>
            <button onClick={() => handleStartGame(Difficulty.Expert)}>Hard</button>
        </StyledDifficultyModal>
    )
}