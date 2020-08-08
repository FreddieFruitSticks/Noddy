import Posts from "../src/lib/posts"
import { fetchPosts } from "../src/services"

export const getStaticProps = async (context) => {
    try {
        const fetchedPost = await fetchPosts()   
        if (fetchedPost){
            return {
                props: {
                    posts: fetchedPost?.data?.posts?.nodes
                },
            }
        }
        return {
            props:{}
        }
        
    }catch(err){
        return {
            props:{}
        }
    }
  }

function HomePage({posts}) {
    return (
        <Posts data={posts}/>    
    )
}

export default HomePage