import { PopUpContainer, TextoPopUp } from "./styles";



export const PopUp = ({text, children, variant}) => {
    return (
        <PopUpContainer variant={variant}>
            <TextoPopUp>{text}</TextoPopUp>
            {children}
        </PopUpContainer>
    )
}

export default PopUp;