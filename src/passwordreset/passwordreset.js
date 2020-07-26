import React from "react";
import DirectoriesNoUserComponent from "../general/directoriesNoUser";
import "./passwordreset.css";

const firebase = require("firebase");

class PasswordResetComponent extends React.Component {
  render() {
    return (
      <div className="backgroundPasswordReset">
        <div>
          <DirectoriesNoUserComponent></DirectoriesNoUserComponent>
          <div className="password-reset">
            <h1 id="resetheading">Password Reset</h1>
            <form id="reset-form" onSubmit={(e) => this.tryReset(e)}>
              <p>Enter your account email</p>
              <input
                type="text"
                name="email"
                placeholder="name@hello.com"
                id="reset-email"
                required
              />              
              <input type="submit" value="Send request" />
              <br />
              <a href="/login">Back to login</a>
              <br />
              <a href="/signup">Not an user? Sign up now!</a>
            </form>
          </div>
        </div>
        <div className="popup-reset" id="popupReset">
          <div className="overlay-reset"></div>
          <div className="content-reset">
            <div className="close-btn-reset" onClick={() => this.togglePopup()}>
              &times;
            </div>
            <p className="msg-reset" id="msgReset">Error</p>
          </div>
        </div>
      </div>
    );
  }
  

//----------------------------PasswordReset----------------------------
tryReset= (e) => {
  e.preventDefault();
    const email = document.getElementById("reset-email").value;   
     
    firebase.firestore().collection("toReset").doc(email).set({email: email})
      .then(() => {
        document.getElementById("msgReset").innerHTML = "Request sent! Check your email in a few days!";
        document.getElementById("popupReset").classList.toggle("active");
      } , (err) => {   
        document.getElementById("msgReset").innerHTML = err.message;
        document.getElementById("popupReset").classList.toggle("active");
      }
  );
}

togglePopup = () => {
    window.location.replace("/login");
}

//----------------------end of passwordReset----------------------
}

export default PasswordResetComponent;
