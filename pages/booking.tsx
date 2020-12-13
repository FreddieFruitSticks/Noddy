import React from 'react'
import BookingView from '../src/lib/booking'
import { connect } from '../src/context/connector'
import { Context } from '../src/context/context-provider'
import Head from 'next/head'

export const getStaticProps = async (context) => {
    return {
        props:{}
    }
  }
  
const Booking = (props: Context) => {
    return (
        <div>
            <Head>
                <title>Noddy Charity Chirstmas Party</title>
        
                <script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit&display=swap" async defer></script>
            </Head>
            <BookingView {...props}/> 
        </div>
    )
}

export default connect(Booking)