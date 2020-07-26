import Posts from "../src/components/posts"
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
        <div>
            <Posts data={posts}/>
        </div>   
    )
}

export default HomePage