import '../styles/styles.css'
import PublicLayout from "../src/shared/layout"
import '../src/fonts/BalooTamma2-Medium.ttf'

export default function Noddy({ Component, pageProps }) {
  return (
    <PublicLayout>
      <Component {...pageProps} />
    </PublicLayout>
  
  )
}