import { IKid, Party } from "../context/reducer";

export const fetchPosts : any = async (...args) => {
  const response = await fetch(`https://noddy.m4v.co.za/wp-json/${args[0]}?filter[orderby]=date&order=desc`);
  if (response.ok){
    return response.json()
  }
  throw new Error("fetch posts returns "+response.status)
}

export const fetchParties : any = async (...args) => {
  const response = await fetch(`https://noddy.m4v.co.za/wp-json/${args[0]}`);
  if (response.ok){
    return response.json()
  }
  throw new Error("fetch party returns "+response.status)
}

export const fetchAllParties : any = async (...args) => {
  let allParties = []
  
  for (let i = 1;;i++){
    try{
      const response = await fetch(`https://noddy.m4v.co.za/wp-json/${args[0]}?per_page=25&page=${i}`);
      if (response.ok){
        let parties = await response.json()
        i+=1
        
        if (parties.lenght === 0){
          break;
        }
        
        allParties = [...allParties, ...parties]
      }else {
        break;
      }
      
    }catch(e){
      console.log(e)
      break;
    }
  }
  
  return allParties
}

export const fetchEvents : any = async (...args) => {
  const response = await fetch(`https://noddy.m4v.co.za/wp-json/${args[0]}?filter[orderby]=date&order=desc`);
  if (response.ok){
    return response.json()
  }
  throw new Error("fetch events returns "+response.status)
}

export const fetchCategories : any = async () => {
  const response = await fetch(`https://noddy.m4v.co.za/wp-json/wp/v2/categories`);
  if (response.ok){
    return response.json()
  }
  throw new Error("fetch categories returns "+response.status)
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
  let kids = [...data.kids]
  
  kids = kids.sort((kid1: IKid, kid2: IKid) => {
    if (kid1.age < kid2.age){
      return -1
    }else if (kid1.age > kid2.age){
      return 1
    }
    return 0
  } )
  
  data.kids = kids
  
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

export const confirmRecaptcha : (a :any) => Promise<any> = async (data: {recaptchaResponse: string}) : Promise<any> => {
  const response = await fetch("https://noddy.m4v.co.za/wp-json/party-api/v1/recaptcha-verify", {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data) 
  })
  
  if (response.ok){
    return await response.json()
  }
  
  throw new Error("confirm recaptcha "+response.status)
}