import styled, { css } from "styled-components";

export const PopUpContainer = styled.div`
    align-items: center;
    background-color: #FFFFFF;
    border: 3px solid #3C5C12;
    display: flex;
    flex-direction: column;
    height: 150px;
    justify-content: center;
    position: absolute;
    top:300px;
    width: 300px;

    ${({variant}) => variant !== 'primary' && css`
        background-color: rgba(255, 255, 255, 0.8);
        height: 220px;
        gap: 7px;
        
    `}
`

export const TextoPopUp = styled.h2`
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 25px;
    padding: 0 10px;
    text-align: center;

    ${({variant}) => variant !== 'primary' && css`
        font-size: 17px;
        margin-bottom: 5px;
    `}
`

export const DivButtons = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    height: 40px;
    width: 70%;
`