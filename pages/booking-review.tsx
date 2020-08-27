import React from 'react'
import BookingReviewView from '../src/lib/booking-review'
import { connect } from '../src/context/connector'
import { Context } from '../src/context/context-provider'

export const getStaticProps = async (context) => {
    return {
        props:{}
    }
  }
  
const BookingReview = (props: Context) => {
    return (
        <div>
            <BookingReviewView {...props}/> 
        </div>
    )
}

export default connect(BookingReview)