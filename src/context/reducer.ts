import React from 'react'
import { ActionType, IAction } from './actions';


export interface Item {
    id: number;
    content: string
}

export interface IWPKid{
    child_name: string;
    child_age: number;
    has_gift: boolean;
}

export interface IWPParty{
  id: number
  acf:{
    cell_number: string
    children: IWPKid[]
    email: string
    event_date: string
    eventid: string
    invitation_sent: boolean
    number_of_adults: string
    party_name: string
    payment_confirmed: boolean
  }
}

export interface IParty{
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

export interface IElfAdminParty extends IParty{
    text: string
}

export interface Party{
    eventId?: number;
    date?: Date;
    name?: string;
    email?: string;
    cell?: string;
    adults?: number;
    kids?: IKid[]
}

export interface IKid{
    name: string;
    age: number;
    hasGift: boolean;
}

export interface ElfAdminKid extends IKid{
    checked: boolean
}

export interface Utils{
    price_per_ticket: number;
    year_of_party: number;
    bookings_openclosed: boolean;
}

export interface ElfAdminColumn{
    name: string;
    items: IParty[];
}

export interface ElfAdminColumns{
    0: ElfAdminColumn;
    1: ElfAdminColumn;
    2: ElfAdminColumn;
}

export interface InitialState {
    partyForm: Party
    utils: Utils
    elfAdmin: {
        columns: ElfAdminColumns
    }
} 

export const initialState: InitialState = {
    partyForm: {
        kids: []
    },
    utils: null,
    elfAdmin: null
}


const reducer : (a: InitialState, b: IAction<any>) => InitialState = (state, action) => {
    // console.log("-------------state before-----------------")
    // console.log(state)
    // console.log("----------------action--------------------")
    // console.log(action)

    switch (action.type) {
        case ActionType.PARTY_FORM:{
            const newState = {
                ...state,
                partyForm: {
                    ...state.partyForm,
                    ...action.payload
                }
            }
            
            if (typeof window !== 'undefined'){
                window.localStorage.setItem("noddyState", JSON.stringify(newState))
            }
            
            return newState
        }
            
        case ActionType.UTILS:{
            const newState = {
                ...state,
                utils: {
                    ...state.utils,
                    ...action.payload
                }
            }
            
            if (typeof window !== 'undefined'){
                window.localStorage.setItem("noddyState", JSON.stringify(newState))
            }
            
            return newState
        }        
        
        case ActionType.ADD_KID:{
            const newState = {
                ...state,
                partyForm: {
                    ...state.partyForm,
                    kids: [
                        ...state.partyForm.kids,
                        {name: "", age: 0, hasGift:false}
                    ]
                }
                
            }
            
            if (typeof window !== 'undefined'){
                window.localStorage.setItem("noddyState", JSON.stringify(newState))
            }
            
            return newState
        }
        
        case ActionType.REMOVE_KID:{
            let kidsCopy = [...state.partyForm.kids]
            const newKids = kidsCopy.splice(action.payload, 1)
            
            const newState = {
                ...state,
                partyForm: {
                    ...state.partyForm,
                    kids: [
                        ...kidsCopy
                    ]
                }
                
            }
            
            if (typeof window !== 'undefined'){
                window.localStorage.setItem("noddyState", JSON.stringify(newState))
            }
            
            return newState
        }
        
        case ActionType.ELF_ADMIN_COLUMNS:{
            const newState:InitialState = {
                ...state,
                elfAdmin:{
                    columns: {
                        ...action.payload
                    }
                }            
            }
            
            if (typeof window !== 'undefined'){
                window.localStorage.setItem("noddyState", JSON.stringify(newState))
            }
            
            return newState
        }        
        case ActionType.ELF_ADMIN_CHECK_KID:{
            const oldChild = {...state.elfAdmin.columns[action.payload.columnId].items[action.payload.rowId].children[action.payload.childNumber]};
            
            const newChild = {
                ...oldChild,
                checked: !oldChild.checked
            }
            
            const oldItem = {...state.elfAdmin.columns[action.payload.columnId].items[action.payload.rowId]}
            oldItem.children.splice(action.payload.childNumber, 1, newChild)
            const newItem = {
                ...oldItem,
                children: [...oldItem.children]
            }
            
            const oldColumn = state.elfAdmin.columns[action.payload.columnId];
            oldColumn.items.splice(action.payload.rowId, 1, newItem)
            
            const newState:InitialState = {
                ...state,
                elfAdmin:{
                    columns: {
                        ...state.elfAdmin.columns,
                        [action.payload.columnId]: {
                            ...oldColumn
                        }
                    }
                }            
            }
            
            if (typeof window !== 'undefined'){
                window.localStorage.setItem("noddyState", JSON.stringify(newState))
            }
            
            return newState
        }
        
        case ActionType.ELF_ADMIN_KID_TEXT:{
            const oldItem = {...state.elfAdmin.columns[action.payload.columnId].items[action.payload.rowId]}
            const newItem = {
                ...oldItem,
                text: action.payload.text
            }
            
            const oldColumn = state.elfAdmin.columns[action.payload.columnId];
            oldColumn.items.splice(action.payload.rowId, 1, newItem)
            
            const newState:InitialState = {
                ...state,
                elfAdmin:{
                    columns: {
                        ...state.elfAdmin.columns,
                        [action.payload.columnId]: {
                            ...oldColumn
                        }
                    }
                }            
            }
            
            if (typeof window !== 'undefined'){
                window.localStorage.setItem("noddyState", JSON.stringify(newState))
            }
            
            return newState
        }
        
      default:
        return state;
    }
  }
  
  export default reducer