import React from 'react'
import { confirmPayment } from '../src/services'

export const getServerSideProps = async ({query}) => {
    let err = null
    try{
        const response = await confirmPayment({partyId: query.partyId, eventId: query.eventId, tickets: query.tickets}, `${process.env.WP_AUTH_TOKE}`)
    }catch(e){
        err = e
    }
    
    return {
        props:{
            confirmationError: err
        }
    }
}

function PaymentSuccess({confirmationError}) {
    return (
        <div className="min-h-screen mt-10 flex flex-col items-center justify-center">
            {!confirmationError ?
            <>    
                <img src="/green-checkmark-line.svg" alt="my image" />
                <div className="text-green text-xl mt-5 font-bold">
                    Payment Success!
                </div>
                <div className="mt-10 mx-5">
                    Thank you for supporting us! A confirmation was sent to the registered email address.
                    All you need to do is simply rock up on the day you booked for, give us your name, hand us your gifts, and enjoy the evening.
                </div>              
            </>
            :
            <> 
                <img src="/warning-svgrepo-com.svg" width="150" alt="my image" />
                <div className="text-orange text-xl mt-5 font-bold">
                    Warning!
                </div>
                <div className="mt-10 mx-5">
                    Don't panic! We have accepted your money but we were unable to confirm your payment automagically. 
                    Simply email us on tickets@noddy.co.za letting us know, and we will fix it all our side. Sorry for the inconvenience.
                </div>
                   
            </>    
        }
        </div>
    )
}

export default PaymentSuccess