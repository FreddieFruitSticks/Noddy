import React, {useState} from "react";
import ReactDOM from "react-dom";

const emailParents = async () => {
  const response = await fetch("https://noddy.m4v.co.za/wp-json/email-api/v1/email", {
    method: 'PUT',
    headers: {
      // 'Content-Type': 'application/json',
      'Authorization': "Basic RnJlZGRpZUZydWl0c3RpY2tzOjNrWjcgRzljYiBFaFdPIGRwaWIgS2hkWSBkRGJO"
    },
    credentials: 'omit'
    // referrerPolicy: 'no-referrer',
  })
  
  if (response.ok){
    const newLocal = await response.json();
    console.log("!!!!!!!!!!!!!!!!!!!")
    console.log(newLocal)
    return newLocal
  }
  
  throw new Error("confirm party payment "+response.status)
}

const SendEmails = () => {
  const [liked, setLiked] = useState(false)
  
  if (liked) {
    return 'You liked this.';
  }
  return (
    <button onClick={() => emailParents() }>
      Fetch Emails
    </button>
  )
}

const domContainer = document.querySelector('#fetch_emails_button_container');
domContainer ? ReactDOM.render(React.createElement(SendEmails), domContainer) : false;