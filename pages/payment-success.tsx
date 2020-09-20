import React from 'react'
import { confirmPayment } from '../src/services'

export const getServerSideProps = async ({query}) => {
    const response = await confirmPayment({partyId: query.partyId, eventId: query.eventId, tickets: query.tickets})
    
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