import { ButtonContainer, PlusIcon } from "./styles"

export const ButtonPlus = ({type, onClick, variant}) => {
    return (
        <ButtonContainer variant={variant} type={type} onClick={onClick}>
            <PlusIcon />
        </ButtonContainer>
    )
}