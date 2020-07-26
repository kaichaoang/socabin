import React from "react";
import DirectoriesNoUserComponent from "../general/directoriesNoUser";
import "./signup.css";
import { firebase, storage, auth } from "../index";


class SignUpComponent extends React.Component {
  render() {
    return (
      <div className="backgroundSignUp">
        <DirectoriesNoUserComponent></DirectoriesNoUserComponent>
        <div className="signup">
          <h1 id="signupheading">Register Here</h1>
          <form id="signup-form" onSubmit={(e) => this.trySignUp(e)}>
            <div className="left">
              <p>Name</p>
              <input
                type="text"
                id="signup-name"
                name="name"
                placeholder="John"
                required
              />
              <p>Email</p>
              <input
                type="email"
                id="signup-email"
                name="email"
                placeholder="name@hello.com"
                required
              />
              <p>CS Modules (Please split using ,)</p>
              <input
                type="text"
                id="signup-modules"
                name="modules"
                placeholder="CS1010, CS1231, ..."
                required
              />
              <p>Password</p>
              <input
                type="password"
                id="signup-password"
                name="password"
                placeholder="Password"
                required
              />
              <p>Re-type Password</p>
              <input
                type="password"
                id="signup-repassword"
                name="repassword"
                placeholder="Password"
                required
              />
              <label>Year of Study </label>
              <select id="year" required>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
              <br></br>
              <br></br>
              <label>Major </label>
              <select id="major" required>
                <option>Computer Science</option>
                <option>Information Systems</option>
                <option>Computer Engineering</option>
                <option>Business Analytics</option>
                <option>Information Security</option>
              </select>
            </div>

            <div className="text-boxes">
              <p>Short decription of yourself! (50 words)</p>
              <textarea
                name="short_des"
                form="signup-form"
                id="short_des"
                type="text"
                required
                defaultValue={""}
              />

              <p>Goals (Just a couple will do)</p>
              <textarea
                name="goals"
                form="signup-form"
                id="goals"
                type="text"
                required
                defaultValue={""}
              />
            </div>
            <input type="submit" value="Register now!" />
            <a href="../login/login.js">
              Already have an account? Log in here!
            </a>
          </form>
        </div>
        <div className="popup-signup" id="popupSignUp">
          <div className="overlay-signup"></div>
          <div className="content-signup">
            <div
              className="close-btn-signup" id="closeButton">
              &times;
            </div>
            <p className="msg-signup" id="msgSignUp">
              Error
            </p>
          </div>
        </div>
      </div>
    );
  }

  //------------------------signup------------------------
  togglePopup = () => {
    window.location.replace("/login");
  }; 

  closeError = () => {
    document.getElementById("popupSignUp").classList.toggle("active");
  }

   createFile = async (email) => {
      var proxyUrl = "https://cors-anywhere.herokuapp.com/",
        targetUrl = "https://cdn1.vectorstock.com/i/1000x1000/51/05/male-profile-avatar-with-brown-hair-vector-12055105.jpg";
      let response = await fetch(proxyUrl + targetUrl);
      let data = await response.blob();
      let metadata = {
        type: 'image/jpeg'
      };
      let imgFile = new File([data], "test.jpg", metadata);
      // ... do something with the file or return it

      var storageRef = storage.ref(email + "/profile");
      storageRef.put(imgFile);
  }

  trySignUp = (e) => {
    e.preventDefault();
    //get user info
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const all_modules = document.getElementById("signup-modules").value;
    const modules = all_modules.split(",");
    const password = document.getElementById("signup-password").value;
    const repassword = document.getElementById("signup-repassword").value;
    const short_des = document.getElementById("short_des").value;
    const goals = document.getElementById("goals").value;
    const year = document.getElementById("year").value;
    const major = document.getElementById("major").value;
    const role = "Student";

    if (password !== repassword) {
      document.getElementById("msgSignUp").innerHTML = "The two passwords are different!";
      document.getElementById("popupSignUp").classList.toggle("active");
      document.getElementById("closeButton").onclick = () => this.closeError();
    } else {
      //sign up
      auth.createUserWithEmailAndPassword(email, password)
        .then(
          () => {
            //set data
            firebase
              .database()
              .ref("users/" + name)
              .set({
                name: name,
                email: email,
                modules: modules,
                password: password,
                repassword: repassword,
                short_des: short_des,
                goals: goals,
                role: role,
                major: major,
                year: year,
              });
            const userObj = { email: email };

            firebase
              .firestore()
              .collection("users")
              .doc(email)
              .set(userObj)
              .then(() => {
                document.getElementById("msgSignUp").innerHTML = "Successfully signed up! Returning you to login...";
                document.getElementById("popupSignUp").classList.toggle("active");
                document.getElementById("closeButton").onclick = () => this.togglePopup();
              });            

            this.createFile(email);
           
          },
          (err) => {
            var errorCode = err.code;
            if (errorCode === "auth/weak-password") {
              document.getElementById("msgSignUp").innerHTML =
                "The password is too weak.";
            } else if (errorCode === "auth/email-already-in-use") {
              document.getElementById("msgSignUp").innerHTML =
                "Email already in use!";
            } else if (errorCode === "auth/invalid-email") {
              document.getElementById("msgSignUp").innerHTML = "Invalid email!";
            } else {
              document.getElementById("msgSignUp").innerHTML = err.message;
            }
            document.getElementById("popupSignUp").classList.toggle("active");
            document.getElementById("closeButton").onclick = () => this.closeError();
            return false;
          }
        );
    }

    //------------------------end of signup------------------------
  };
}

export default SignUpComponent;
