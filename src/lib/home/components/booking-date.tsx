import React from 'react'

const BookingDate = ({date} : {date: Date}) => {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var dayName = days[date.getDay()];   
    
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var monthName = months[date.getMonth()];
    
    return (
        <div className="h-full bg-grey">
            <div className="text-white font-bold flex justify-center items-center w-full h-8 bg-orange">
                {monthName} {date.getFullYear()}
            </div>            
            <div className="font-bold text-white flex items-center justify-center text-3xl">
                {date.getDate()}
            </div>
            <div className="text-white font-bold flex justify-center items-center w-full h-4">
                {dayName}
            </div>  
        </div>
    )
}

export default BookingDate