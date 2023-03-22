import styled from 'styled-components';



export const StyledDifficultyModal = styled.div`
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    div {
        display: flex;
        min-width: 250px;
        width: 100%;
    }

    h1 {
        width: auto;
        display: flex;
        flex-direction: row;
        justify-content: start;
    }

    .difficultyButtons {
        display: flex;
        width: auto;
        justify-content: space-evenly;
        min-width: 250px;
        height: 100px;
        // background-color:red;
        align-items: center;
    }

    div {
        display: flex;
        width: 80%;
        // padding: 100px;
    }

    button {
        display: flex;
        align-items: center;
        height: 30px;
        width: 20%;
        justify-content: center;
        // padding: 20px;
        // background-color: red;
        // flex-direction: row;
    }

    .modal1 {
        width: 50%
        display: flex;
        flex-direction: column;
        padding: 20px 35px 20px 35px;
        min-width: 250px;
        background-color: rgba(255,255,255,0.8);
        border: 2px solid blue
    }
`