import { InputCheckbox, ContainerCheckbox } from "./styles"

export const Checkbox = ({name, checked, onChange}) => {
    return (
        <ContainerCheckbox>
            <InputCheckbox type='checkbox' 
                            name={name}
                            checked={checked}
                            onChange={onChange}></InputCheckbox>
        </ContainerCheckbox>
    )
}