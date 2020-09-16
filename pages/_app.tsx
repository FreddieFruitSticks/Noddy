import '../styles/styles.css'
import PublicLayout from "../src/shared/layout"
import '../src/fonts/BalooTamma2-Medium.ttf'
import NoddyStateProvider from "../src/context/context-provider"
import Head from 'next/head'

const Noddy = ({ Component, pageProps }) => {
  return (
    <div>
      <Head>
        <title>Noddy Charity</title>
        <script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit" async defer></script>
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