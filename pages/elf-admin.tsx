import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { resetServerContext } from "react-beautiful-dnd";
import { GetServerSideProps } from "next";
import { fetchCategories, fetchEvents, fetchParties } from "../src/services";
import useSWR from "swr";
import { IEvent, IHome, eventsMapper } from ".";
import { IKid } from "../src/context/reducer";

interface Item {
    id: number;
    content: string
}

interface IWPParty{
  id: number
  acf:{
    cell_number: string
    children: IKid[]
    email: string
    event_date: string
    eventid: string
    invitation_sent: boolean
    number_of_adults: string
    party_name: string
    payment_confirmed: boolean
  }
}

interface IParty{
  id: number
  cellNumber: string
  children: IKid[]
  email: string
  eventDate: string
  eventid: string
  invitationSent: boolean
  numberOfAdults: string
  partyName: string
  paymentConfirmed: boolean
}



const reorder = (list) => {
    const result = Array.from(list);
    result.sort((party1: Item, party2: Item) => {
        if (party1.id < party2.id){
          return -1
        }else if (party1.id > party2.id){
          return 1
        }
        return 0
      } )
  
    return result;
  };



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
    <div className="relative inline-block text-left">
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
    </div>
  </div>
</div>
  )
}

export const partiesMapper = (wpParties: IWPParty[]) : IParty[] => {
  return wpParties.map(wpParty => {
      return {
          id: wpParty?.id,
          cellNumber: wpParty?.acf?.cell_number,
          children: wpParty?.acf?.children,
          email: wpParty?.acf?.email,
          eventDate: wpParty?.acf?.event_date,
          eventid: wpParty?.acf?.eventid,
          invitationSent: wpParty?.acf?.invitation_sent,
          numberOfAdults: wpParty?.acf?.number_of_adults,
          partyName: wpParty?.acf?.party_name,
          paymentConfirmed: wpParty?.acf?.payment_confirmed
      }
  }) 
}
  
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    resetServerContext()

    return {props: { data : []}}
}

const PartyAdmin = () => {
  const columnsFromBackend = {
    6: {
      name: "Parties",
      items: []
    },
    7: {
      name: "Arrived",
      items: []
    },
    8: {
      name: "Gift Packed",
      items: []
    }
  };
  
  const [columns, setColumns] = useState(columnsFromBackend);
  const [eventId, setEventId] = useState(0);
  const [parties, setParties] = useState([]);
  
  
  useEffect(() => {
    (async function(){
      const parties = await fetchParties('acf/v3/party')
      setParties(partiesMapper(parties))
      const columnsFromBackend = {
        6: {
          name: "Parties",
          items: partiesMapper(parties)
        },
        7: {
          name: "Arrived",
          items: []
        },
        8: {
          name: "Gift Packed",
          items: []
        }
      };
      setColumns(columnsFromBackend)
    })()
  }, [])
  
  useEffect(() => {
    let partiesCopy: IParty[] = [...parties]
    partiesCopy = partiesCopy.filter(party => {
      if (parseInt(party.eventid, 10) === 0){
        return true
      }
      
      if (parseInt(party.eventid, 10) === eventId){
        return true
      }
      
      return false
    })
    
    
    const columnsFromBackend = {
      6: {
        name: "Parties",
        items: partiesCopy
      },
      7: {
        name: "Arrived",
        items: []
      },
      8: {
        name: "Gift Packed",
        items: []
      }
    };
    setColumns(columnsFromBackend)
  }, [eventId])
  
  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: reorder(destItems)
        }
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: reorder(copiedItems)
        }
      });
    }
  };
  
  return (
    <>
    <DropDown setEventId={setEventId}/>
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column] : [any, any], index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
              key={columnId}
            >
              <h2>{column.name}</h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
                          padding: 4,
                          width: 250,
                          minHeight: 500
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id.toString(10)}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 16,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      backgroundColor: snapshot.isDragging
                                        ? "#263B4A"
                                        : "#456C86",
                                      color: "white",
                                      ...provided.draggableProps.style
                                    }}
                                  >
                                    {item.partyName}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
    </>
  );
}

export default PartyAdmin;
