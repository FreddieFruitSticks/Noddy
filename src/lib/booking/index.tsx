import React, { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form';
import FormInput from '../../shared/form-input';
import { emailValidator, cellNumberValidator, numberValidator } from '../../shared/validators';
import { partyAction } from '../../context/actions';
import { useRouter } from 'next/router';
import { Context } from '../../context/context-provider';
import Recaptcha from 'react-recaptcha';

const BookingView = ({state, dispatch}: Context) => {
    const [numberOfChildren, setNumberOfChildren] = useState([1])
    const [formVerified, setFormVerified] = useState(false)
    const router = useRouter()
    
    const {handleSubmit, trigger, register, getValues, errors } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            ...state.partyForm
        },
        resolver: undefined,
        context: undefined,
        criteriaMode: "firstError",
        shouldFocusError: true,
        shouldUnregister: true,
      });
      
    const onSubmit = values => {
        trigger()
        const {email2, ...formVals} = values
        dispatch(partyAction(formVals))
        router.push("/booking-review")
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
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 w-4/12 xs:w-11/12 sm:w-10/12 md:w-7/12 lg:w-5/12">
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
                                name={`kids[${childNumber-1}].name`}
                                placeholder="First and Last Name"
                                errors={errors}
                                formValidator={register({
                                    required: "Required",
                                })}
                            />
                            <div className="text-xs text-red">
                                {errors?.kids && errors?.kids[childNumber-1] && errors?.kids[childNumber-1]?.name?.message}
                            </div>
                                     
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                age
                            </label>
                            <div className="relative">
                                <select ref={register} name={`kids[${childNumber-1}].age`} className="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                    <option value={0}>{`0`}</option>
                                    <option value={1}>{`1`}</option>
                                    <option value={2}>{`2`}</option>
                                    <option value={3}>{`3`}</option>
                                    <option value={4}>{`4`}</option>
                                    <option value={5}>{`5`}</option>
                                    <option value={6}>{`older than 6`}</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                            </div>
                            <div className="text-xs">
                                *children under the age of 3 are free
                            </div>
                            <input
                                ref={register}
                                name={`kids[${childNumber-1}].hasGift`}
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
            <Recaptcha
                sitekey="6LfAnswZAAAAAO2_TIhAUpsOCr1w96GDr7MwLjP9"
                render="explicit"
                verifyCallback={() => {
                    setFormVerified(true)
                }}
                onloadCallback={()=>{}}
            />
            
            <div className="w-full flex items-center justify-start ">
                <button className="w-3/12 sm:w-5/12 min-w-md max-w-md bg-orange mt-5 text-white py-3 px-2 font-bold rounded" onClick={addChild}>Add Child</button>
            </div>
            <div className="w-full flex items-center justify-center min-xl:justify-start">
                <button 
                    disabled={!formVerified} 
                    className={`w-6/12 ${!formVerified && 'opacity-50'} max-w-xs bg-blue-500 mt-5 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded`} 
                    type="submit">
                        Submit
                </button>            
            </div>
        </form>
        </div>
    )
}

export default BookingView