import styled from 'styled-components';

interface Props {
    width: number;
    height: number;
}

const calcVW = (width: number) => {
    switch (width) {
        case 8:
            return 25
            break;
        case 16: 
            return 40;
            break;
        case 30:
            return 65;
            break;
        default:
            break;
    }
}
export const StyledBoard = styled.div`
    color: red;
    display: grid;
    grid-template-rows: repeat(${(props: Props) => props.height}, calc(${props => calcVW(props.width)}vw / ${props => props.width}));
    grid-template-columns: repeat(${(props: Props) => props.width}, 1fr);
    grid-gap: 0px;
    border: 2px solid #000;
    max-width: ${props => calcVW(props.width)}vw;
    // width: 100%;
    margin-left: 60px;
`