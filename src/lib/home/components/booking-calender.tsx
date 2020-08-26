import React from 'react'
import BookingDate from './booking-date'
import BookingButton from './booking-button'
import { IEvent } from '../../../../pages'
import Link from 'next/link'

const BookingCalender = ({event}: {event: IEvent}) => {
    const today = new Date()
    const eventDate = new Date(event.date)
    const eventPassed = today > eventDate
    
    return (
        <>
            {!eventPassed ?
                <Link href={"/booking"}>
                    <BookingComp eventPassed={eventPassed} eventDate={eventDate} numberOfTickets={event.numberOfTickets}/>
                </Link>
            :
                <BookingComp eventPassed={eventPassed} eventDate={eventDate} numberOfTickets={event.numberOfTickets}/>
            }
        </>
    )
}

const BookingComp = ({eventPassed, eventDate, numberOfTickets}) => {
    return (
        <div className={`${eventPassed && "opacity-75"} flex mb-2`}>
            <div className="h-24 w-32">
                <BookingDate date={eventDate}/>
            </div>
            <div className="w-1/2 bg-gray-500 h-24">
                <BookingButton disabled={eventPassed} numberOfTickets={numberOfTickets}/>
            </div>
        </div>
    )
}

export default BookingCalender