import styled, { css } from "styled-components";

export const InputContainer = styled.div`
    background-color: #D9D9D9;
    border: 2px solid #000000;
    border-radius: 0;
    box-shadow: 0 3px 4px gray;

    ${({variant}) => variant !== 'primary' && css`
        border: 2px solid #3C5C12;
        border-radius: 15px;
        width: 100%;
    `}
`

export const InputText = styled.input`
    background-color: #D9D9D9;
    border: 0;
    border-radius: 15px;
    padding: 10px;
    width: -webkit-fill-available;

    ${({variant}) => variant !== 'primary' && css`
        
        border-radius: 15px;
        font-size: 16px;
        text-align: center;
        &::-webkit-calendar-picker-indicator {
        display: none;
  }
        
    `}
`

export const ErrorText = styled.p`
    color: #FF0000;
    font-size: 12px;
    margin: 5px 0;
`