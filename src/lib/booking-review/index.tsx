import React from 'react'
import { Context } from '../../context/context-provider'

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
    let price = 0
    if (state?.partyForm?.adults){
        price = price + 75*state?.partyForm?.adults
    }
    
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
                if (kid.olderThanThree === "1"){
                    price = price + 75
                }
                    return (
                        <div>  
                            <div className="text-orange mt-2 underline">
                                Child {index+1}  
                            </div>
                            {Object.keys(kid).map(key => {
                                
                                return (
                                        <div key={key}>
                                            {mapChildKeyValues(key)}: {mapChildKeyValues(kid[key])}
                                        </div>
                                    )
                            })}
                    </div>
                )})
            }
            <div className="mt-5 text-lg">
                Total Price: R {price}
            </div>
        </div>
    )
}




export default BookingReview