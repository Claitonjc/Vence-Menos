import styled, { css } from "styled-components";
import { GoBellFill } from "react-icons/go";
import { LuBellPlus } from "react-icons/lu";

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

    ${({variant}) => variant !== 'primary' && css`
        top: 30px;
        right: 20px;
    ` }
`

export const BellNotification = styled(GoBellFill)`
    color: #FFFF00;
    cursor: pointer; 
    height: 60px;
    position: absolute;
    right: 20px;
    top: 20px;
    width: 50px;
` 

export const BellNotificationplus = styled(LuBellPlus)`
    color: #FFFF00;
    cursor: pointer; 
    height: 60px;
    position: absolute;
    right: 20px;
    top: 20px;
    width: 50px;
`

export const ContainerDepartamentos = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: 100vh;
    justify-content: center;
    width: 300px;
`

export const TitleDepartamento = styled.h1`
    font-size: 24px;
    font-weight: bold;
    
    ${({variant}) => variant !== 'primary' && css`
        font-size: 24px; 
        margin-bottom: 50px;
        margin-top: 250px;
    `}
`

export const ContainerAdicionaDepartamento = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: 100vh;
    justify-content: center;
    width: 300px;
`

export const SubTitleDepartamento = styled.h2`
    font-size: 20px;
    font-weight: bold;
`

export const ContainerInput = styled.div`
    align-items: center;
    display: flex;
    gap: 10px;
`

export const DepartamentosLista = styled.ul`
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

export const Departamento = styled.button`
    background-color: #FFFFFF;
    border: 2px solid #3C5C12;
    border-radius: 18px;
    box-shadow: 0 3px 4px gray;
    font-size: 20px;
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