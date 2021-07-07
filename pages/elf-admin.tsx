import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { resetServerContext } from "react-beautiful-dnd";
import { GetServerSideProps } from "next";
import { fetchAllParties, fetchParties } from "../src/services";
import { ElfAdminColumns, ElfAdminKid, IElfAdminParty, IParty, IWPParty } from "../src/context/reducer";
import { elfAdminColumnsAction } from "../src/context/actions";
import { connect } from "../src/context/connector";
import { Context } from "../src/context/context-provider";
import Card from "../src/lib/elf-admin/components/card";
import DropDown from "../src/lib/elf-admin/components/dropdown";

const reorder = (list) => {
    const result = Array.from(list);
    result.sort((party1: IParty, party2: IParty) => {
        if (party1.children[0].age < party2.children[0].age){
          return -1
        }else if (party1.children[0].age > party2.children[0].age){
          return 1
        }
        return 0
      } )
  
    return result;
  };

export const partiesMapper = (wpParties: IWPParty[]) : IElfAdminParty[] => {
  return wpParties.map(wpParty => {
    const children : ElfAdminKid[] = wpParty?.acf?.children?.map(wpChild => {
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
          paymentConfirmed: wpParty?.acf?.payment_confirmed,
          text: ""
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
      const parties = await fetchAllParties('acf/v3/party')
      console.log("!!!!!!!!!!!!!!!!!!")
      console.log("!!!!!!!!!!!!!!!!!!")
      console.log(parties)
      
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
                                    rowId={column.items.findIndex(isId(item.id))}
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
