import React from "react";
import logo from "../Images/TransparentLogo.png";
import "./directoriesUser.css";

const firebase = require("firebase");

class DirectoriesUserComponent extends React.Component {
  newTab = (path) => {
    window.open(path, "_blank")
  }
  render() {
    return (
      <nav className="directories-user">
        <img className="logo-user" src={logo} alt="" />
        <ul className="directories-list-user">
          <li className="link-user">
            <a href="/homepage">Home</a>
          </li>
          <li className="link-user">
            <a href="/dashboard" target="_blank">Chats</a>
          </li>
          <li className="link-user">
            <a href="/aboutus">About Us</a>
          </li>
          <li className="link-user">
            <a href="/tutorform">Become a Tutor</a>
          </li>
          <li className="link-user">
            <a href="/faq">FAQ</a>
          </li>
          <li className="link-user">
            <a href="/contactus">Contact Us</a>
          </li>
          <li className="link-user">
            <a id="acc-and-logout" href="#">
              ...
            </a>
            <ul className="dropdown-user">
              <li>
                <a href="/profile" className="dropdown-words">
                  Account Profile
                </a>
              </li>
              <li>
                <a
                  className="dropdown-words"
                  href="#"
                  onClick={() => this.tryLogout()}
                >
                  Log Out
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    );
  }
  
////----------------------logout----------------------
tryLogout = () => {
  firebase.auth().signOut().then( 
      () => {
        //this.props.history.push("/login");     
        window.location.replace("/login");     
      }, (err) => {
        window.alert(err);
      }
    );
};

//----------------------end of logout----------------------
}

export default DirectoriesUserComponent;
