import { ConfigImage, ConfigImageContainer } from "./styles"

export const ConfigComponent = ({onClick}) => {
    return (
        <ConfigImageContainer onClick={onClick}>
            <ConfigImage />
        </ConfigImageContainer>
    )
}