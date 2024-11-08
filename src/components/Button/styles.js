import styled, { css } from "styled-components";

export const ButtonContainer = styled.button`
    background-color: #639820;
    border: 1px solid #3C5C12;
    font-family: "Roboto", sans-serif;
    font-size: 20px;
    font-weight: 700;
    margin: 20px auto 0; 
    padding: 10px 30px;
    
    
    ${({ variant }) => variant !== 'primary' && css`
        background-color: #FFFFFF;
        border: 3px solid #3C5C12;
        margin: 0 auto;
        padding: 3px 20px;
    `}

    ${({ variant }) => variant === 'tertiary' && css`
        border: 3px solid #770E0E;
    `}
    
    ${({ variant }) => variant === 'fourth' && css`
        background-color: #639820;
        border: 1px solid #3C5C12;
        margin: 8px auto 0;
        padding: 10px 30px;
    `}
`
