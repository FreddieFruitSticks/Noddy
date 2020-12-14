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
    return true
  }
  
  return false 
}

const SendEmails = () => {
  const [responseOK, setResponseOK] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  
  return (
    <div>
      <button onClick={async () => {
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