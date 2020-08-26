import React from 'react'
import BookingView from '../src/lib/booking'
import { connect } from '../src/context/connector'
import { Context } from '../src/context/context-provider'

export const getStaticProps = async (context) => {
    return {
        props:{}
    }
  }
  
const Booking = (props: Context) => {
    return (
        <div>
            <BookingView {...props}/> 
        </div>
    )
}

export default connect(Booking)