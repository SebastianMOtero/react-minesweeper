import React, { useState, useEffect } from 'react';
import { StyledBoard } from './styles/board';
import Cell from './Cell';
import { StateCell, ICell, Position, Difficulty } from '../utils/gameHelpers';

import { GameStates } from './Minesweeper';

interface Props {
    board: ICell[][];
    mines: number;
    setMines: React.Dispatch<React.SetStateAction<number>>
    totalMines: number;
    difficulty: Difficulty;
    setBoard: React.Dispatch<React.SetStateAction<ICell[][]>>
    setGameState: React.Dispatch<React.SetStateAction<GameStates>>;
    gameState: GameStates;
}

export const Board = ({ gameState, setGameState, board, setBoard, setMines, mines, totalMines }: Props) => {
    const [cellsRevealed, setCellsRevealed] = useState(0);
    const [changeCellState, setChangeCellState] = useState(false);

    useEffect(() => {
        if (changeCellState === true) {
            setChangeCellState(false);
        }
    }, [changeCellState])

    const getSurroundingCells = (cell: ICell): ICell[] => {
        const { row, col } = cell.position;
        const cellsArray = [];

        if (col > 0) {
            // left
            cellsArray.push(board[row][col - 1])

            if (row > 0) {
                // top left
                cellsArray.push(board[row - 1][col - 1])
            }

            if (row < board.length - 1) {
                // bottom left
                cellsArray.push(board[row + 1][col - 1])
            }
        }

        if (row > 0) {
            // top
            cellsArray.push(board[row - 1][col])
        }

        if (row < board.length - 1) {
            // bottom
            cellsArray.push(board[row + 1][col])
        }

        if (col < board[0].length - 1) {
            // right
            cellsArray.push(board[row][col + 1])

            if (row > 0) {
                // top right
                cellsArray.push(board[row - 1][col + 1])
            }

            if (row < board.length - 1) {
                // bottom right
                cellsArray.push(board[row + 1][col + 1])
            }
        }

        return cellsArray;
    }

    const emptyCellFound = (cell: ICell) => {
        const surroundingCells = getSurroundingCells(cell);
        let cellChangedToVisible = 0;

        while (surroundingCells.length) {
            const surroundingCell: ICell | undefined = surroundingCells.shift();

            if (typeof surroundingCell !== 'undefined') {
                if (surroundingCell.stateCell === StateCell.Visible) {
                    continue;
                }

                surroundingCell.stateCell = StateCell.Visible;
                cellChangedToVisible++;

                if (surroundingCell?.minesAround === 0) {
                    surroundingCells.push(...getSurroundingCells(surroundingCell));
                }
            }
        }

        setCellsRevealed(prev => prev + cellChangedToVisible);
    }

    useEffect(() => {
        if (gameState === GameStates.PLAYING) {
            const totalCells = board.length * board[0].length;
            if (totalCells - totalMines - cellsRevealed === 0) {
                // flagged the remaining hidden mines
                const newBoard: ICell[][] = JSON.parse(JSON.stringify(board));
                for (let i = 0; i < newBoard.length; i++) {
                    for (let j = 0; j < newBoard[0].length; j++) {
                        if (newBoard[i][j].hasAMine && newBoard[i][j].stateCell !== StateCell.Marked) {
                            newBoard[i][j].stateCell = StateCell.Marked;
                        }
                    }
                }

                setGameState(GameStates.WIN);
                setBoard(prev => newBoard)
                setCellsRevealed(0);
                setMines(0);
            }
        }
    }, [cellsRevealed])


    const handleLeftClick = (e: React.MouseEvent, position: Position) => {
        e.preventDefault();
        const { row, col } = position;
        const cell = board[row][col];

        if (gameState !== GameStates.PLAYING || cell.stateCell !== StateCell.Hidden) {
            return;
        }

        if (cell.stateCell === StateCell.Hidden) {
            if (cell.hasAMine) {
                cell.stateCell = StateCell.Detonated;
                setCellsRevealed(0);
                setGameState(GameStates.GAME_OVER);
            } else {
                cell.stateCell = StateCell.Visible;
                setCellsRevealed(prev => prev + 1);
                // If we found an empty cell, then
                if (cell.minesAround === 0) {
                    emptyCellFound(cell)
                }
            }
        }
    }

    const handleRightClick = (e: React.MouseEvent, position: Position) => {
        e.preventDefault();
        const { row, col } = position;
        const cell = board[row][col];

        if (gameState !== GameStates.PLAYING || cell.stateCell !== StateCell.Hidden && cell.stateCell !== StateCell.Marked && cell.stateCell !== StateCell.Question) {
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

        if (cell.stateCell === StateCell.Question) {
            // we use the hook to re-render the board
            setChangeCellState(true);
        }

        // Hidden => Marked => Question => Hidden
        cell.stateCell = cell.stateCell === StateCell.Hidden
            ? StateCell.Marked
            : cell.stateCell === StateCell.Question
                ? StateCell.Hidden
                : StateCell.Question
            ;
    }

    return (
        <>
            <StyledBoard width={board[0].length} height={board.length}>
                {board.map((row: ICell[], j: number) => row.map((cell: ICell, i: number) =>
                    <Cell
                        key={i}
                        onClick={(e: React.MouseEvent) => handleLeftClick(e, { row: j, col: i })}
                        onContextMenu={(e: React.MouseEvent) => handleRightClick(e, { row: j, col: i })}
                        cell={cell}
                    />
                ))}
            </StyledBoard>
        </>
    )
}