import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
    }


    body {
        background-image: linear-gradient(#639820, #ffffff);
        background-repeat: no-repeat;
        font-family: "Roboto", sans-serif;
        height: 100vh;
    }

`