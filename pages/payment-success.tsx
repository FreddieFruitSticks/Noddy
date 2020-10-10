import React from 'react'
import { confirmPayment } from '../src/services'

export const getServerSideProps = async ({query}) => {
    const response = await confirmPayment({partyId: query.partyId, eventId: query.eventId, tickets: query.tickets}, "ODEyeTNhczk4ZGE3ZDg3ODEzOm16NlkgR1lEOCBVM1hrIGR2TDYgSmhteSBjcFBY")
    
    return {
        props:{}
    }
}

function PaymentSuccess() {
    return (
        <div>
            Payment Success
        </div>
    )
}

export default PaymentSuccess