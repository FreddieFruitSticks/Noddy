import React from 'react'
import BookingDate from './booking-date'
import BookingButton from './booking-button'

const BookingCalender = ({}) => {
    return (
        <div className="flex mb-2">
          <div className="h-24 w-32">
              <BookingDate/>
          </div>
          <div className="w-1/2 bg-gray-500 h-24">
              <BookingButton/>
          </div>
        </div>
    )
}

export default BookingCalender