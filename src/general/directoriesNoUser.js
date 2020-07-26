import React from "react";
import logo from "../Images/TransparentLogo.png";
import "./directoriesNoUser.css";

class DirectoriesNoUserComponent extends React.Component {
  render() {
    return (
      <nav className="directories-noUser">
        <img className="logo-noUser" src={logo} alt="" onClick={window.open(this.src)}/>
        <ul className="directories-list-noUser">
          <li className="link-noUser">
            <a href="/aboutusnouser">About Us</a>
          </li>
          <li className="link-noUser">
            <a href="/faqnouser">FAQ</a>
          </li>
          <li className="link-noUser">
            <a href="/contactusnouser">Contact Us</a>
          </li>
           <li className="link-noUser">
            <a href="/signup">Sign Up</a>
          </li>
          <li className="link-noUser">
            <a href="/login">Login</a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default DirectoriesNoUserComponent;
