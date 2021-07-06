import '../styles/styles.css'
import PublicLayout from "../src/shared/layout"
import '../src/fonts/BalooTamma2-Medium.ttf'
import NoddyStateProvider from "../src/context/context-provider"
import Head from 'next/head'

const disableReactDevTools = (): void => {
  const noop = (): void => undefined;
  if (typeof window !== 'undefined'){
    const DEV_TOOLS = (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (typeof DEV_TOOLS === 'object') {
        for (const [key, value] of Object.entries(DEV_TOOLS)) {
            DEV_TOOLS[key] = typeof value === 'function' ? noop : null;
        }
    }
  }
};

const Noddy = ({ Component, pageProps }) => {
  if (process.env.NODE_ENV != 'development'){
    disableReactDevTools()
  }
  console.log("!!!!!!!!!!!!!!!!!!!!!!!")
  console.log(process.env.NODE_ENV)
  console.log(process.env.PAYMENT_URL)
  console.log(process.env.MERCHANT_ID)
  console.log(process.env.MERCHANT_URL)
  console.log(process.env.NEXT_PUBLIC_SEVER_HOST)
    return (
    <div>
      <Head>
        <title>Noddy Charity Chirstmas Party</title>
        <link rel="preload" href="/load.svg" as="image"/>
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