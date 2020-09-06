import { Party } from "../context/reducer";

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

export const createParty : any = async (data: Party) => {
  const response = await fetch("http://noddy.m4v.co.za/wp-json/party-api/v1/party", {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data) 
  })
  
  if (response.ok){
    return await response.json()
  }
  
  throw new Error("create party returns "+response.status)
}