import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { resetServerContext } from "react-beautiful-dnd";
import { GetServerSideProps } from "next";

interface Item {
    id: number;
    content: string
}

const itemsFromBackend = [
  { id: 1, content: "First task" },
  { id: 2, content: "Second task" },
  { id: 3, content: "Third task" },
  { id: 4, content: "Fourth task" },
  { id: 5, content: "Fifth task" },
  { id: 6, content: "sixth task" },
  { id: 7, content: "seventh task" },
  { id: 8, content: "eighth task" },
  { id: 9, content: "ninth task" },
  { id: 10, content: "tenth task" },
];

const columnsFromBackend = {
  6: {
    name: "Parties",
    items: itemsFromBackend
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



// export const getServerSideProps: GetServerSideProps = async ({ query }) => {

//     resetServerContext()

//     return {props: { data : []}}

// }

const PartyAdmin = () => {
  const [columns, setColumns] = useState(columnsFromBackend);
  const [items1, setItems] = useState(itemsFromBackend);
  
  
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
                                    {item.content}
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
  );
}

export default PartyAdmin;
