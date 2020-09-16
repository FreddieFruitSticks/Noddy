import React from "react"
import BookingCalender from "./components/booking-calender"
import { IHomePage } from "../../../pages"

const Home = ({state, dispatch, events} : IHomePage) => {
    console.log(events)
    return (
        <div className="ml-5">
            {events?.map(event => {
                return (
                    <BookingCalender dispatch={dispatch} key={event.id} event={event}/>                    
                )
            })}
        </div>
    )
}

export default Home