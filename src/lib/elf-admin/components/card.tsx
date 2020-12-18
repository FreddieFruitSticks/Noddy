import React, { useEffect, useState } from 'react'
import { elfAdminCheckKidAction } from '../../../context/actions'
import { ElfAdminKid, IKid } from '../../../context/reducer'

var BreakException = {};

const Card = ({dispatch, provided, snapshot, item, rowId, columnId}) => {
    const [open, setOpen] = useState(false)
    const [colour, setColour] = useState("bg-fadedRed")
    const [lighColour, setLightColour] = useState("bg-lightFadedRed")
    
    useEffect(()=>{
        try{
            item?.children?.forEach((child: ElfAdminKid) => {
                if (!child.checked){
                    setColour("bg-fadedRed")
                    setLightColour("bg-lightFadedRed")
                    throw BreakException
                }
                setColour("bg-fadedGreen")
                setLightColour("bg-lightFadedGreen")
            }) 
        }catch(e){
            if (e !== BreakException) throw e
        }

    })

    return (
        <div
            className={`overflow-y-hidden cursor-pointer ${open && "max-h-none"} 
            max-h-50 min-h-50 hover:h-100 transition-height flex flex-col ${snapshot.isDragging ? colour : lighColour}`}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
                userSelect: "none",
                margin: "0 0 8px 0",
                color: "white",
                ...provided.draggableProps.style
            }}
            >
            <div
                onClick={() => setOpen(!open)} 
                className={`p-4 cursor-pointer`}>
                {item.partyName}
            </div>
            <div className="px-4 pb-4">
                <div className="underline py-2">
                    Children
                </div>
                {item.children.map((child, index) => {
                    return (
                    <div className="flex justify-between">
                    <input
                        checked={child.checked}
                        type="checkbox"
                        className="h-4 w-4 form-checkbox"
                        onClick={() => dispatch(elfAdminCheckKidAction({rowId: rowId, columnId:columnId, childNumber:index}))}
                    />
                    <div>
                        {child.name}
                    </div>
                    <div>
                        {child.age}
                    </div>
                    <div>
                        {child.hasGift ? "has gift": "no gift"}
                    </div>
                    </div>
                    )
                    
                })}
            </div>
        </div>
    )
}

export default Card