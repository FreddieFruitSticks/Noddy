import React, { useState } from 'react'
import { Context } from '../../context/context-provider'
import { createParty } from '../../services'

const mapChildKeyValues = (quantity) => {
    switch (quantity){
        case "olderThanThree":
            return "Three years or older"
        case "1":
            return "Yes"        
        case "0":
            return "No"        
        case "hasGift":
            return "Has a gift"
        case true:
            return "Yes"
        case false: 
            return "No"        
        case "adults": 
            return "Number of adults"
        default:
            return quantity
    }
}

const BookingReview = ({state, dispatch} : Context) => {
    const [isDisabled, setDisabled] = useState(false)
    
    let price = 0
    if (state?.partyForm?.adults){
        price = price + 75*state?.partyForm?.adults
    }
    
    const redirect = async () => {
        setDisabled(true)
        if (typeof window !== "undefined"){
            try {
                const response = await createParty(state.partyForm)
                const partyId = response
                setDisabled(false)
                window.location.replace(`${merchantUrl}?cmd=_paynow&receiver=${merchantId}&item_name=Buy+Tickets&amount=${price}.00&return_url=http%3A%2F%2F127.0.0.1%3A3000%2Fpayment-success%3FpartyId=${partyId}&cancel_url=http%3A%2F%2F127.0.0.1%3A3000%2Fpayment-failed`);
            }catch(err){
                console.log(err)
            }
        }
    }
    
    const merchantId = "10003395"
    const merchantUrl = "https://sandbox.payfast.co.za/eng/process"
    
    return (
        <div className="ml-10 xs:ml-1 sm:ml-5">
            <div className="font-semi underline mb-2">
                Guardian Details
            </div>
            {state?.partyForm && Object.keys(state?.partyForm).map(key => {
                if (key !== "kids" && key !== "eventId"){
                    return (
                        <div key={key}>
                            {key}: {state.partyForm[key]}
                        </div>
                        
                    )
                }
            })}
            <div className="font-semi mt-5 underline">
                Children Details
            </div> 
            {state?.partyForm?.kids.map((kid, index) => {
                if (kid.age >= 3){
                    price += 75
                }
                    return (
                        <div key={kid.name+index}>  
                            <div className="text-orange mt-2 underline">
                                Child {index+1}  
                            </div>
                            {Object.keys(kid).map(key => {
                                
                                return (
                                        <div key={key}>
                                            {mapChildKeyValues(key)}: {key === 'age' ? kid[key] : mapChildKeyValues(kid[key])}
                                        </div>
                                    )
                            })}
                    </div>
                )})
            }
            <div className="mt-5 text-lg">
                Total Price: R {price}
            </div>
            <button
                onClick={redirect}
                disabled={isDisabled}
            >
                <img 
                    src="https://www.payfast.co.za/images/buttons/light-small-paynow.png"
                    width="165"
                    height="36"
                    alt="Pay"
                    title="Pay Now with PayFast"
                />
            </button>

        </div>
    )
}




export default BookingReview