import Posts from "../src/lib/posts"
import { fetchPosts } from "../src/services"

export const getServerSideProps = async (context) => {
    try {
        const fetchedPost = await fetchPosts()
         
        if (fetchedPost){
            return {
                props: {
                    posts: fetchedPost.filter(post => {
                        return post.categories[0] == 16
                    })
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