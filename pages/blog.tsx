import React from "react"
import useSWR from "swr"
import Posts from "../src/lib/posts"
import { fetchPosts } from "../src/services"

export const getStaticProps = async (context) => {
    return {
        props:{}
    }
}
  
const mapper = (posts) => {
    return posts.filter(post => {
        return post.categories[0] == 16
    })
}
  
function BlogPage({}) {
    const { data, error } = useSWR('wp/v2/posts', fetchPosts)
    
    return (
        <div className="min-h-screen">
            {error && 
                <div className="w-full flex items-center justify-center">
                    <img className="h-20" src="error.svg"/>
                    <div>Could not blog...</div>
                </div>
            }
            {data ? 
            <Posts data={mapper(data)}/>
            :                 
                <div className="w-full flex items-center justify-center">
                    <img className="h-20" src="load.svg"/>
                    <div>Loading blog...</div>
                </div>
            }
            
        </div>
    )
}

export default BlogPage