import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost/graphql',
  cache: new InMemoryCache()
});

export const fetchPosts : any = () => {
    return client
        .query({
            query: gql`
            query GetPosts {
                posts {
                  nodes {
                    id
                    title
                    date
                    content
                  }
                }
              }              
            `
        })
}