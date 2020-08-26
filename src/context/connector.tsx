import React from 'react'
import {GlobalStateContext} from './context-provider'

export const connect = (Page) => {
    return (props) => (
        <GlobalStateContext.Consumer>
            {value => {
                const {state, dispatch} = value
                return (
                    <Page {...props} state={state} dispatch={dispatch}/>
                )
            }}
        </GlobalStateContext.Consumer>
    )
}