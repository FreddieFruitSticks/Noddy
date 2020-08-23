import '../styles/styles.css'
import PublicLayout from "../src/shared/layout"
import '../src/fonts/BalooTamma2-Medium.ttf'
import NoddyStateProvider from "../src/context/context-provider"
import { initialState } from '../src/context/reducer'

const Noddy = ({ Component, pageProps }) => {
  return (
    <NoddyStateProvider>
      <PublicLayout>
        <Component {...pageProps} />
      </PublicLayout>
    </NoddyStateProvider>
  )
}

export default Noddy