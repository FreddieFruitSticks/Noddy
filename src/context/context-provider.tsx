import React, { useReducer } from 'react'
import reducer, { InitialState, initialState } from './reducer'
import { partyAction } from './actions'

export interface Context {
    state: InitialState,
    dispatch?: React.Dispatch<any>
}

export const GlobalStateContext = React.createContext<any>({
    state: initialState
})

const NoddyStateProvider = ({children}) => {
    let localState = {}
    if (typeof window !== 'undefined') {
        const storage = window.localStorage.getItem("noddyState");
        if (storage) {
            localState = JSON.parse(storage);
        }
    }
    
    let [state, dispatch] = useReducer(reducer, {...initialState, ...localState})
    // console.log("-------------state after-----------------")
    // console.log(state)
    
    return (
        <GlobalStateContext.Provider value={{state, dispatch}}>
            {children}
        </GlobalStateContext.Provider>
    )
}

export default NoddyStateProvider