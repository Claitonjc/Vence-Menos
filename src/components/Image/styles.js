import styled, { css } from "styled-components";

export const Container = styled.div`
    background-color: #ffffff;
    border: 2px solid #000000;
    border-radius: 50%;
    height: 100%
    width: 100%;
    `
    
    export const Image = styled.img`
    width: 250px;
    height: 250px;
    
    ${({variant}) => variant !== 'primary' && css`
        height: 100px;
        width: 100px;
    `} 
`