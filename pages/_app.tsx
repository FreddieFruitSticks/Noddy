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
  if (process.env.NODE_ENV === 'production'){
    disableReactDevTools()
  }
    return (
    <div>
      <Head>
        <title>Noddy Charity Chirstmas Party</title>
        <link rel="preload" href="/_next/static/media/BalooTamma2-Medium.769b702c2a792b8c5be00b8ea60aa1c7.ttf" crossOrigin="anonymous" type="font/ttf" as="font"/>
        <link rel="preload" href="/noddy-party.svg" as="image"/>
        <link rel="preload" href="/load.svg" as="image"/>
        <script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit&display=swap" async defer></script>
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