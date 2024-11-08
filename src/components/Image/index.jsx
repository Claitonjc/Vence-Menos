import { Image, Container } from "./styles"

export const ImageContainer = ({src, alt, variant}) => {
    return (
        <Container>
            <Image variant={variant} src={src} alt={alt}/>
        </Container>
    )
}