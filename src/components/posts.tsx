import React from "react"

const Posts = ({ data }) => {
  console.log(data)
  return (
    <div>
      {data?.map(post => {
        return <div>{post.id}</div>
      })}
    </div>
    )
}
export default Posts