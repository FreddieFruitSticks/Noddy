import React from "react"

const Posts = ({ data }) => {
  return (
    <div>
      {data?.map(post => {
        return <div>{post.title.rendered}</div>
      })}
    </div>
    )
}
export default Posts