import styled, { css } from "styled-components"
import { FaCheck } from "react-icons/fa6";



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
    top: 70px;
`

export const ContainerProduto = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: 100vh;
    width: 300px;
`

export const TitleProduto = styled.h1`
    font-size: 28px;
    font-weight: bold;
    
    ${({variant}) => variant !== 'primary' && css`
        font-size: 24px; 
        margin-bottom: 50px;
        margin-top: 250px;
    `}
`

export const ContainerItem = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 5px;
`

export const DadosDoProduto = styled.div`
    background-color: #FFFFFF;
    border: 2px solid #3C5C12;
    border-radius: 18px;
    box-shadow: 0 3px 4px gray;
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 5px;
    max-height: 100vh;
    padding: 10px 0 10px 20px;
    text-align: start;
    width: 320px;

    ${({variant}) => variant !== 'primary' && css`
        text-align: center;
    `}
`

export const Label = styled.label`
    font-size: 12px;
    margin-left: 18px;
    text-align: left;
    width: 100%;

    ${(({variant}) => variant !== 'primary' && css`
        font-size: 20px;
    `)}
`

export const ContainerTroca = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    position: relative;
`

export const InfoTroca = styled.div`
    background-color: #D9D9D9;
    border: 2px solid #000000;
    border-radius: 6px;
    height: 35px;
    width: 35px;
    margin-top: 20px;
`

export const CheckTroca = styled(FaCheck)`
    color: #34BE14;
    height: 55px;
    left: 30px;
    position: absolute;
    top: 34px;
    width: 55px;
`