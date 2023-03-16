import { useState } from 'react';

import { createBoard, ICell, Difficulty } from '../utils/gameHelpers';

export const useBoard = (): [ICell[][], React.Dispatch<React.SetStateAction<ICell[][]>>, (difficulty: Difficulty) => void] => {
    const [board, setBoard] = useState(createBoard(0));

    const newBoard = (difficulty: Difficulty) => {
        const newBoard = createBoard(difficulty);

        setBoard(prev => [...newBoard]);
    }

    return [board, setBoard, newBoard];
}