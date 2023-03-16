import React from 'react';

import { StyledCell } from './styles/cell';
import { StateCell, ICell } from '../utils/gameHelpers'

import { useBoard } from '../hooks/useBoard';

interface Props {
    cell: ICell;
    gameOver: boolean;
    mines: number;
    setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
    setMines: React.Dispatch<React.SetStateAction<number>>;
    callback: (cell: ICell, position: {row: number, col: number}) => void;
    position: {
        row: number,
        col: number;
    }
}

const Cell = ({ cell, gameOver, setGameOver, setMines, mines, callback, position }: Props) => {
    // console.log('renderCell')
    const [board, setBoard] = useBoard();

    const updateBoard = () => {
        const newBoard: ICell[][] = JSON.parse(JSON.stringify(board));
        setBoard(prev => newBoard);
    }

    const leftClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (gameOver || cell.stateCell !== StateCell.Hidden) {
            return;
        }

        if (cell.stateCell === StateCell.Hidden) {
            if (cell.hasAMine) {
                cell.stateCell = StateCell.Detonated;
                setGameOver(true);
            } else {
                cell.stateCell = StateCell.Visible;
                if (cell.minesAround === 0) {
                    callback(cell, position);
                }
            }
            updateBoard();
        }
    }

    const rightClick = (e: React.MouseEvent) => {
        e.preventDefault();

        if (gameOver || cell.stateCell !== StateCell.Hidden && cell.stateCell !== StateCell.Marked && cell.stateCell !== StateCell.Question) {
            return;
        }

        if (cell.stateCell === StateCell.Hidden) {
            // the cell will be flagged so we check if theres remaining mines
            if (mines === 0) {
                return;
            }
            
            // we decrement remaining mines
            setMines(prev => prev - 1);
        } 

        if (cell.stateCell === StateCell.Marked) {
            // we increment remaining mines
            setMines(prev => prev + 1);
        }

        // Hidden => Marked => Question => Hidden
        cell.stateCell = cell.stateCell === StateCell.Hidden 
            ? StateCell.Marked 
            : cell.stateCell === StateCell.Question 
            ? StateCell.Hidden
            : StateCell.Question
        updateBoard();
    }

    return (
        <StyledCell state={cell} onClick={(e) => { leftClick(e) }} onContextMenu={(e) => { rightClick(e) }} >{
            cell.stateCell === StateCell.Visible ? cell.minesAround : ''
        }</StyledCell>
    )
}

export default Cell;