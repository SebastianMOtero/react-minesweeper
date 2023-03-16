import React from 'react';
import { StyledBoard } from './styles/board';
import Cell from './Cell';
import { StateCell, ICell } from '../utils/gameHelpers';

import { useBoard } from '../hooks/useBoard';

interface Props {
    board: ICell[][];
    gameOver: boolean;
    mines: number;
    setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
    setMines: React.Dispatch<React.SetStateAction<number>>
}

export const Board = ({ board, gameOver, setGameOver, setMines, mines }: Props) => {
    console.debug('render board')

    const [_, setBoard] = useBoard();

    const emptyCellFound = (cell: ICell, position: {row: number, col: number}) => {
        console.log('emptyCellFound');
        console.log(cell)
        console.log(board)
        console.log(position);

        const newBoard: ICell[][] = JSON.parse(JSON.stringify(board));

        const { row, col } = position;
        if (col > 0) {
            // left
            newBoard[row][col-1].stateCell = StateCell.Visible;

            if (row > 0) {
                // top left
                newBoard[row-1][col-1].stateCell = StateCell.Visible;
            }
            
            if (row < board.length-1) {
                // bottom left
                newBoard[row+1][col-1].stateCell = StateCell.Visible;
            }
        }

        if (row > 0) {
            // top
            newBoard[row-1][col].stateCell = StateCell.Visible;
        }

        if (row < board.length-1) {
            // bottom
            newBoard[row+1][col].stateCell = StateCell.Visible;
        }

        if (col < board[0].length-1) {
            // right
            newBoard[row][col+1].stateCell = StateCell.Visible;

            if (row > 0) {
                // top right
                newBoard[row-1][col+1].stateCell = StateCell.Visible;
            }
            
            if (row < board.length-1) {
                // bottom right
                newBoard[row+1][col+1].stateCell = StateCell.Visible;
            }
        }
        console.log(newBoard)
        setBoard(prev => newBoard)
    }

    return (
        <>
            <StyledBoard width={board[0].length} height={board.length}>
                {board.map((row: ICell[], j: number) => row.map((cell: ICell, i: number) =>
                    <Cell key={i} cell={cell} gameOver={gameOver} setGameOver={setGameOver} setMines={setMines} mines={mines} callback={emptyCellFound} position={{row: j, col: i}} />
                ))}
            </StyledBoard>
        </>
    )
}