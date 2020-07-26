import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { Route, BrowserRouter as Router } from "react-router-dom";
import LoginComponent from "./login/login";
import SignUpComponent from "./signup/signup";
import ContactUsComponent from "./contactus/contactus";
import ContactUsNoUserComponent from "./contactusnouser/contactusnouser";
import AboutUsComponent from "./aboutus/aboutus";
import AboutUsNoUserComponent from "./aboutusnouser/aboutusnouser";
import EditProfileComponent from "./editprofile/editprofile";
import EditTutorProfileComponent from "./edittutorprofile/edittutorprofile";
import ProfileComponent from "./profile/profile";
import TutorFormComponent from "./tutorform/tutorform";
import TutorProfileComponent from "./tutorprofile/tutorprofile";
import FAQComponent from "./faq/faq";
import FAQNoUserComponent from "./faqnouser/faqnouser";
import HomePageComponent from "./homepage/homepage";
import DashBoardComponent from "./chat-app/dashboard/dashboard";
import WelcomeComponent from "./welcome/welcome";
import MuleTutorProfileComponent from "./tutorprofile/muletutorprofile";
import PasswordResetComponent from "./passwordreset/passwordreset";

const firebase = require("firebase");

require("firebase/firestore");
require("firebase/database");

const config = {
  apiKey: "AIzaSyAuOc73L9G1yAA4D3xHpBWaYSLZO-5Tjr8",
  authDomain: "orbital-cabb2.firebaseapp.com",
  databaseURL: "https://orbital-cabb2.firebaseio.com",
  projectId: "orbital-cabb2",
  storageBucket: "orbital-cabb2.appspot.com",
  messagingSenderId: "936108917415",
  appId: "1:936108917415:web:4ce3176446367759c01182",
  measurementId: "G-XETM90MC13",
}

firebase.initializeApp(config);

const auth = firebase.auth();

const database = firebase.database();

const storage = firebase.storage();

export { firebase, auth, database, storage};

const routing = (
  <Router>
    <div id="routing-container">
      <Route exact path="/" component={WelcomeComponent}></Route>
      <Route path="/login" component={LoginComponent}></Route>
      <Route path="/signup" component={SignUpComponent}></Route>
      <Route path="/contactus" component={ContactUsComponent}></Route>
      <Route path="/contactusnouser" component={ContactUsNoUserComponent}></Route>
      <Route path="/aboutus" component={AboutUsComponent}></Route>
      <Route path="/editprofile" component={EditProfileComponent}></Route>
      <Route path="/edittutorprofile" component={EditTutorProfileComponent}></Route>
      <Route path="/profile" component={ProfileComponent}></Route>
      <Route path="/tutorform" component={TutorFormComponent}></Route>
      <Route path="/tutorprofile" component={TutorProfileComponent}></Route>
      <Route path="/faq" component={FAQComponent}></Route>
      <Route path="/faqnouser" component={FAQNoUserComponent}></Route>
      <Route path="/homepage" component={HomePageComponent}></Route>
      <Route path="/dashboard" component={DashBoardComponent}></Route>
      <Route path="/aboutusnouser" component={AboutUsNoUserComponent}></Route>
      <Route path="/tutorprofile_/:tutorName" component={MuleTutorProfileComponent}></Route>
      <Route path="/passwordreset" component={PasswordResetComponent}></Route>
    </div>
  </Router>
);


ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
