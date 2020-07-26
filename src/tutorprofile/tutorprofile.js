import React from "react";
import DirectoriesUserComponent from "../general/directoriesUser";
import "./tutorprofile.css";
import { auth, database, storage } from "../index";

class TutorProfileComponent extends React.Component {
  render() {
    //reference
    database.ref("tutors").on("value", this.tutorData);
    database.ref("users").on("value", this.getData);
    return (
      <div className="backgroundTutorProfile">
        <DirectoriesUserComponent></DirectoriesUserComponent>
        <div className="profile-body-raised-tutorProfile">
          {}
          <div className="buttons-align-right">
            <a href="/profile" id="view-student-profile-button">
              View Student Profile
            </a>
            <a
              href="../edittutorprofile/edittutorprofile.js"
              id="edit-profile-button"
            >
              Edit Tutor Profile
            </a>
          </div>
          <div className="profile-content-centered">
            {}
            <img
              src="https://cdn1.vectorstock.com/i/1000x1000/51/05/male-profile-avatar-with-brown-hair-vector-12055105.jpg"
              alt=""
              className="avatar-raised avatar-rounded"
              id="profilePic"
            />
            {}
            <div className="profile-content-below-avatar">
              <h2 id="full-name">loading name</h2>
              <h2 id="email">loading email</h2>
              <h4 id="role">loading role</h4>
              <h4 id="year-and-major">loading year and major</h4>
            </div>
          </div>
          {}
          <div className="boxes-adjacent">
            <div id="box-left">
              <h2>Modules and grades achieved:</h2>
              <br />
              <div id="modules-tutor-profile">Loading modules and grades</div>
            </div>
            <div className="spacing" />
            <div id="box-middle">
              <h2>Fee Structure:</h2>
              <br />
              <div id="pref-fees-tutor-profile">Loading fee structure</div>
            </div>
            <div id="box-right">
              <h2>Timings Preferred:</h2>
              <br />
              <div id="pref-timings-tutor-profile">Loading preferred timings</div>
            </div>
            <div className="clear" />
          </div>
          <div className="profile-content-centered">
            <div className="info">
              <h3>Additional information:</h3>
              <br />
              <div id="add-info-tutor-profile">Loading additional info</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  //--------------------------------tutor profile---------------------------------
  tutorData = (data) => {
    try {
      var users_data = data.val();
      var users = Object.keys(users_data);

      for (var i = 0; i < users.length; i++) {
        //data extraction
        var registered_name = users[i];
        var currEmail = users_data[registered_name].email;
        var modules, pref_timings, pref_fees, add_info;
        console.log(currEmail);

        //links the correct data to the correct user
        if (currEmail === auth.currentUser.email) {

          modules = users_data[registered_name].modules;
          pref_timings = users_data[registered_name].pref_timings;
          pref_fees = users_data[registered_name].pref_fees;
          add_info = users_data[registered_name].add_info;

          //links data extracted from database to html
          document.getElementById("full-name").innerHTML = registered_name;
          document.getElementById("pref-timings-tutor-profile").innerHTML = pref_timings;
          document.getElementById("pref-fees-tutor-profile").innerHTML = pref_fees;
          document.getElementById("add-info-tutor-profile").innerHTML = add_info;
          document.getElementById("modules-tutor-profile").innerHTML = "";
          for (var j = 0; j < modules.length; j++) {
            if (modules[j] !== "") {
              var makeli = document.createElement("LI");
              var nextmod = document.createTextNode(
                modules[j][0] + ": " + modules[j][1]
              );
              makeli.appendChild(nextmod);
              document.getElementById("modules-tutor-profile").appendChild(makeli);
            }
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
          console.log(url);
          img.src = url;
          }).catch(function(error) {
             // Handle any errors
          });        
        }
      }
      
    } catch (err) {
      //console.log(err.message);
    }
  };

  getData = (data) => {
    try {
      var users_data = data.val();
      var users = Object.keys(users_data);

      for (var i = 0; i < users.length; i++) {
        //data extraction
        var registered_name = users[i];
        var currEmail = users_data[registered_name].email;
        var role, yearandmajor;

        //links the correct data to the correct user
        if (currEmail === auth.currentUser.email) {
          yearandmajor = yearandmajor =
            "Year " +
            users_data[registered_name].year +
            ", " +
            users_data[registered_name].major;;
          role = users_data[registered_name].role;
          //links data extracted from database to html
          document.getElementById("email").innerHTML = auth.currentUser.email;
          document.getElementById("full-name").innerHTML = registered_name;
          document.getElementById("role").innerHTML = role;
          document.getElementById("year-and-major").innerHTML = yearandmajor;
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  };
}

export default TutorProfileComponent;
 
