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
    databaseId: number;
    eventFields: {
        numberoftickets: number;
        date: Date;
    }
}

const mapper = (wpEvents: IWPEvent[]) : IEvent[] => {
    return wpEvents.map(wpEvent => {
        return {
            id: wpEvent?.databaseId,
            numberOfTickets: wpEvent?.eventFields?.numberoftickets,
            date: wpEvent?.eventFields?.date
        }
    }) 
}

export const getServerSideProps = async (context) => {
    const events = await fetchEvents()
    return {
        props:{
            events: mapper(events?.data?.events?.nodes)
        }
    }
}

export interface IHome {
    events?: IEvent[];
}
  
export interface IHomePage extends Context, IHome{}

const HomePage = (props: IHomePage) => {
    return (
            <Home {...props}/>    
        )
}

export default connect(HomePage)