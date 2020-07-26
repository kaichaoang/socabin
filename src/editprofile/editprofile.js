import React from "react";
import DirectoriesUserComponent from "../general/directoriesUser";
import "./editprofile.css";
import { firebase, database, storage, auth } from "../index";


class EditProfileComponent extends React.Component {
  render() {
    //reference
    database.ref("users").on("value", this.getData); 

    return (
      <div className="backgroundEditProfile">
        <DirectoriesUserComponent></DirectoriesUserComponent>
        <div className="page-body">
          <div className="edit-profile-page-header">
            <h3>Edit Your Student Profile</h3>
          </div>
          <div className="edit-profile-body">
            {}
            <div className="image-label">
              <label htmlFor="profile-image" id="profile-image-label">
                Profile Image
              </label>
              <div className="input-image">
                <input
                  type="file"
                  multiple={false}
                  accept="image/*"
                  id="inputImg"
                  onChange={() => this.inputDetected()}
                />
              </div>
            </div>

            <div className="preview-container" id="previewContainer">
              <img src="/Images/Avatar.png" alt="" className="preview-image" />
              <span className="default-preview">
                Upload Profile Image
                <p className="detail">
                  Kindly wait for approximately 5s for uploading to be possible.
                </p>
              </span>
            </div>

            <form id="updateForm" onSubmit={(e) => this.tryUpdateData(e)}>
              <div id="oldName">
                <label htmlFor="oldName">Old Name</label>
                <br></br>
                <input
                  className="user-input"
                  id="edit-oldName"
                  type="text"
                  disabled="disabled"
                />
              </div>
              <div id="information">
                <label htmlFor="name">New Name</label>
                <br></br>
                <input
                  className="user-input"
                  id="edit-name"
                  type="text"
                  required
                />
              </div>
              <div id="year">
                <label>Year of Study</label>
                <select className="user-input" id="edit-year" required>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                </select>
              </div>
              <div id="major">
                <label>Major</label>
                <select className="user-input" id="edit-major" required>
                  <option>Computer Science</option>
                  <option>Information Systems</option>
                  <option>Computer Engineering</option>
                  <option>Business Analytics</option>
                  <option>Information Security</option>
                </select>
              </div>
              <div id="modules-taking">
                <label htmlFor="modules-taking">Modules</label>
                <input
                  className="user-input"
                  id="edit-mod"
                  type="text"
                  placeholder="Please include all computing modules you are currently taking."
                  defaultValue={""}
                  required
                />
              </div>
              <div id="biography">
                <label htmlFor="biography">Biography</label>
                <textarea
                  className="user-input"
                  id="edit-bio"
                  rows={5}
                  cols={60}
                  placeholder="Anything you would like to share on your profile page."
                  required
                  defaultValue={""}
                />
              </div>
              <div id="goals">
                <label htmlFor="goals">Would like to learn more about</label>
                <textarea
                  className="user-input"
                  id="edit-goals"
                  rows={5}
                  cols={60}
                  placeholder="eg. Web Development, Algorithms, or you can even include modules"
                  required
                  defaultValue={""}
                />
              </div>
              <input id="finishEdit" type="submit" value="Finish Editing!" />
            </form>
          </div>
        </div>
        <div className="popup-profile" id="popupProfile">
          <div className="overlay-profile"></div>
          <div className="content-profile">
            <div
              className="close-btn-profile"
              onClick={() => this.closePopup()}
            >
              &times;
            </div>
            <p className="msg-profile" id="msgProfile">
              Message
            </p>
          </div>
        </div>
      </div>
    );
  }
  //----------------------editprofile----------------------
  

  closePopup = () => {
    window.location.replace("/profile");
  }

  inputDetected = () => {
    const inputImg = document.getElementById("inputImg");
    const previewImage = document.querySelector(".preview-image");

    if (inputImg !== null) {
      inputImg.addEventListener("change", function () {
        //get file
        const imgFile = this.files[0];

        if (imgFile) {
          //get storage ref
          var storageRef = storage.ref(auth.currentUser.email + "/profile");

          //store img
          storageRef.put(imgFile);

          const reader = new FileReader();

          document.querySelector(".default-preview").style.display = "none";
          document.querySelector(".preview-image").style.display = "block";

          reader.addEventListener("load", function () {
            document
              .querySelector(".preview-image")
              .setAttribute("src", this.result);
          });

          reader.readAsDataURL(imgFile);

        } else {
          document.querySelector(".default-preview").style.display = null;
          document.querySelector(".preview-image").style.display = null;
          document
            .querySelector(".preview-image")
            .setAttribute("src", previewImage.getAttribute("src"));
        }
      });
    }
  };

  getData = (data) => {
    try {
      var users_data = data.val();
      var users = Object.keys(users_data);

      //data extraction
      for (var i = 0; i < users.length; i++) {
        //data extraction
        var registered_name = users[i];
        var currEmail = users_data[registered_name].email;
        var name, des, year, major, goals, modules;

        //links the correct data to the correct user
        if (currEmail === firebase.auth().currentUser.email) {
          name = users_data[registered_name].name;
          des = users_data[registered_name].short_des;
          goals = users_data[registered_name].goals;
          modules = users_data[registered_name].modules;
          year = users_data[registered_name].year;
          major = users_data[registered_name].major;
          var mods = "";
          for (var j = 0; j < modules.length; j++) {
            if (j === modules.length - 1) {
              mods += modules[j];
            } else {
              mods += modules[j] + ",";
            }
          }
        }
        //setting default values
        document.getElementById("edit-oldName").value = name;
        document.getElementById("edit-year").value = year;
        document.getElementById("edit-major").value = major;
        document.getElementById("edit-name").defaultValue = name;
        document.getElementById("edit-mod").defaultValue = mods;
        document.getElementById("edit-bio").defaultValue = des;
        document.getElementById("edit-goals").defaultValue = goals;
      }
    } catch (err) {
      //have not found out how to deal with empty path yet, but editting works
      //console.log(err.message);
    }
  };

  tryUpdateData = (e) => {
    e.preventDefault();
    try {
      var all_modules = document.getElementById("edit-mod").value;
      const newUser = document.getElementById("edit-name").value;
      const oldUser = document.getElementById("edit-oldName").value;

      //updates all child nodes
      firebase
        .database()
        .ref("users/" + oldUser)
        .update({
          name: newUser,
          year: document.getElementById("edit-year").value,
          major: document.getElementById("edit-major").value,
          modules: all_modules.split(","),
          short_des: document.getElementById("edit-bio").value,
          goals: document.getElementById("edit-goals").value,
        });

      //if user name same dont have to change parent node
      if (newUser !== oldUser) {
        // //makes new parent node with updated data copied
        var oldRef = database.ref("users");
        oldRef
          .child(oldUser)
          .once("value")
          .then(function (snap) {
            const data = snap.val();
            var update = {};
            update[newUser] = data;
            update[oldUser] = null;
            return oldRef.update(update);
          });

        database
          .ref("users/" + oldUser)
          .remove()
          .then(function () {
            console.log("Remove succeeded." + oldUser);
          })
          .catch(function (error) {
            console.log("Remove failed: " + error.message);
          });
      }
      document.getElementById("msgProfile").innerHTML = "Updated successfully! Returning you to your profile...";
      document.getElementById("popupProfile").classList.toggle("active"); 
    } catch (err) {
      document.getElementById("msgProfile").innerHTML = err.message;
      document.getElementById("msgProfile").classList.toggle("active");
    }
  };

  //----------------------end of edit profile----------------------
}

export default EditProfileComponent;
