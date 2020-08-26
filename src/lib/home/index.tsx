import React from "react"
import BookingCalender from "./components/booking-calender"
import { IHome } from "../../../pages"

const Home = ({events} : IHome) => {
    return (
        <div className="ml-5">
            {events.map(event => {
                return (
                    <BookingCalender key={event.id} event={event}/>                    
                )
            })}
        </div>
    )
}

export default Home