import React from 'react'
import { FieldError } from 'react-hook-form';
import { DeepMap } from 'react-hook-form/dist/types/utils';

interface FormInputProps {
    formValidator?: any;
    placeholder?: string;
    name: string;
    defaultValue?: any
    value?: any
    onChange?: any
    errors: DeepMap<Record<string, any>, FieldError>
}

const FormInput = ({formValidator, placeholder, name, defaultValue , errors} : FormInputProps) => {
    return (
        <div className="mb-2"> 
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name={name}
                autoFocus={false}
                placeholder={placeholder}
                ref={formValidator}
                defaultValue={defaultValue}
            />
            <div className="text-xs text-red">
                {errors[name] && errors[name].message}
            </div>
        </div>    
    )
}

export default FormInput