import styled, { css } from "styled-components"

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
    right: 20px;
    top: 30px;
`

export const ContainerAdicionaProduto = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: 100vh;
    justify-content: center;
    width: 300px;
`

export const SubTitleProduto = styled.h2`
    font-size: 20px;
    font-weight: bold;
`

export const ContainerInput = styled.form`
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
`

export const DivInputs = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    margin-bottom: 5px;
    gap: 5px;
    width: 100%;
`

export const Label = styled.label`
    font-size: 12px;
    text-align: left;
    width: 100%;

    ${({variant}) => variant !== 'primary' && css`
        font-size: 18px; 
        margin-bottom: 10px;
        margin-top: 25px;
        text-align: center;
    `}
`

export const DivCheckbox = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 100%;
`

export const ContainerProdutos = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: 100vh;
    justify-content: center;
    width: 300px;
`

export const TitleProduto = styled.h1`
    font-size: 24px; 
    margin-bottom: 50px;
    margin-top: 150px; 
`

export const ProdutosLista = styled.ul`
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

export const Produto = styled.button`
    background-color: #FFFFFF;
    border: 2px solid #3C5C12;
    border-radius: 18px;
    box-shadow: 0 3px 4px gray;
    font-size: 12px;
    font-weight: 400;
    margin-bottom: 5px;
    max-height: 100vh;
    padding: 10px 0 10px 20px;
    text-align: start;
    width: 320px;
`

export const DivButtonPopUp = styled.div`
    display: flex;
    flex-direction: row;
    gap: 40px; 
`