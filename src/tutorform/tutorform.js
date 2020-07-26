import React from "react";
import DirectoriesUserComponent from "../general/directoriesUser";
import "./tutorform.css";
import { firebase, auth, database } from "../index";

class TutorFormComponent extends React.Component {
  render() {
    //reference
    database.ref("users").on("value", this.getData);
    return (
      <div className="backgroundTutorForm">
        <DirectoriesUserComponent></DirectoriesUserComponent>
        <div className="tutor-form">
          {}
          <div className="page-header">
            <h3>Tutor Application Form</h3>
            <p>
              Please fill in the details below.
              <br />
              You will become an authorized tutor after we verify some of your
              information.
            </p>
            <p>
              Verification will take a few working days and you will be notified
              via email after successful verification!
            </p>
          </div>
          {}
          <div className="form-body">
            <form id="application-form" onSubmit={(e) => this.tryApplyTutor(e)}>
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
              <br></br>
              <div className="module-one">
                <label htmlFor="module-one">1.</label>
                <input
                  type="text"
                  placeholder="module code"
                  id="mod-one"
                  required
                />
                <label htmlFor="grade">Grade obtained</label>
                <input type="text" className="grades" id="grade-one" />
              </div>
              <div className="module-two">
                <label className="module-label" htmlFor="module-two">
                  2.
                </label>
                <input type="text" placeholder="module code" id="mod-two" />
                <label htmlFor="grade">Grade obtained</label>
                <input type="text" className="grades" id="grade-two" />
              </div>
              <div className="module-three">
                <label className="module-label" htmlFor="module-three">
                  3.
                </label>
                <input type="text" placeholder="module code" id="mod-three" />
                <label htmlFor="grade">Grade obtained</label>
                <input type="text" className="grades" id="grade-three" />
              </div>
              {}
              <div className="timings">
                <label htmlFor="timings">Preferred Timings</label>
                <textarea
                  rows={2}
                  cols={56}
                  placeholder="You may write any dates, days or timings you prefer here. (eg. usually free on Wednesday afternoons)"
                  id="pref-timings"
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
                  id="pref-fees"
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
                  id="add-info"
                  required
                  defaultValue={""}
                />
              </div>
              <input id="submit" type="submit" value="Apply!" />
            </form>
          </div>
        </div>
        <div className="popup-apply" id="popupApply">
          <div className="overlay-apply"></div>
          <div className="content-apply">
            <div className="close-btn-apply" onClick={() => this.togglePopup()}>
              &times;
            </div>
            <p className="msg-apply" id="msgApply">Message</p>
          </div>
        </div>
      </div>
    );
  }
  //-----------------------tutor application-----------------------
  getData = (data) => {
    try {
      var users_data = data.val();
      var users = Object.keys(users_data);

      //data extraction
      for (var i = 0; i < users.length; i++) {
        //data extraction
        var registered_name = users[i];
        var currEmail = users_data[registered_name].email;
        var name;

        //links the correct data to the correct user
        if (currEmail === firebase.auth().currentUser.email) {
          name = users_data[registered_name].name;
        }
        //setting default values
        document.getElementById("tutorName").value = name;
      }
    } catch (err) {
      //have not found out how to deal with empty path yet, but editting works
      //console.log(err.message);
    }
  };

  tryApplyTutor = (e) => {
    e.preventDefault();
    try {
      //get application info
      const applicant = document.getElementById("tutorName").value;
      const mod_one = document.getElementById("mod-one").value;
      const grade_one = document.getElementById("grade-one").value;
      const mod_two = document.getElementById("mod-two").value;
      const grade_two = document.getElementById("grade-two").value;
      const mod_three = document.getElementById("mod-three").value;
      const grade_three = document.getElementById("grade-three").value;
      const pref_timings = document.getElementById("pref-timings").value;
      const pref_fees = document.getElementById("pref-fees").value;
      const add_info = document.getElementById("add-info").value;
      var modArr = [[mod_one, grade_one]];

      if (mod_two.trim() !== "") {
        modArr[1] = [mod_two, grade_two];
        if (mod_three.trim() !== "") {
          modArr[2] = [mod_three, grade_three];
        }
      }

      //add data under pending applications
      database.ref("applications/" + applicant).set({
        email: auth.currentUser.email,
        modules: modArr,
        pref_timings: pref_timings,
        pref_fees: pref_fees,
        add_info: add_info,
      });

      //preparing for successful tutors
      database.ref("tutors/" + applicant).set({
        email: auth.currentUser.email,
        modules: modArr,
        pref_timings: pref_timings,
        pref_fees: pref_fees,
        add_info: add_info,
        verified: false
      });
        document.getElementById("msgApply").innerHTML = "Successfully applied! Returning you to home...";
        document.getElementById("popupApply").classList.toggle("active");
    } catch (err) {
      window.alert("Error: tutor application: " + err.message);
      return false;
    }
  };

  togglePopup = () => {
    window.location.replace("/homepage");
  };
  //-----------------------end of tutor application-----------------------
}

export default TutorFormComponent;
