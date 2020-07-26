import React from "react";
import DirectoriesNoUserComponent from "../general/directoriesNoUser";
import "./login.css";

const firebase = require("firebase");

class LoginComponent extends React.Component {
  render() {
    return (
      <div className="backgroundLogin">
        <div>
          <DirectoriesNoUserComponent></DirectoriesNoUserComponent>
          <div className="login">
            <h1 id="loginheading">Login Here</h1>
            <form id="login-form" onSubmit={(e) => this.tryLogin(e)}>
              <p>Email</p>
              <input
                type="text"
                name="email"
                placeholder="name@hello.com"
                id="login-email"
                required
              />
              <p>Password</p>
              <input
                type="password"
                name="password"
                placeholder="Password"
                id="login-password"
                required
              />
              <input type="submit" value="Login" />
              <br />
              <a href="/passwordreset">Forget/Lost password?</a>
              <br />
              <a href="/signup">Not an user? Sign up now!</a>
            </form>
          </div>
        </div>
        <div className="popup-login" id="popupLogin">
          <div className="overlay-login"></div>
          <div className="content-login">
            <div className="close-btn-login" onClick={() => this.togglePopup()}>
              &times;
            </div>
            <p className="errorMsg-login" id="errorMsgLogin">Error</p>
          </div>
        </div>
      </div>
    );
  }
  

//----------------------------login----------------------------
tryLogin = (e) => {
  e.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    firebase.auth().signInWithEmailAndPassword(email, password).then(
      () => {
        //this.props.history.push("/homepage");     
        window.location.replace("/homepage");
      }, (err) => {   
        if (err.code === "auth/user-not-found") {
          document.getElementById("errorMsgLogin").innerHTML = "User not found.";
        } else if (err.code === "auth/wrong-password") {
          document.getElementById("errorMsgLogin").innerHTML = "Incorrect password.";
        } else if (err.code === "auth/too-many-requests") {
          document.getElementById("errorMsgLogin").innerHTML = "Too many incorrect attempts. Please try again later."; 
        } else {
          document.getElementById("errorMsgLogin").innerHTML = err.message;
        }
          document.getElementById("popupLogin").classList.toggle("active");
      }
    );

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        console.log(user.email);
      } else {
        // No user is signed in.
        console.log("no user");
      }
    });
};

togglePopup = () => {
  document.getElementById("popupLogin").classList.toggle("active");
}

//----------------------end of login----------------------
}

export default LoginComponent;
