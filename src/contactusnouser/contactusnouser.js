import React from "react";
import DirectoriesNoUserComponent from "../general/directoriesNoUser";
import "./contactusnouser.css";
import { firebase } from "../index";

class ContactUsNoUserComponent extends React.Component {
  render() {
    return (
      <div className="backgroundContactUs">
        <DirectoriesNoUserComponent></DirectoriesNoUserComponent>
        <div className="contact-us-body">
          <div className="contact-header">
            <h1>Contact Us</h1>
          </div>
          <div className="contact-form">
            <form onSubmit={(e) => this.sendFeedBack(e)}>
              {}
              <p className="inline">Name</p>
              <input id="nameC" type="text" placeholder="John Smith" required />
              <p className="inline">Email</p>
              <input
                id="emailC"
                type="text"
                name="email"
                placeholder="johnsmith@gmail.com"
                required
              />
              {}
              <div>
                <select className="options" id="aboutC">
                  <option>What is this about?</option>
                  <option value="question">I have a question.</option>
                  <option value="feedback">Feedback</option>
                  <option value="others">Others</option>
                </select>
              </div>
              <div className="message">
                <textarea
                  id="message-box"
                  name="message"
                  rows={13}
                  cols={70}
                  placeholder="Tell us anything here!"
                  defaultValue={""}
                  required
                />
              </div>
              <input id="submit" type="submit" value="Submit" />
            </form>
          </div>
        </div>
        <div className="popup-contactus" id="popupContactUs">
          <div className="overlay-contactus"></div>
          <div className="content-contactus">
            <div className="close-btn-contactus" onClick={() => this.togglePopup()}>
              &times;
            </div>
            <p className="msg-contactus" id="sentFeedBack">
              Error
            </p>
          </div>
        </div>
      </div>
    );    
  }

   togglePopup = () => {
    document.getElementById("popupContactUs").classList.toggle("active");
    window.location.replace("/login");
  };

  sendFeedBack = (e) => {
    e.preventDefault();
    //get user info
    const name = document.getElementById("nameC").value;
    const email = document.getElementById("emailC").value;
    const type =  document.getElementById("aboutC").value;
    const content = document.getElementById("message-box").value;

      firebase.database().ref("feedback/" + type + "/" + content).set([content, name, email,])
      .then(() => {
        document.getElementById("sentFeedBack").innerHTML = "Thank you for your feedback!"
        document.getElementById("popupContactUs").classList.toggle("active");
      },(err) => {          
        document.getElementById("sentFeedBack").innerHTML = err.message;        
        document.getElementById("popupContactUs").classList.toggle("active");
        return false;
      });

    }
}

export default ContactUsNoUserComponent;
