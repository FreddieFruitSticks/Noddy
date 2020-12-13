import React from 'react'
import Home from "../src/lib/home"
import { fetchEvents } from "../src/services"
import {Context } from "../src/context/context-provider"
import { connect } from "../src/context/connector"
import useSWR from 'swr'

export interface IEvent{
    id: number;
    numberOfTickets: number;
    date: Date;
}

interface IWPEvent{
    id: number;
    acf: {
        numberoftickets: number;
        date: Date;
    }
}

const mapper = (wpEvents: IWPEvent[]) : IEvent[] => {
    return wpEvents.map(wpEvent => {
        return {
            id: wpEvent?.id,
            numberOfTickets: wpEvent?.acf?.numberoftickets,
            date: wpEvent?.acf?.date
        }
    }) 
}

export const getStaticProps = async () => {
    return {
        props:{}
    }
}

export interface IHome {
    events?: IEvent[];
}
  
export interface IHomePage extends Context, IHome{}

const HomePage = (props: IHomePage) => {
    const { data, error } = useSWR('acf/v3/event', fetchEvents)

    return (
        <div>
            <div className="m-5">
                <div className="max-w-lg">
                    <h1 className="max-w-lg text-4xl min-xl:text-5xl anim"> <div> The Rondebosch </div> </h1>
                    <img width="40px" height="40px" className="max-h-40" src="/noddy2.svg" alt="my image" />
                    <h1 className="flex justify-end text-4xl min-xl:text-5xl anim anim2 mb-10 "> <div> Christmas Party </div> </h1>
                </div>
                

                <div className="text-2xl">Proudly hosted by <a className="text-blue underline" href="https://www.facebook.com/rtpeninsula77/">Peninsula 77 Round Table</a></div>
                {props?.state?.utils?.bookings_openclosed ?
                    <div className="mt-5 text-md">
                        We are happy to announce that bookings for the {`${props?.state?.utils?.year_of_party}`} Noddy Party are <strong>open</strong>.
                        Price per ticket is <strong>R{`${props?.state?.utils?.price_per_ticket}`}</strong>. Spots are limited, so book as soon as possible!
                        Please make sure you read the PARTY DETAILS for details about the location and refreshments being served.
                    </div>
                    :
                    <div className="mt-5 text-md">
                        Booking for Noddy is now <strong>closed</strong>. Please keep and eye on our
                        <a className="text-blue underline" href="https://www.facebook.com/rtpeninsula77/"> Facebook page </a> 
                        for further details. 
                    </div>
                    
                }
            </div>
            {error && 
                <div className="w-full flex items-center justify-center">
                    <img className="h-20" src="error.svg"/>
                    <div>Could not fetch event dates...</div>
                </div>
            }
            {data ? 
                <Home {...{...props, events: mapper(data)}}/> 
            :                 
                <div className="w-full flex items-center justify-center">
                    <img className="h-20" src="load.svg"/>
                    <div>Loading events...</div>
                </div>
            }
            
            <div className="m-5 font-semi text-2xl underline">
                Booking System
            </div>
            <>
                <div className="m-5 list-disc">
                    <div className="flex flex-row"><li></li><span>Choose the day you want to join</span></div>
                    <div className="flex flex-row"><li></li><span>Fill out the form</span></div>
                    <div className="flex flex-row"><li></li><span>Children under 3 are free (we work on an honesty system)</span></div>
                    <div className="flex flex-row"><li></li><span>Indicate whether you will be supplying a gift for each child</span></div>
                    <div className="flex flex-row"><li></li><span>Continue to payment</span></div>
                    <div className="flex flex-row"><li></li><span>You will recieve an email confirmation of your booking</span></div>
                    <div className="flex flex-row"><li></li><span>If there are less available tickets than the number in your group, <strong>book anyway</strong>!</span></div>
                </div>
            </>
            <div className="m-5">
                <div className="text-xl py-5 underline">A special thank you to our sponsors</div>
                <div onClick={() => {
                    window.open("https://m4verick.com/", "_blank");
                }} className="cursor-pointer shadow-xl max-w-4xl p-3 pt-3 border border-gray-200">
                    <img width="40px" height="40px" src="/m4verick.svg" alt="my image" />
                    <div className="mt-5">
                        M4verick Labs operates as a fast-paced digital transformation partner. Boasting a broad range of impressive partnerships, 
                        their skills and service offerings have supported our developers and saved us from many costs. Round Table Peninsula 77 would like 
                        to <strong>thank</strong> Maverick Labs for their generous contributions.
                    </div>
                </div>
                <div onClick={() => {
                    window.open("https://www.techfox.co.za/", "_blank");
                }} className="cursor-pointer mt-10 max-w-4xl max-w-50 shadow-2xl p-3 pt-3 border border-gray-200">
                    <img width="40px" height="40px" src="/techfox-logo-main.svg" alt="my image" />
                    <div className="mt-5">
                        Techfox is an innovative online retailer that focuses on the highest standards of product quality and client services. 
                        Their contribution has saved us significant costs, and Round Table Peninsula 77 would like to say a 
                        big <strong>thank you</strong>.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect(HomePage)