import React from "react";
import DirectoriesUserComponent from "../general/directoriesUser";
import "./edittutorprofile.css";
import { firebase, database } from "../index";

class EditTutorProfileComponent extends React.Component {
  render() {
    //reference
    database.ref("tutors").on("value", this.getTutorData);

    return (
      <div className="backgroundEditTutorProfile">
        <DirectoriesUserComponent></DirectoriesUserComponent>
        <div className="tutor-form">
          {}
          <div className="page-header">
            <h3>Edit Your Tutor Profile</h3>
          </div>
          {}
          <div className="form-body">
            <form id="edit-tutor-profile" onSubmit={(e) => this.tryUpdateTutorData(e)}>
              {}
              <div id="tutor-Name">
                <label htmlFor="tutorName">Tutor Name</label>
                <br></br>
                <input
                  className="user-input"
                  id="tutorName"
                  type="text"
                  disabled="disabled"
                />
              </div>
              <label id="module-label" htmlFor="modules">
                Module(s) you would like to teach
                <p>You are allowed to list up to a maximum of 3 modules.</p>
              </label>
              <div className="module-one">
                <label htmlFor="module-one">1.</label>
                <input
                  type="text"
                  placeholder="module code"
                  id="edit-mod-one"
                  required
                />
                <label htmlFor="grade">Grade obtained</label>
                <input type="text" className="grades" id="edit-grade-one" />
              </div>
              <div className="module-two">
                <label className="module-label" htmlFor="module-two">
                  2.
                </label>
                <input
                  type="text"
                  placeholder="module code"
                  id="edit-mod-two"
                />
                <label htmlFor="grade">Grade obtained</label>
                <input type="text" className="grades" id="edit-grade-two" />
              </div>
              <div className="module-three">
                <label className="module-label" htmlFor="module-three">
                  3.
                </label>
                <input
                  type="text"
                  placeholder="module code"
                  id="edit-mod-three"
                />
                <label htmlFor="grade">Grade obtained</label>
                <input type="text" className="grades" id="edit-grade-three" />
              </div>
              {}
              <div className="timings">
                <label htmlFor="timings">Preferred Timings</label>
                <textarea
                  rows={2}
                  cols={56}
                  placeholder="You may write any dates, days or timings you prefer here. (eg. usually free on Wednesday afternoons)"
                  id="edit-pref-timings"
                  required
                  defaultValue={""}
                />
              </div>
              {}
              <div className="fees">
                <label htmlFor="fees">Fee Structure</label>
                <textarea
                  rows={2}
                  cols={56}
                  placeholder="You may write your tuition rates here. (eg. $xx per hour/ up for discussion)"
                  id="edit-pref-fees"
                  required
                  defaultValue={""}
                />
              </div>
              {}
              <div className="information">
                <label htmlFor="info">Additional Information</label>
                <textarea
                  rows={2}
                  cols={56}
                  placeholder="Any additonal information you would like to share on your tutor profile."
                  id="edit-add-info"
                  required
                  defaultValue={""}
                />
              </div>
              <input id="submit" type="submit" value="Update!" />
            </form>
          </div>
        </div>
        <div className="popup-Tprofile" id="popupTProfile">
          <div className="overlay-Tprofile"></div>
          <div className="content-Tprofile">
            <div
              className="close-btn-Tprofile"
              onClick={() => this.closePopup()}
            >
              &times;
            </div>
            <p className="msg-Tprofile" id="msgTProfile">
              Message
            </p>
          </div>
        </div>
      </div>
    );
  }
  //-----------------------------edit tutor profile------------------------------

closePopup = () => {
  window.location.replace("/tutorprofile");
}

getTutorData = (data) => {
    try {
      var users_data = data.val();
      var users = Object.keys(users_data);

      //data extraction
      for (var i = 0; i < users.length; i++) {
        var registered_name = users[i];
        var currEmail = users_data[registered_name].email;

        //links the correct data to the correct tutor
        var pref_timings = users_data[registered_name].pref_timings;
        var pref_fees = users_data[registered_name].pref_fees;
        var add_info = users_data[registered_name].add_info;
        var modules = users_data[registered_name].modules;

        if (currEmail === firebase.auth().currentUser.email) {
        //setting default values
        document.getElementById("tutorName").value = registered_name;
        document.getElementById("edit-mod-one").defaultValue = modules[0][0];
        document.getElementById("edit-grade-one").defaultValue = modules[0][1];

        if (modules[1]) {
          document.getElementById("edit-mod-two").defaultValue = modules[1][0];
          document.getElementById("edit-grade-two").defaultValue = modules[1][1];
          if (modules[2]) {
            document.getElementById("edit-mod-two").defaultValue = modules[1][0];
            document.getElementById("edit-grade-two").defaultValue =
              modules[1][1];
            document.getElementById("edit-mod-three").defaultValue =
              modules[2][0];
            document.getElementById("edit-grade-three").defaultValue =
              modules[2][1];
          }
        }
        document.getElementById("edit-pref-timings").defaultValue = pref_timings;
        document.getElementById("edit-pref-fees").defaultValue = pref_fees;
        document.getElementById("edit-add-info").defaultValue = add_info;
      }
    }
    } catch (err) {
      //have not found out how to deal with empty path yet, but editting works
      console.log(err.message);
    }
  }

  tryUpdateTutorData = (e) => {
    e.preventDefault();
    try {
      const mod_one = document.getElementById("edit-mod-one").value;
      const grade_one = document.getElementById("edit-grade-one").value;
      const mod_two = document.getElementById("edit-mod-two").value;
      const grade_two = document.getElementById("edit-grade-two").value;
      const mod_three = document.getElementById("edit-mod-three").value;
      const grade_three = document.getElementById("edit-grade-three").value;
      const pref_timings = document.getElementById("edit-pref-timings").value;
      const pref_fees = document.getElementById("edit-pref-fees").value;
      const add_info = document.getElementById("edit-add-info").value;
      var modArr = [[mod_one, grade_one]];
      const oldUser = document.getElementById("tutorName").value;

      if (mod_two.trim() !== "") {
        modArr[1] = [mod_two, grade_two];
        if (mod_three.trim() !== "") {
          modArr[2] = [mod_three, grade_three];
        }
      }

      //updates all child nodes
      firebase
        .database()
        .ref("tutors/" + oldUser)
        .update({
          modules: modArr,
          pref_timings: pref_timings,
          pref_fees: pref_fees,
          add_info: add_info,
        });

      document.getElementById("msgTProfile").innerHTML = "Updated successfully! Returning you to your tutor profile...";
      document.getElementById("popupTProfile").classList.toggle("active"); 
    } catch (err) {
      document.getElementById("msgTProfile").innerHTML = err.message;
      document.getElementById("msgTProfile").classList.toggle("active");
    }
  }

  //--------------------------end of edit tutor profile---------------------------
}

export default EditTutorProfileComponent;
