import styled from "styled-components";

export const Container = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 90vh; 
    margin: 0;
    width: 100%;
`

export const ContainerLogin = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 300px;
    height: 100%
`

export const TextLogin = styled.h1`
    font-weight: 700;
    margin: 30px;
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    width: 100%;
`

export const Label = styled.label`
    font-size: 14px;
    font-weight: 400;
    margin: 8px 0 3px 0;
`

export const LinkCadastro = styled.p`
    color: #4774B8;
    filter: drop-shadow(1px 4px 4px gray);
    font-size: 18px;
    font-weight: 700;
    text-decoration: underline;
`