import React from "react"
import Posts from "../src/lib/posts"
import { fetchPosts } from "../src/services"

export const getStaticProps = async (context) => {
    try {
        const fetchedPost = await fetchPosts()
         
        if (fetchedPost){
            return {
                props: {
                    posts: fetchedPost.filter(post => {
                        return post.categories[0] == 15
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
  
function ProjectsPage({posts}) {
    return (
        <Posts data={posts}/>    
    )
}

export default ProjectsPage