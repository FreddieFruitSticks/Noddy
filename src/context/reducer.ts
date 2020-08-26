import React from 'react'
import { ActionType, IAction } from './actions';

export interface IWorkingPartyForm{
    eventId: number;
    date: Date;
}

export interface InitialState {
    partyForm: IWorkingPartyForm
} 

export const initialState = {
    count: 0,
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
                    ...action.payload
                }
            }
        
      default:
        return state;
    }
  }
  
  export default reducer