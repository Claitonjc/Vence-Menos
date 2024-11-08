import styled, { css } from "styled-components";

export const Container = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100vh; 
    margin: 0;
    position: relative;
`

export const LogoContainer = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    position: absolute;
    top: 100px;

    ${({variant}) => variant !== 'primary' && css`
        top: 30px;
        right: 20px;
    ` }
`

export const ContainerLojas = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: 100vh;
    justify-content: center;
    width: 300px;
`

export const TitleLoja = styled.h1`
    font-weight: bold;
    
    ${({variant}) => variant !== 'primary' && css`
        font-size: 24px; 
        margin-bottom: 50px;
        margin-top: 150px;
    `}
`

export const ContainerAdicionaLoja = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: 100vh;
    justify-content: center;
    width: 300px;
`

export const SubTitleLoja = styled.h2`
    font-size: 20px;
    font-weight: bold;
`

export const ContainerInput = styled.div`
    align-items: center;
    display: flex;
    gap: 10px;
`

export const LojasLista = styled.ul`
    max-height: 100vh;
    list-style-type: none;
    width: 100%;
    height: 100vh;  
`

export const ContainerItem = styled.div`
    align-items: center;
    display: flex;
    gap: 10px;
`

export const Loja = styled.button`
    background-color: #FFFFFF;
    border: 2px solid #3C5C12;
    border-radius: 18px;
    box-shadow: 0 3px 4px gray;
    font-size: 24px;
    font-weight: 400;
    margin-bottom: 5px;
    max-height: 100vh;
    padding: 5px 0 5px 30px;
    text-align: start;
    width: 320px;
`

export const DivButtonPopUp = styled.div`
    display: flex;
    flex-direction: row;
    gap: 40px; 
`