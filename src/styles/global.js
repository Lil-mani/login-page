import { createGlobalStyle } from "styled-components";

/*
   * > define que todos os elementos tenham margem 0, padding 0 e border-box (widht e height)
*/ 
const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        width: 100vw;
        height: 100vh;
        background-color: #f0f2f5;
        font-family: Arial, Helvetica, sans-serif;
    }
`;

export default GlobalStyle;
