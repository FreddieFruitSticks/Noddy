import React from "react"
import BookingCalender from "./components/booking-calender"
import { IHomePage } from "../../../pages"

const Home = ({state, dispatch, events} : IHomePage) => {
    return (
        <div className="m-5">
            {events?.map(event => {
                return (
                    <BookingCalender closed={!state?.utils?.bookings_openclosed} dispatch={dispatch} key={event.id} event={event}/>                    
                )
            })}
        </div>
    )
}

export default Home