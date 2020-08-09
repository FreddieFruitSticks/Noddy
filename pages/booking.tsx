import React from 'react'
import BookingView from '../src/lib/booking'

export const getStaticProps = async (context) => {
    return {
        props:{}
    }
  }
  
const Booking = ({}) => {
    return (
        <div>
            <BookingView/>
        </div>
    )
}

export default Booking