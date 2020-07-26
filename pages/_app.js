import '../styles/styles.css'
import ApolloClient from 'apollo-boost';

export default function Noddy({ Component, pageProps }) {
    const client = new ApolloClient({
      uri: 'https://graphql.example.com'
    });

  return <Component {...pageProps} />
}