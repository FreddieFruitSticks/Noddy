import '../styles/styles.css'
import PublicLayout from "../src/shared/layout"

export default function Noddy({ Component, pageProps }) {
  return (
    <PublicLayout>
      <Component {...pageProps} />
    </PublicLayout>
  
  )
}