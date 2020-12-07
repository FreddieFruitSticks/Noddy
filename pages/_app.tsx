import '../styles/styles.css'
import PublicLayout from "../src/shared/layout"
import '../src/fonts/BalooTamma2-Medium.ttf'
import NoddyStateProvider from "../src/context/context-provider"
import Head from 'next/head'

const Noddy = ({ Component, pageProps }) => {
  return (
    <div>
      <Head>
        <title>Noddy Charity Chirstmas Party</title>
        <link rel="preload" href="/_next/static/media/BalooTamma2-Medium.769b702c2a792b8c5be00b8ea60aa1c7.ttf" crossOrigin="anonymous" type="font/ttf" as="font"/>
        <link rel="preload" href="/noddy-party.svg" as="image"/>
        {/* <script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit&display=swap" async defer></script> */}
      </Head>
      <NoddyStateProvider>
        <PublicLayout>
          <Component {...pageProps} />
        </PublicLayout>
      </NoddyStateProvider>
    </div>
  )
}

export default Noddy