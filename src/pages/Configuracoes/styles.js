import styled, { css } from "styled-components";
import { GoBellFill } from "react-icons/go";
import { FaCalendarAlt } from "react-icons/fa";

export const Container = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center; 
    margin: 0;
    position: relative;
    width: 100%;
`

export const LogoContainer = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    position: absolute;
    top: 100px;
`

export const ContainerConfig = styled.form`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
`

export const Title = styled.h1`
    font-weigth: bold;
    margin-top: 40px;
`

export const TitleConfig = styled.h1`
    font-weigth: bold;

    ${({variant}) => variant !== 'primary' && css`
        &::before {
            content: '';
        }
    ` }
`

export const Labels = styled.label`
    font-size: 18px;
    font-weight: bold;
`

export const ContainerInputs = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    margin: 50px 0 50px 0;
    position: relative;
    width: 100%;
`
export const BellIcon = styled(GoBellFill)`
    color: yellow;
    left: -60px;
    position: absolute;
    top: -5px;
    height: 50px;
    width: 60px;
`

export const CalendarIcon = styled(FaCalendarAlt)`
    bottom: 90px;
    color: #23238E;
    left: -60px;
    position: absolute;
    height: 50px;
    width: 60px;
`