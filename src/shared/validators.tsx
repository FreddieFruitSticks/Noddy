import { ValidationRule } from "react-hook-form/dist/types/form"

export const emailValidator : () => ValidationRule<RegExp> = () => {
    return  {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email address"
    }
}

export const cellNumberValidator : () => ValidationRule<RegExp> = () => {
    return  {
        value: /^(\+27|0|0027)[6-8][0-9]{8}$/,
        message: 'Invalid cell number',
      }
}

export const numberValidator : () => ValidationRule<RegExp> = () => {
    return  {
        value: /^[0-9]/,
        message: 'Invalid number',
      }
}