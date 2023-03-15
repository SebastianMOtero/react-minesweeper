import styled from 'styled-components';

import { StateCell, ICell } from '../../utils/gameHelpers';

import flag from '../../img/flag.png';
import mine from '../../img/mine.png';

interface Props {
    state: ICell;
}

const cellColor = '93, 93, 93'

export const StyledCell = styled.div`
    background: rgba(${cellColor}, 0.6);
    border: 4px solid #000;
    border-bottom-color: rgba(${cellColor}, 0.8);
    border-right-color: rgba(${cellColor}, 0.8);
    border-top-color: rgba(235, 235, 235, 0.8);
    border-left-color: rgba(235, 235, 235, 0.7);
    width: auto;
    height: auto;
    background-image: ${(props: Props) => (
        props.state.stateCell === StateCell.Marked
            ? 'url(' + flag + ')'
            : props.state.stateCell === StateCell.Detonated
                ? 'url(' + mine + ')'
                : '')};
    background-size: cover;
    overflow: hidden;
    color: ${(props: Props) => (
        props.state.stateCell === StateCell.HiddenMine
            ? 'red'
            : props.state.stateCell === StateCell.Hidden
                ? 'green'
                : 'blue')}
            
            `
