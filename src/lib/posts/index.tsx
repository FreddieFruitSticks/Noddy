import React from "react"

const Posts = ({ data }) => {
  const title = (post) => {
    return {__html: post.title.rendered}
  }  
  const content = (post) => {
    return {__html: post.content.rendered}
  }
  
  return (
    <div className="m-2">
      {data?.map(post => {
        return (
          <div key={post.id} className="border-b-2 mb-10 border-black pb-10">
            <div className="text-3xl underline pb-3" dangerouslySetInnerHTML={title(post)}></div>
            <div className="text-lg" dangerouslySetInnerHTML={content(post)}></div>
          </div>
        )
      })}
    </div>
    )
}
export default Posts