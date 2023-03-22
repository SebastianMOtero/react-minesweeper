import styled from 'styled-components';

export const StyledMinesweeper = styled.div`
    display: grid;
    padding: 40px;
    margin: 0 auto;
    max-width: 900px;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto 1fr;
    margin: 20px;
    text-align: center; 
    grid-gap:20px;
    
    header {
        // background-color: aqua;
        color: black;
        grid-column: 1 / -1;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 20px;
      }

      aside {
        // background-color: aqua;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        grid-column: 2 / -1;
      }

    @media screen and (max-width: 768px) {
        aside {
            grid-column: 1 / -1;
        }
    }
    `
    // .aside {
    //     // width: 50%
    //     display: grid;
    //     boarder: 1px solid #111
    //     padding: 20%
    //     background-color: red
    // }
    // height: 100vh;
    // grid-template-rows: 1fr 1fr;
    // background-color: grey;
    // flex-direction: row;
    // align-items: flex-start;
    // border: 2px solid #000;
    // justify-content: flex-start;
    // .Board {
    //     background-color: blue
    // }