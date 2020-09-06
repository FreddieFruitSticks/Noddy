import React from 'react'
import { ActionType, IAction } from './actions';

export interface Party{
    eventId?: number;
    date?: Date;
    name?: string;
    email?: string;
    cell?: string;
    adults?: number;
    kids?: IKids[]
}

interface IKids{
    name: string;
    age: number;
    hasGift: boolean;
}

export interface InitialState {
    partyForm: Party
} 

export const initialState = {
    partyForm: null
}


const reducer : (a: InitialState, b: IAction<any>) => InitialState = (state, action) => {
    console.log("-------------state before-----------------")
    console.log(state)
    console.log("----------------action--------------------")
    console.log(action)
    switch (action.type) {
        case ActionType.PARTY_FORM:
            return {
                ...state,
                partyForm:{
                    ...state.partyForm,
                    ...action.payload
                }
            }
        
      default:
        return state;
    }
  }
  
  export default reducer