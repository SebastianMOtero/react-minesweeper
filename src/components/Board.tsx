import React from 'react';
import { StyledBoard } from './styles/board';
import Cell from './Cell';
import { StateCell, ICell } from '../utils/gameHelpers';

interface Props {
    board: ICell[][];
    setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Board = ({ board, setGameOver }: Props) => {
    console.debug('render board')

    return (
    <>
        <StyledBoard width={board[0].length} height={board.length}>
            {board.map((row: ICell[], j: number) => row.map((cell: ICell, i: number) =>
                <Cell key={i} cell={cell} location={{row:j, col:i}}/>
                ))}
        </StyledBoard>
    </>
)
}