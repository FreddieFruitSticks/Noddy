import React, { useEffect, useState } from 'react'
import { elfAdminCheckKidAction, elfAdminKidTextAction } from '../../../context/actions'
import { ElfAdminKid, IKid } from '../../../context/reducer'

var BreakException = {};

const Card = ({dispatch, provided, snapshot, item, rowId, columnId}) => {
    const [open, setOpen] = useState(false)
    const [colour, setColour] = useState("bg-fadedRed")
    const [lighColour, setLightColour] = useState("bg-lightFadedRed")
    const [bag, setBag] = useState(false)
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
            max-h-50 min-h-75 hover:h-100 transition-height flex flex-col ${bag ? "bg-fadedBlue" : snapshot.isDragging ? colour : lighColour}`}
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
                className={`px-4 py-4 cursor-pointer`}>
                <div className="flex justify-between">
                    <div onClick={() => setOpen(!open)}>
                        {item.partyName}
                    </div>
                    <input
                        type="checkbox"
                        className="h-4 w-4 form-checkbox"
                        onClick={()=>{setBag(!bag)}}
                    />

                </div>
                <div onClick={() => setOpen(!open)} className="flex justify-between">
                    <div>
                        {item.paymentConfirmed ? "confirmed" : "unconfirmed"}
                    </div>
                    <div>
                        no: {item.children.length}
                    </div>
                    <div>
                        youngest: {item.children[0].age}
                    </div>
                </div>
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
                            className="h-4 w-4 mr-2 form-checkbox"
                            onClick={() => dispatch(elfAdminCheckKidAction({rowId: rowId, columnId:columnId, childNumber:index}))}
                        />
                        <div className="w-4/12">
                            {child.name}
                        </div>
                        <div className="w-4/12">
                            {child.age}
                        </div>
                        <div className="w-4/12">
                            {child.hasGift ? "has gift": "no gift"}
                        </div>
                    </div>
                    )
                    
                })}
            <textarea
                value={item.text}
                onChange={(event) => {
                    dispatch(elfAdminKidTextAction({rowId: rowId, columnId:columnId, text:event.target.value}))
                }}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name={name}
                autoFocus={false}
            />
            </div>
        </div>
    )
}

export default Card