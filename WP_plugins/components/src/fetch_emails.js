class LikeButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = { liked: false };
  }
  
  
  emailParents = async () => {
    const response = await fetch("https://noddy.m4v.co.za/wp-json/email-api/v1/email", {
      method: 'PUT',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      referrerPolicy: 'no-referrer',
    })
    
    if (response.ok){
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!")
      return await response.json()
    }
    
    throw new Error("confirm party payment "+response.status)
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }
    return (
      <button onClick={() => emailParents() }>
        Fetch Emails
      </button>
    )
  }
}

const domContainer = document.querySelector('#fetch_emails_button_container');
ReactDOM.render(React.createElement(LikeButton), domContainer);