import React, { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form';
import FormInput from '../../shared/form-input';
import { emailValidator, cellNumberValidator, numberValidator } from '../../shared/validators';

const BookingView = ({}) => {
    const [numberOfChildren, setNumberOfChildren] = useState([1])
    
    const { trigger, register, getValues, errors } = useForm();
    const onSubmit = values => {
        trigger()
        console.log(values)
    }
    
    const addChild = ({}) => {
        let b = Array.from(numberOfChildren)
        const n = b.push(b.length + 1)
        
        setNumberOfChildren(b)
    }
      
    return (
        <div className="ml-10 xs:ml-1 sm:ml-5">
        <div className="font-semi underline">
            Guardian Details
        </div>  
        <form className="mt-5 w-4/12 xs:w-11/12 sm:w-10/12 md:w-7/12 lg:w-5/12">
            <FormInput
                name="name"
                placeholder="Full name"
                errors={errors}
                formValidator={register({
                    required: "Required",
                })}
            />
            
           <FormInput
                name="email"
                placeholder="Email"
                errors={errors}
                formValidator={register({
                    required: "Required",
                    pattern: emailValidator()
                })}
            />            
            
            <FormInput
                name="email2"
                placeholder="Confirm email"
                errors={errors}
                formValidator={register({
                    required: "Required",
                    pattern: emailValidator(),
                    validate:{
                        equalEmail: value => {
                            if (getValues("email") !== value){
                                return "emails must be equal"
                            }
                        }
                    }
                })}
            /> 
            
            <FormInput
                name="cell"
                placeholder="Cell number"
                errors={errors}
                formValidator={register({
                    required: "Required",
                    pattern: cellNumberValidator()
                })}
            />              
            
            <FormInput
                name="adults"
                placeholder="Number of Adults"
                errors={errors}
                formValidator={register({
                    required: "Required",
                    pattern: numberValidator()
                })}
            />
            <div className="font-semi mt-5 underline">
                Children Details
            </div>          
            {numberOfChildren.map(childNumber => {
                return (
                    <div key={childNumber}>
                        <div className=" mt-3" key={childNumber}>
                            <div className="text-orange">
                                child {childNumber}
                            </div>
                            <FormInput
                                name={`kidName${childNumber}`}
                                placeholder="First and Last Name"
                                errors={errors}
                                formValidator={register({
                                    required: "Required",
                                })}
                            />            
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                age
                            </label>
                            <div className="relative">
                                <select className="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                    <option value={1}>{`greater than 3 years`}</option>
                                    <option value={0}>{`less than 3 years`}</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                            </div>
                            <div className="text-xs">
                                *children under the age of 3 are free
                            </div>
                            <input 
                                type="checkbox" 
                                className="mt-2 form-checkbox"
                            />
                            <span className="ml-2">I am bringing a gift for him/her</span>
                        </div>

                        {childNumber !== numberOfChildren.length &&
                            <div className="border-b-4 border-orange mt-3"/>
                        }
                    </div>
                )
            })}

            
        </form>
            <div className="w-full flex items-center justify-start ">
                <button className="w-3/12 sm:w-5/12 min-w-md max-w-md bg-orange mt-5 text-white py-3 px-2 font-bold rounded"  onClick={addChild}>Add Child</button>
            </div>
            <div className="w-full flex items-center justify-center min-xl:justify-start">
                <button className="w-6/12 max-w-xs bg-blue-500 mt-5 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" type="button" onClick={onSubmit}>Submit</button>            
            </div>
        </div>
    )
}

export default BookingView