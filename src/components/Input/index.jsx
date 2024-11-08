
import { InputContainer, InputText, ErrorText } from "./styles";
import { Controller } from "react-hook-form";

export const Input = ({name, control, errorMessage, value, onChange, ...rest}) => {

    return (
        <>
        <InputContainer>
            <Controller 
            name={name}
            control={control}
            value={value}
            onChange={onChange}
            rules={{ required: true }}
            render={({ field }) => <InputText {...field} {...rest}/>}
            />
        </InputContainer>
        {errorMessage ? <ErrorText>{errorMessage}</ErrorText> : null}
        </>
    )
}