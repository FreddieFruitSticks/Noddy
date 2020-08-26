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
    const eventPassed = today > eventDate
    
    const onClick = () => {
        dispatch(partyAction({date: event.date, eventId: event.id}))
        router.push("/booking")
    }
    
    return (
        <>
            <div onClick={!eventPassed ? onClick : null} className={`${eventPassed && "opacity-75"} flex mb-2`}>
                <div className="h-24 w-32">
                    <BookingDate date={eventDate}/>
                </div>
                <div className="w-1/2 bg-gray-500 h-24">
                    <BookingButton disabled={eventPassed} numberOfTickets={event.numberOfTickets}/>
                </div>
            </div>
        </>
    )
}

export default BookingCalender