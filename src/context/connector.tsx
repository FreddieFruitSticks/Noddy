import React from 'react'
import {GlobalStateContext} from './context-provider'

export const connect = (Page) => {
    return ({}) => (
        <GlobalStateContext.Consumer>
            {value => {
                return (
                    <Page state={value}/>
                )
            }}
        </GlobalStateContext.Consumer>
    )
}