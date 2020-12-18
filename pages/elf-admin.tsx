import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { resetServerContext } from "react-beautiful-dnd";
import { GetServerSideProps } from "next";
import { fetchEvents, fetchParties } from "../src/services";
import { eventsMapper } from ".";
import { ElfAdminColumns, ElfAdminKid, IParty, IWPParty } from "../src/context/reducer";
import { elfAdminColumnsAction } from "../src/context/actions";
import { connect } from "../src/context/connector";
import { Context } from "../src/context/context-provider";
import Card from "../src/lib/elf-admin/components/card";


const reorder = (list) => {
    const result = Array.from(list);
    result.sort((party1: IParty, party2: IParty) => {
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

export const partiesMapper = (wpParties: IWPParty[]) : IParty[] => {
  return wpParties.map(wpParty => {
    const children : ElfAdminKid[] = wpParty?.acf?.children.map(wpChild => {
      return {
        name:wpChild.child_name,
        age: wpChild.child_age,
        hasGift: wpChild.has_gift,
        checked: false
      }
    })
      return {
          id: wpParty?.id,
          cellNumber: wpParty?.acf?.cell_number,
          children: children,
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

    return {props: {}}
}

const PartyAdmin = ({state, dispatch}: Context) => {  
  const [eventId, setEventId] = useState(0);
  useEffect(() => {
    (async function(){
      const parties = await fetchParties('acf/v3/party')
      
      let columnsFromState = state?.elfAdmin?.columns ? state.elfAdmin.columns : {
        0: {
          name: "Parties",
          items: partiesMapper(parties)
        },
        1: {
          name: "Arrived",
          items: []
        },
        2: {
          name: "Gift Packed",
          items: []
        }
      }
      
      dispatch(elfAdminColumnsAction(columnsFromState))
    })()
  }, [])
  
  const isId = (id) => element => {
    return element.id == id
  }
  
  const onDragEnd = (result, filteredColumns, columns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    const sourceColumn = columns[source.droppableId];
    
    const element = filteredColumns[source.droppableId].items[source.index].id
    const indexOfColumn = columns[source.droppableId].items.findIndex(isId(element))
    
    if (source.droppableId !== destination.droppableId) {
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(indexOfColumn, 1);
      destItems.splice(destination.index, 0, removed);
      const newColumns = {
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destination.droppableId != '2' ? reorder(destItems) : destItems
        }
      };
      
      dispatch(elfAdminColumnsAction(newColumns))
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      const newColumns = {
        ...columns,
        [source.droppableId]: {
          ...column,
          items: destination.droppableId != '2' ? reorder(copiedItems) : copiedItems
        }
      };
      
      dispatch(elfAdminColumnsAction(newColumns))
    }
  };
  
  const partyFilter: any = party => {
    if (eventId === 0) {
      return true;
    }

    if (parseInt(party.eventid, 10) === eventId) {
      return true;
    }

    return false;
  };
  
  const filteredElfAdminColumns = (elfAdminColumns : ElfAdminColumns) => {
    let columnsCopy = {...elfAdminColumns}
    columnsCopy = {
      0: {
        name: columnsCopy[0].name,
        items: columnsCopy[0].items.filter(partyFilter)
      },      
      1: {
        name: columnsCopy[1].name,
        items: columnsCopy[1].items.filter(partyFilter)
      },
      2: {
        name: columnsCopy[2].name,
        items: columnsCopy[2].items.filter(partyFilter)
      },
    }
    
    return columnsCopy
  }
  
  return (
    <>
    <DropDown setEventId={setEventId}/>
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <DragDropContext
        onDragEnd={(result) => {onDragEnd(result, filteredElfAdminColumns(state?.elfAdmin?.columns), state?.elfAdmin?.columns)}}
      >
        {state?.elfAdmin?.columns && Object.entries(state?.elfAdmin?.columns).map(([columnId, column] : [any, any], index) => {

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
                        className={`min-h-screen p-1 `}
                        style={{
                          background: snapshot.isDraggingOver ? "#FCDDDC" : "lightgrey",
                          width: 250,
                        }}
                      >
                        {column.items.filter(partyFilter).map((item: IParty, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id.toString(10)}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <Card
                                    dispatch={dispatch}
                                    provided={provided}
                                    snapshot={snapshot}
                                    item={item}
                                    rowId={index}
                                    columnId={columnId}
                                  />
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

export default connect(PartyAdmin);
