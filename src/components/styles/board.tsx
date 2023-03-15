import styled from 'styled-components';

interface Props {
    width: number;
    height: number;
}

export const StyledBoard = styled.div`
    color: red;
    display: grid;
    grid-template-rows: repeat(${(props: Props) => props.height}, calc(25vw / ${props => props.width}));
    grid-template-columns: repeat(${(props: Props) => props.width}, 1fr);
    grid-gap: 0px;
    border: 2px solid #000;
    max-width: 25vw;
    width: 100%;
    margin-left: 60px;
`