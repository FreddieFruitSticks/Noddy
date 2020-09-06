import React from 'react'

export const getServerSideProps = async ({query}) => {
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