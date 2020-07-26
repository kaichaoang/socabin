import React from "react";
import DirectoriesUserComponent from "../general/directoriesUser";
import "./profile.css";
import { firebase, auth, database, storage } from "../index";

class ProfileComponent extends React.Component {
  render() {
    //reference
    database.ref("users").once("value", this.defaultData);
    database.ref("tutors").on("value", this.tutorData);

    return (
      <div className="backgroundProfile">
        <DirectoriesUserComponent></DirectoriesUserComponent>
        <div>
          <div className="profile-body-raised-profile">
            <div className="buttons-align-right">
              <button id="view-tutor-profile-button">View Tutor Profile</button>
              <a href="/editprofile" id="edit-profile-button">
                Edit Student Profile
              </a>
            </div>
            <div className="profile-content-centered">
              <img
                src="https://cdn1.vectorstock.com/i/1000x1000/51/05/male-profile-avatar-with-brown-hair-vector-12055105.jpg"
                alt=""
                className="avatar-raised avatar-rounded"
                id="profilePic"
              />
              <div className="profile-content-below-avatar">
                <h2 id="full-name">loading name</h2>
                <h2 id="email">loading email</h2>
                <h4 id="role">loading role</h4>
                <h4 id="year-and-major">loading year and major</h4>
              </div>
            </div>
            <div className="boxes-adjacent">
              <div id="box-left">
                <h2>Modules currently taking:</h2>
                <br />
                <div id="modules-profile">Loading modules</div>
              </div>
              <div className="spacing" />
              <div id="box-middle">
                <p id="biography-profile">Loading bio</p>
              </div>
              <div className="spacing" />
              <div id="box-right">
                <h2>Looking to learn more about:</h2>
                <br />
                <div id="goals-profile">Loading goals</div>
              </div>
              <div className="clear" />
            </div>
          </div>
        </div>
        <div className="popup-nottutor" id="popupNotTutor">
          <div className="overlay-nottutor"></div>
          <div className="content-nottutor">
            <div
              className="close-btn-nottutor"
              onClick={() => this.togglePopup()}
            >
              &times;
            </div>
            <p className="errorMsg-nottutor" id="errorMsgNotTutor">
              Error
            </p>
          </div>
        </div>
        {}
      </div>
    );
  }

  //----------------------profile----------------------
  togglePopup = () => {
    document.getElementById("popupNotTutor").classList.toggle("active");
  };

  defaultData = (data) => {
    try {
      var users_data = data.val();
      var users = Object.keys(users_data);

      for (var i = 0; i < users.length; i++) {
        //data extraction
        var registered_name = users[i];
        var currEmail = users_data[registered_name].email;
        var name, des, role, yearandmajor, goals, modules, email;

        //links the correct data to the correct user
        if (currEmail === firebase.auth().currentUser.email) {
          email = currEmail;
          name = users_data[registered_name].name;
          des = users_data[registered_name].short_des;
          role = users_data[registered_name].role;
          yearandmajor =
            "Year " +
            users_data[registered_name].year +
            ", " +
            users_data[registered_name].major;
          goals = users_data[registered_name].goals;
          modules = users_data[registered_name].modules;

          //links data extracted from database to html
          document.getElementById("full-name").innerHTML = name;
          document.getElementById("role").innerHTML = role;
          document.getElementById("email").innerHTML = email;
          document.getElementById("year-and-major").innerHTML = yearandmajor;
          document.getElementById("biography-profile").innerHTML = des;
          document.getElementById("goals-profile").innerHTML = goals;
          document.getElementById("modules-profile").innerHTML = "";
          for (var j = 0; j < modules.length; j++) {
            var makeli = document.createElement("LI");
            var nextmod = document.createTextNode(modules[j]);
            makeli.appendChild(nextmod);
            document.getElementById("modules-profile").appendChild(makeli);
          }       

        storage.ref().child(auth.currentUser.email + "/profile").getDownloadURL().then(function(url) {
        // `url` is the download URL for 'images/stars.jpg'

        // This can be downloaded directly:
          var xhr = new XMLHttpRequest();
          xhr.responseType = 'blob';
          xhr.onload = function(event) {
          var blob = xhr.response;
            };
          xhr.open('GET', url);
          xhr.send();

          // Or inserted into an <img> element:
          var img = document.getElementById('profilePic');
          img.src = url;
          }).catch(function(error) {
             // Handle any errors
          });
        }
      }
    } catch (err) {
        console.log(err.message);
      }
    };

  tutorData = (data) => {
    try {
      var users_data = data.val();
      var users = Object.keys(users_data);

      var disableButton = true;

      for (var i = 0; i < users.length; i++) {
        //data extraction
        var registered_name = users[i];
        var currEmail = users_data[registered_name].email;
        var verified = users_data[registered_name].verified;

        //checks if tutor is verified
        if (currEmail === auth.currentUser.email && verified) {
          disableButton = false;
          break;
        }
      }
      if (disableButton) {
        document.getElementById(
          "view-tutor-profile-button"
        ).onclick = function () {
          document.getElementById("errorMsgNotTutor").innerHTML = "You are not a tutor yet!";
          document.getElementById("popupNotTutor").classList.toggle("active");
        };
      } else {
        document.getElementById(
          "view-tutor-profile-button"
        ).onclick = function () {
          window.location.replace("/tutorprofile");
        };
      }
    } catch (err) {
      //console.log(err.message);
    }
  };

  //----------------------end of profile----------------------
}

export default ProfileComponent;
