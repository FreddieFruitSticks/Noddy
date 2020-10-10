import React from 'react'
import BookingDate from './booking-date'
import BookingButton from './booking-button'
import { IEvent } from '../../../../pages'
import { useRouter } from 'next/router'
import { partyAction } from '../../../context/actions'

const BookingCalender = ({event, dispatch}: {event: IEvent, dispatch: React.Dispatch<any>}) => {
    const router = useRouter()
    const today = new Date()
    const eventDate = new Date(event.date)
    const disabledBooking = today > eventDate || event.numberOfTickets <= 0
    
    const onClick = () => {
        dispatch(partyAction({date: event.date, eventId: event.id}))
        router.push("/booking")
    }
    
    return (
        <>
            <div onClick={!disabledBooking ? onClick : null} className={`${disabledBooking && "opacity-75"} flex mb-2`}>
                <div className="h-24 w-32">
                    <BookingDate date={eventDate}/>
                </div>
                <div className="w-1/2 bg-gray-500 h-24">
                    <BookingButton disabled={disabledBooking} numberOfTickets={event.numberOfTickets}/>
                </div>
            </div>
        </>
    )
}

export default BookingCalender