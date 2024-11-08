import { InputContainer } from "./styles"
import { useEffect, useRef } from "react";

export const InputInsert = ({onKeyDown, variant, name, type, value, onChange}) => {

    const inputRef = useRef(null);

    useEffect(() => {
        if(inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <InputContainer onKeyDown={onKeyDown} 
                        variant={variant} 
                        name={name} 
                        type={type}
                        value={value}
                        onChange={onChange}
                        ref={inputRef}/>
    )
}