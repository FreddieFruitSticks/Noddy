import React from 'react'
import Link from 'next/link'

const BookingButton = ({}) => {
    return (
        <Link href="/booking">
            <div className="flex click inner-shadow font-bold text-grey text-xl sm:text-sm md:text-md lg:text-lg xl:text-xl items-center justify-center w-full h-full bg-gray-400">
                Tickets Available: 24
            </div>
        </Link>
    )
}

export default BookingButton