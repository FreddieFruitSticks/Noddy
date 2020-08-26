import React from 'react'
import {GlobalStateContext} from './context-provider'

export const connect = (Page) => {
    return (props) => (
        <GlobalStateContext.Consumer>
            {value => {
                return (
                    <Page {...props} state={value}/>
                )
            }}
        </GlobalStateContext.Consumer>
    )
}