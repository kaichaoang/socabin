import React from "react";
import DirectoriesUserComponent from "../general/directoriesUser";
import "./tutorprofile.css";
import { withRouter } from "react-router";
import ReactDOM from 'react-dom';
import { firebase, auth, database, storage } from "../index";


class MuleTutorProfileComponent extends React.Component {

    constructor( props ) {
        super( props );
        this.myRef = React.createRef();
        this.moduleRef = React.createRef();
    
        this.state = {
          studentData: [],
          tutorData: [],
          name: this.props.match.params.tutorName,
          email: "",
          yearAndMajor:"",
          modulesAndGrades: [],
          modules: [],
          fees: '',
          timings: '',
          addInfo: '',         

        }
    }
    
  

    async getTutorData(){
        const res = await fetch('https://orbital-cabb2.firebaseio.com/tutors.json');
        const tutorData = await res.json();        
        return this.setState({tutorData});
     }

    async getStudentData() {
        const resp = await fetch('https://orbital-cabb2.firebaseio.com/users.json');
        const studentData = await resp.json();
        return this.setState({studentData});
    }
    
    componentDidMount(){
      this.getTutorData();
      this.getStudentData();
      this.getEmailModulesFeesTimings();
      this.getYearMajor();  
    }

    async getYearMajor() {
      const wait =  await this.getEmailModulesFeesTimings();

        const {email} = this.state;
        var year = '';
        var major = '';

        const studentEntries = Object.entries(this.state.studentData);
        studentEntries.forEach( ([key, value]) => {
            if(JSON.stringify(value.email) == JSON.stringify(email)) {
                year += value.year;
                major += value.major;
            }
        });
        this.setState({yearAndMajor: "Year " + year + ", " + major});
    }

    async getEmailModulesFeesTimings() {
      const wait =  await this.getTutorData();
      const wait2 =  await this.getStudentData();
      
        const {name} = this.state;
        var email = "";
        var modulesAndGrades = [];
        var fees = '';
        var timings = '';
        var addInfo = '';

        const tutorEntries = Object.entries(this.state.tutorData);
        tutorEntries.forEach( ([key, value]) => {
            if(JSON.stringify(key) == JSON.stringify(name)) {
                modulesAndGrades = value.modules;
                email += value.email;
                fees += value.pref_fees;
                timings += value.pref_timings;
                addInfo += value.add_info;
            }
        });

        this.setState({email});
        this.setState({modulesAndGrades});
        this.setState({fees});
        this.setState({timings});
        this.setState({addInfo});
        this.modulesList();

        storage.ref().child(email + "/profile").getDownloadURL().then(function(url) {
        // `url` is the download URL for 'images/stars.jpg'
         
        // This can be downloaded directly:
          var xhr = new XMLHttpRequest();
          xhr.responseType = 'blob';
          xhr.onload = function(event) {
          var blob = xhr.response;
            };
          xhr.open('GET', url);
          xhr.send();
            
          var img = document.getElementById('profilePic');
          img.src = url;
          }).catch(function(error) {
             // Handle any errors
          });
    }

    modulesList =() => {
      const {modulesAndGrades} = this.state;

      for(var i = 0; i < modulesAndGrades.length; i++) {
        const element = <li>{modulesAndGrades[i][0].toUpperCase() + ": " + modulesAndGrades[i][1]}</li>;
        ReactDOM.render(element, document.getElementById('module' + i));
      }
    }


    render() {

        const {name} = this.state;
        const {email} = this.state;
        const {yearAndMajor} = this.state;
        const {fees} = this.state;
        const {timings} = this.state;
        const {addInfo} = this.state;
        const {modulesAndGrades} = this.state;

        return (
          <div className="backgroundTutorProfile">
            <DirectoriesUserComponent></DirectoriesUserComponent>
            <div className="profile-body-raised-tutorProfile">
              {}
              <div className="profile-content-centered">
                {}
                <div className="profile-img">
                  <img
                    src="https://cdn1.vectorstock.com/i/1000x1000/51/05/male-profile-avatar-with-brown-hair-vector-12055105.jpg"
                    alt=""
                    className="avatar-raised avatar-rounded"
                    id="profilePic"
                  />
                </div>
                {}
                <div className="profile-content-below-avatar">
                  <h2 id="full-name">{name}</h2>
                  <h2 id="email">{email}</h2>
                  <h4 id="role">Tutor</h4>
                  <h4 id="year-and-major">{yearAndMajor}</h4>
                </div>
              </div>
              {}
              <div className="boxes-adjacent">
                <div id="box-left">
                  <h2>Modules and grades achieved:</h2>
                  <br />
                  <div id="modules-tutor-profile" ref={this.moduleRef}>
                    <ul id="module">
                      <ul id="module0"></ul>
                      <ul id="module1"></ul>
                      <ul id="module2"></ul>
                    </ul>
                  </div>
                </div>
                <div className="spacing" />
                <div id="box-middle">
                  <h2>Fee Structure:</h2>
                  <br />
                  <div id="pref-fees-tutor-profile">{fees}</div>
                </div>
                <div id="box-right">
                  <h2>Timings Preferred:</h2>
                  <br />
                  <div id="pref-timings-tutor-profile">{timings}</div>
                </div>
                <div className="clear" />
              </div>
              <div className="profile-content-centered">
                <div className="info">
                  <h3>Additional information:</h3>
                  <br />
                  <div id="add-info-tutor-profile">{addInfo}</div>
                </div>
              </div>
            </div>
          </div>
        );
      }
}

export default withRouter(MuleTutorProfileComponent);