import React, { useContext } from 'react'
import Home from "../src/lib/home"
import { fetchPosts } from "../src/services"
import {GlobalStateContext, Context } from "../src/context/context-provider"
import { connect } from "../src/context/connector"

export const getStaticProps = async (context) => {
    return {
        props:{}
    }
  }

const HomePage = ({state, dispatch}: Context) => {
    return (
            <div>
                {state.count}
                <Home/>    
            </div>
        )
}

export default connect(HomePage)