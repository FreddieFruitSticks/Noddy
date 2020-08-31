export const fetchPosts : any = async () => {
  const response = await fetch("http://noddy.m4v.co.za/wp-json/wp/v2/posts");
  if (response.ok){
    return await response.json()
  }
  throw new Error("fetch posts returns "+response.status)
}

export const fetchEvents : any = async () => {
  const response = await fetch("http://noddy.m4v.co.za/wp-json/acf/v3/event");
  if (response.ok){
    return await response.json()
  }
  throw new Error("fetch events returns "+response.status)
}