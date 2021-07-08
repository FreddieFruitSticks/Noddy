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
        price = price + +state?.utils?.price_per_ticket*state?.partyForm?.adults
    }
    
    const merchantId = process.env.MERCHANT_ID
    const merchantUrl = process.env.MERCHANT_URL
    
    const redirect = async () => {
        setDisabled(true)
        if (typeof window !== "undefined"){
            try {
                const response = await createParty(state.partyForm)
                const partyId = response
                const numberOfTicket = +state?.partyForm?.adults + +state?.partyForm?.kids?.length
                setDisabled(false)
                window.location.replace(`${merchantUrl}?cmd=_paynow&amp;receiver=${merchantId}&amp;item_name=Noddy&amp;amount=${5}.00&amp;return_url=${process.env.PAYMENT_URL}%2Fpayment-success%3FpartyId%3D${partyId}%26eventId%3D${state.partyForm.eventId}%26tickets%3D${numberOfTicket}&amp;cancel_url=${process.env.PAYMENT_URL}%2Fpayment-failed`);
            }catch(err){
                console.log(err)
            }
        }
    }
    
    return (
        <div className="min-h-screen ml-10">
            <div className="font-semi mb-10 text-2xl underline">
                Party Summary
            </div>
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
                    price += +state?.utils?.price_per_ticket
                }
                return (
                    <div key={kid.name+index}>
                        <div className="text-orange mt-2 underline">
                            {kid.name}
                        </div>
                        {Object.keys(kid).map(key => {
                            if (key != 'name'){
                                return (
                                    <div key={key}>
                                        {mapChildKeyValues(key)}: {key === 'age' ? kid[key] : mapChildKeyValues(kid[key])}
                                    </div>
                                )
                            }
                        })}
                    </div>
                )})
            }
            <div className="mt-5 text-lg">
                Total Price: R {price}
            </div>
            <a href="https://www.payfast.co.za/eng/process?cmd=_paynow&amp;receiver=10180796&amp;item_name=noddy&amp;amount=5.00&amp;return_url=https%3A%2F%2Fnoddy.co.za%2Fpayment-success%3FpartyId%3D410%26eventId%3D42%26tickets%3D2&amp;cancel_url=https%3A%2F%2Fnoddy.co.za%2Fpayment-failed"><img src="https://www.payfast.co.za/images/buttons/light-small-paynow.png" width="165" height="36" alt="Pay" title="Pay Now with PayFast" /></a>
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