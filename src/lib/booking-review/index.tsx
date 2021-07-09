import React, { useEffect, useState } from 'react'
import { Context } from '../../context/context-provider'
import { confirmPayment, createParty } from '../../services'
import { createHash } from 'crypto';


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
    const [isConfirming, setConfirming] = useState(false)
    const [isConfirmed, setConfirmed] = useState(false)
    const [price, setPrice] = useState(0)
    const [partyId, setPartyId] = useState(undefined)
    const [confirmError, setConfirmError] = useState(undefined)
    
    const [signature, setSignature] = useState("")
    const merchantId = process.env.MERCHANT_ID
    const merchantUrl = process.env.MERCHANT_URL
    const merchantKey = process.env.MERCHANT_KEY
    const payfastSalt = process.env.PAYFAST_SALT
    const numberOfTicket = +state?.partyForm?.adults + +state?.partyForm?.kids?.length
    
    useEffect(() => {
        let p = 0
        if (state?.partyForm?.adults){
            p += +state?.utils?.price_per_ticket*state?.partyForm?.adults
        }
        
        state?.partyForm?.kids.forEach((kid, index) => {
            if (kid.age >= 3){
                p += +state?.utils?.price_per_ticket
            }
        })
        
        setPrice(p)
        
    },[])

    
    const generateSignature = (partyId1) => {
        const data = [];
        data["merchant_id"] = merchantId;
        data["merchant_key"] = merchantKey;
        data["return_url"] = `${`${process.env.PAYMENT_URL}/payment-success?data=${partyId1}-${state.partyForm.eventId}-${numberOfTicket}`}`;
        data["cancel_url"] = `${`${process.env.PAYMENT_URL}/payment-failed`}`;
        data["name_first"] = state?.partyForm?.name;
        data["email_address"] = state?.partyForm?.email;
        data["amount"] = `${price}.00`;
        data["item_name"] = "Noddy Tickets";
        
        let pfOutput = "";
        for (let key in data) {
          if(data.hasOwnProperty(key)){
            if (data[key] !== "") {
              pfOutput +=`${key}=${encodeURIComponent(data[key].trim()).replace(/%20/g, "+")}&`
            }
          }
        }
      
        // Remove last ampersand
        let getString = pfOutput.slice(0, -1);
        if (payfastSalt !== null) {
          getString +=`&passphrase=${encodeURIComponent(payfastSalt.trim()).replace(/%20/g, "+")}`;
        }
      
        return createHash("md5").update(getString).digest("hex");
      };
    
    const confirmDetails = async () => {
        if (typeof window !== "undefined"){
            setConfirming(true)
            try {
                const response = await createParty(state.partyForm)
                setConfirmed(true)
                // setPartyId(response)
                const partyId = response
                // setSignature(generateSignature(response))
                window.location.assign(`${merchantUrl}?cmd=_paynow&email_address=${state?.partyForm?.email}&name_first=${state?.partyForm?.name}&receiver=${merchantId}&item_name=Noddy&amount=5.00&cancel_url=${process.env.PAYMENT_URL}/payment-failed&return_url=${process.env.PAYMENT_URL}/payment-success?data=${partyId}-${state.partyForm.eventId}-${numberOfTicket}`);
            }catch(err){
                console.log(err)
                setConfirmError(err)
            }
            // setConfirming(false)
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
            <form id="payment-form" action={merchantUrl} method="post">
                <input type="hidden" name="merchant_id" value={merchantId}/>
                <input type="hidden" name="merchant_key" value={merchantKey}/>
                <input type="hidden" name="return_url" value={`${process.env.PAYMENT_URL}/payment-success?data=${partyId}-${state.partyForm.eventId}-${numberOfTicket}`}/>
                <input type="hidden" name="cancel_url" value={`${process.env.PAYMENT_URL}/payment-failed`}></input>
                <input type="hidden" name="name_first" value={state?.partyForm?.name}/>
                <input type="hidden" name="email_address" value={state?.partyForm?.email}/>
                <input type="hidden" name="amount" value={`${price}.00`}/>
                <input type="hidden" name="item_name" value="Noddy Tickets"/>
                <input type="hidden" name="signature" value={signature}/> 
            </form>
            
            {confirmError && 
                <div                         
                    className="m-3 text-red" 
                >
                    There has been an error with your confirmation
                </div>
            }
            
            {isConfirming ?
                <div className="w-full flex items-center justify-center">
                    <img className="h-20" src="load.svg"/>
                    <div>Confirming...</div>
                </div>
                    :
                <button
                    onClick={confirmDetails}
                    disabled={isConfirming}
                >
                    <img 
                        src="https://www.payfast.co.za/images/buttons/light-small-paynow.png"
                        width="165"
                        height="36"
                        alt="Pay"
                        title="Pay Now with PayFast"
                    />
                </button>}

            
            {/* {isConfirmed && partyId ?
                <div>
                    <div                         
                        className="mt-3 text-green" 
                    >
                        Your details have been confirmed!
                    </div>
                    <button
                        disabled={!isConfirmed}
                        form="payment-form"
                        type="submit"
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
                :
                isConfirming ?
                    <div className="w-full flex items-center justify-center">
                        <img className="h-20" src="load.svg"/>
                        <div>Confirming...</div>
                    </div>
                :
                
                <div className="mb-5 w-full flex items-center justify-start ">
                    <button
                        type="button"
                        className="min-w-md max-w-md bg-orange mt-5 text-white py-3 px-2 font-bold rounded" 
                        onClick={confirmDetails}>
                            Confirm Details
                    </button>
                </div>
            } */}
        </div>
    )
}




export default BookingReview