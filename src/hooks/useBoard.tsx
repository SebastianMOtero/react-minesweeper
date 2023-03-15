import { useState } from 'react';

import { createBoard, ICell } from '../utils/gameHelpers';

export const useBoard = (): [ICell[][], React.Dispatch<React.SetStateAction<ICell[][]>>, () => void] => {
    const [board, setBoard] = useState(createBoard(0));

    const newBoard = () => {
        const newBoard = createBoard(0);

        setBoard(prev => [...newBoard]);
    }

    return [board, setBoard, newBoard];
}