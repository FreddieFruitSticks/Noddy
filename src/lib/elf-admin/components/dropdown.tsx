import React, { useEffect, useState } from 'react'
import { eventsMapper } from '../../../../pages'
import { fetchEvents } from '../../../services'

const DropDown = ({setEventId} : { setEventId: any}) => {
    const [show, setShow]= useState(false)
    const [events, setEvents]= useState([])
    const [date, setDate]= useState('Date')
    
    useEffect(() => {
      (async function(){
        const events = await fetchEvents('acf/v3/event')
        setEvents(eventsMapper(events))
      })()
    }, [])
    
    return (
      <div className="relative cursor-pointer inline-block text-left">
    <div>
      <button onClick={() => setShow(!show)} type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="options-menu" aria-haspopup="true" aria-expanded="true">
        {date}
        <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  
    <div className={`origin-top-right ${show ? "visible" : "invisible"}  absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}>
      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        {events?.map(event => {
          return (
          <div key={event.id} onClick={() => {
            setEventId(event.id)
            setShow(false)
            setDate(event.date)
          }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">{event.date}</div>          
          )
        })}
        <div key={0} onClick={() => {
            setEventId(0)
            setShow(false)
            setDate('Show All')
          }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Show All</div> 
      </div>
    </div>
  </div>
    )
  }
  
  export default DropDown