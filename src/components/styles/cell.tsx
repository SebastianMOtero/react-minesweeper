import styled from 'styled-components';

import { StateCell, ICell } from '../../utils/gameHelpers';

import flag from '../../img/flag.png';
import mine from '../../img/mine.png';
import question from '../../img/question.png'

interface Props {
    state: ICell;
}

const cellColor = '93, 93, 93'
const redColor = '255, 0, 0';

export const StyledCell = styled.div`
    background: rgba(${(props: Props) => (props.state.stateCell === StateCell.Detonated ? redColor : cellColor)}, 0.6);
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
            : props.state.stateCell === StateCell.Detonated || props.state.stateCell === StateCell.VisibleMine
                ? 'url(' + mine + ')'
                : props.state.stateCell === StateCell.Question
                ? 'url(' + question +')'
                : '')};
    background-size: cover;
    overflow: hidden;
    color: ${(props: Props) => (
        props.state.stateCell === StateCell.Question
            ? 'red'
            : props.state.stateCell === StateCell.Hidden
                ? 'green'
                : 'blue')}
            
            `
