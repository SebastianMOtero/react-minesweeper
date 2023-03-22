import React from 'react';

import { StyledCell } from './styles/cell';
import { StateCell, ICell } from '../utils/gameHelpers'
    ;

interface Props {
    cell: ICell;
    onClick: (e: React.MouseEvent) => void;
    onContextMenu: (e: React.MouseEvent) => void;
}

const Cell = ({ onClick, onContextMenu, cell }: Props) => {
    return (
        <>
            <StyledCell state={cell} onClick={onClick} onContextMenu={onContextMenu} >{
                cell.stateCell === StateCell.Visible && cell.minesAround !== 0 ? cell.minesAround : ''
            }</StyledCell>
        </>
    )
}

export default Cell;