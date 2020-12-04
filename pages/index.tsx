import React from 'react'
import Home from "../src/lib/home"
import { fetchEvents } from "../src/services"
import {Context } from "../src/context/context-provider"
import { connect } from "../src/context/connector"

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

export const getServerSideProps = async (context) => {
    const events = await fetchEvents()
    return {
        props:{
            events: mapper(events)
        }
    }
}

export interface IHome {
    events?: IEvent[];
}
  
export interface IHomePage extends Context, IHome{}

const HomePage = (props: IHomePage) => {
    return (
        <div>
            <div className="m-5">
                <img className="mb-10 max-h-40" src="/noddy-party.svg" alt="my image" />
                <div className="text-2xl">Proudly hosted by <a className="text-blue underline" href="https://www.facebook.com/rtpeninsula77/">Peninsula 77 Round Table</a></div>
                <div className="mt-5 text-md">
                    We are happy to announce that bookings for the 2019 Noddy Party are open. Spots are limited, so book as soon as possible!
                    Please make sure you read the PARTY DETAILS for details about the location and refreshments being served.
                </div>
            </div>
            <Home {...props}/> 
            <div className="m-5">
                <div className="text-xl py-5">A special thank you to our sponsors</div>
                <div className="shadow-xl max-w-4xl p-3 pt-3 border border-gray-200">
                    <img src="/m4verick.svg" alt="my image" />
                    <div className="mt-5">
                        M4verick Labs operates as a fast-paced digital transformation partner. Boasting a broad range of impressive partnerships, 
                        their skills and service offerings have supported our developers and saved us from many costs. Round Table Peninsula 77 would like 
                        to <strong>thank</strong> Maverick Labs for their generous contributions.
                    </div>
                </div>
                <div className="mt-10 max-w-4xl max-w-50 shadow-2xl p-3 pt-3 border border-gray-200">
                    <img src="/techfox-logo-main.svg" alt="my image" />
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