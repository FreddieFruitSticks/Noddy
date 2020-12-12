import { Party } from "../context/reducer";

export const fetchPosts : any = async (...args) => {
  const response = await fetch(`https://noddy.m4v.co.za/wp-json/${args[0]}?filter[orderby]=date&order=desc`);
  if (response.ok){
    return response.json()
  }
  throw new Error("fetch posts returns "+response.status)
}

export const fetchEvents : any = async (...args) => {
  const response = await fetch(`https://noddy.m4v.co.za/wp-json/${args[0]}?filter[orderby]=date&order=desc`);
  if (response.ok){
    return response.json()
  }
  throw new Error("fetch events returns "+response.status)
}

export const fetchUtils : any = async () => {
  const response = await fetch("https://noddy.m4v.co.za/wp-json/acf/v3/utils");
  if (response.ok){
    const utilsArray = await response.json();
    
    return utilsArray[0].acf
  }
  throw new Error("fetch utils returns "+response.status)
}

export const createParty : (a :any) => Promise<number> = async (data: Party) : Promise<number> => {
  const response = await fetch("https://noddy.m4v.co.za/wp-json/party-api/v1/party", {
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

export const confirmPayment : (a :any, authToken: string) => Promise<number> = async (data: {partyId: number}, authToken) : Promise<number> => {
  const response = await fetch("https://noddy.m4v.co.za/wp-json/party-api/v1/party", {
    method: 'PUT',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Basic " + authToken
    },
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data) 
  })
  
  if (response.ok){
    return await response.json()
  }
  
  throw new Error("confirm party payment "+response.status)
}