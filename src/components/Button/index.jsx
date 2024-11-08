import { ButtonContainer } from "./styles"

export const Button = ({type, title, variant, onClick}) => {
    return (
        <ButtonContainer onClick={onClick} type={type} variant={variant}>{title}</ButtonContainer>
    )
}