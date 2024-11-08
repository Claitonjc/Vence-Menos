import styled, { css } from "styled-components";

export const InputContainer = styled.input`
    border: 2px solid #3C5C12;
    border-radius: 18px;
    box-shadow: 0 3px 4px gray;
    padding: 10px;
    text-align: center;
    width: 100%;

    ${({variant}) => variant !== 'primary' && css`
        border: 2px solid #000000;
        border-radius: 0;
        margin: 15px 10px 40px 0;
        padding: 10px;
        width: 30px;
    `}
`