import React from 'react';

import { StyledCell } from './styles/cell';
import { StateCell, ICell } from '../utils/gameHelpers'

import { useBoard } from '../hooks/useBoard';

interface Props {
    cell: ICell;
    location: {
        row: number,
        col: number
    }
}

const Cell = ({ cell, location }: Props) => {
    const [board, setBoard] = useBoard();

    const updateBoard = () => {
        const newBoard: ICell[][] = JSON.parse(JSON.stringify(board));
        setBoard(prev => newBoard);
    }

    const leftClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (cell.stateCell !== StateCell.Hidden) {
            return;
        }

        if (cell.stateCell === StateCell.Hidden) {
            if (cell.hasAMine) {
                cell.stateCell = StateCell.Detonated;
                updateBoard();
                // TODO gameover
            } else {
                cell.stateCell = StateCell.Visible;
                updateBoard();
            }
        }
    }

    const rightClick = (e: React.MouseEvent) => {
        e.preventDefault();

        if (cell.stateCell !== StateCell.Hidden && cell.stateCell !== StateCell.Marked) {
            return;
        }

        cell.stateCell = cell.stateCell === StateCell.Hidden ? StateCell.Marked : StateCell.Hidden;
        updateBoard();
    }

    return (
        <StyledCell state={cell} onClick={(e) => { leftClick(e) }} onContextMenu={(e) => { rightClick(e) }} >{
            cell.stateCell === StateCell.Visible ? cell.minesAround : ''
        }</StyledCell>
    )
}

export default Cell;