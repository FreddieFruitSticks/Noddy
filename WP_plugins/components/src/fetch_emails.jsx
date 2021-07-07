import React, {useState} from "react";
import ReactDOM from "react-dom";

const emailParents = async () => {
  
  let serverHost = "noddy.m4v.co.za"
  
  // complete hack because I dont feel like messing around with env vars in WP - dont try this at home kids.
  if (window && window.location && window.location.host === "noddy.co.za"){
    serverHost = "noddy.prod.m4v.co.za"
  }
  
  // This sits behind a login so I just hardocde the auth in. Again, too lazy. 
  const response = await fetch(`https://${serverHost}/wp-json/email-api/v1/email`, {
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
    return true
  }
  
  return false 
}

const SendEmails = () => {
  const [responseOK, setResponseOK] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  
  return (
    <div>
      <button style={{color: 'red', padding: '10px', fontSize: "20px"}} onClick={async () => {
        const sent = await emailParents()
        setResponseOK(sent)
        setShowMessage(true)
      } }>
        Send Invitation Emails
      </button>
      {
        showMessage && responseOK ?
        <div style={{color: 'green'}}>
          Emails sent
        </div>
        :
        (showMessage && !responseOK) ?
        <div style={{color: 'red'}}>
          No more emails to send
        </div>
        :
        <>
        </>
      }
    </div>
  )
}

const domContainer = document.querySelector('#fetch_emails_button_container');
domContainer ? ReactDOM.render(React.createElement(SendEmails), domContainer) : false;