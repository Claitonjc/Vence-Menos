import styled, { css } from "styled-components";
import { FaPlus } from "react-icons/fa";

export const ButtonContainer = styled.button`
    align-items: center;
    background-color: #FFFFFF;
    border: 2px solid #3C5C12;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    height: 60px;
    justify-content: center;
    width: 60px;

    ${({variant}) => variant !== 'primary' && css`
        bottom: 20px;
        position: fixed;
        right: 20px;
    `}
`

export const PlusIcon = styled(FaPlus)`
    height: 50%;
    width: 40%;
`