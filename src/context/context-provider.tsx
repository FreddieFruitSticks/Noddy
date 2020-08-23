import React, { useReducer } from 'react'
import reducer, { InitialState, initialState } from './reducer'

export interface Context {
    state: InitialState,
    dispatch?: React.Dispatch<any>
}

export const GlobalStateContext = React.createContext<any>({
    state: initialState
})

const NoddyStateProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    
    return (
        <GlobalStateContext.Provider value={{...state, dispatch}}>
            {children}
        </GlobalStateContext.Provider>
    )
}

export default NoddyStateProvider