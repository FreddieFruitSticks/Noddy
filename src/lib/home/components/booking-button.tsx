import React from 'react'
import Link from 'next/link'

const BookingButton = ({numberOfTickets, disabled} :{numberOfTickets: number, disabled: boolean}) => {
    return (
        <div className={`flex ${!disabled && "click inner-shadow"} font-bold text-grey text-xl sm:text-sm md:text-md lg:text-lg xl:text-xl items-center justify-center w-full h-full bg-gray-400`}>
            {!disabled ? 
                `Tickets Available: ${Math.max(numberOfTickets, 0)}`
                :
                "Unavailable"
            }
        </div>
    )
}

export default BookingButton