import React from "react";
import DirectoriesUserComponent from "../general/directoriesUser";
import "./homepage.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { firebase, auth, database, storage } from "../index";

class HomePageComponent extends React.Component {
  constructor( props ) {
    super( props );
    this.myRef = React.createRef();
    this.infoRef = React.createRef();
    this.highestgradeRef = React.createRef();
    this.dropdownRef = React.createRef();

    this.state = {
      tutorName: '',
      query: '',
      data: [],
      imgData: [],
      filteredData: [],
      moduleSuggestions: [
        "CS1010 Programming Methodology", "CS1010E Programming Methodology",
        "CS1010FC/X Programming Methodology", "CS1010J Programming Methodology",
        "CS1101S Programming Methodology", "CS1020 Data Structures and Algorithms I",
        "CS1020E Data Structures and Algorithms I", "CS1231 Discrete Structures", 
        "CS2010 Data Structures and Algorithms II", "CS2020 Data Structures and Algorithms Accelerated",
        "CS2030 Programming Methodolgy II", "CS2040 Data Structures and Algorithms",
        "CS2040C Data Structures and Algorithms", "CS2100 Computer Organisation",
        "CS2101 Effective Communication for Computing Professionals", "CS2102 Database Systems",
        "CS2103 Software Engineering", "CS2103T Software Engineering", "CS2104 Programming Language Concepts",
        "CS2105 Introduction to Computer Networks", "CS2106 Introduction to Operating Systems",
        "CS2107 Introduction to Information Security", "CS2108 Introduction to Media Computing",
        "CS2113 Software Engineering & Object- Oriented Programming", "CS2113T Software Engineering & Object- Oriented Programming",
        "CS2220 Introduction to Computational Biology", "CS2309 CS Research Methodology", "IFS2200 Information Security Immersion Programme",
        "CS3103 Computer Networks Practice", "CS3103L Computer Networks Laboratory", "CS3201 Software Engineering Project I",
        "CS3202 Software Engineering Project II", "CS3203 Software Engineering Project", "CS3210 Parallel Computing",
        "CS3211 Parallel and Concurrent Programming", "CS3212 Programming Languages", "CS3213 Software Systems Design",
        "CS3216 Software Product Engineering for Digital Markets", "CS3217 Software Engineering on Modern Application Platforms",
        "CS3218 Multimodal Processing in Mobile Platforms", "CS3219 Software Engineering Principles and Patterns",
        "CS3220 Computer Architecture", "CS3221 Operating Systems Design and Pragmatics", "CS3223 Database Systems Implementation",
        "CS3225 Combinatorial Methods in Bioinformatics", "CS3226 Web Programming and Applications", "CS3230 Design and Analysis of Algorithms",
        "CS3233 Competitive Programming", "CS3234 Logic and Formal Systems", "CS3235 Computer Security",
        "CS3236 Introduction to Information Theory", "CS3240 Interaction Design", "CS3241 Computer Graphics", 
        "CS3242 3D Modeling and Animation", "CS3243 Introduction to Artificial Intelligence", "CS3244 Machine Learning",
        "CS3245 Information Retrieval", "CS3246 Multimedia Content Analysis and Search", "CS3247 Game Development",
        "CS3249 User Interface Development", "CS3271 Software Engineering for Reactive Systems", "CS3281 Thematic Systems Project I",
        "CS3282 Thematic Systems Project II", "CS3283 Media Technology Project I", "CS3284 Media Technology Project II",
        "CS4211 Formal Methods for Software Engineering", "CS4212 Compiler Design", "CS4214 Formal Semantics",
        "CS4215 Programming Language Implementation", "CS4216 Constraint Logic Programming", "CS4217 Software Development Technologies",
        "CS4218 Software Testing", "CS4220 Knowledge Discovery Methods in Bioinformatics", "CS4221 Database Applications Design and Tuning",
        "CS4222 Wireless Networking", "CS4223 Multi-core Architecture", "CS4224 Distributed Databases",
        "CS4225 Massive Data Processing Techniques in Data Science", "CS4226 Internet Architecture",
        "CS4231 Parallel and Distributed Algorithms", "CS4232 Theory of Computation", "CS4234 Optimisation Algorithms",
        "CS4235 Computational Geometry", "CS4236 Cryptography Theory and Practice", "CS4237 Systems Modelling and Simulation",
        "CS4238 Computer Security Practice", "CS4239 Software Security", "CS4240 Interaction Design for Virtual and Augmented Reality",
        "CS4241 Multimedia Information Retrieval", "CS4242 Social Media Computing", "CS4243 Computer Vision and Pattern Recognition",
        "CS4244 Knowledge-Based Systems", "CS4246 AI Planning and Decision Making", "CS4247 Graphics Rendering Techniques",
        "CS4248 Natural Language Processing", "CS4249 Phenomena and Theories of Human-Computer Interaction",
        "CS4257 Algorithmic Foundations of Privacy", "CS4275 Programming Real-time Systems", "CS4344 Networked and Mobile Gaming",
        "CS4345 General-Purpose Computation on GPU", "CS4347 Sound and Music Computing", "CS4350 Game Development Project",
        "CS4351 Real-time Graphics", "IFS4102 Digital Forensics", "IFS4103 Penetration Testing Practice",
        "IFS4201 Information Security Industry Capstone Project", "IFS4202 Information Security Practicum Programme",
        "IFS4205 Information Security Capstone Project", "BT5110 Data Management and Warehousing",
        "CS5214 Design of Optimising Compilers", "CS5215 Constraint Processing", "CS5218 Principles of Programme Analysis",
        "CS5219 Automated Software Validation", "CS5222 Advanced Computer Architecture", "CS5223 Distributed Systems",
        "CS5224 Cloud Computing", "CS5226 Database", "Tuning CS5228 Knowledge Discovery and Data Mining", 
        "CS5229 Advanced Computer Networks", "CS5230 Computational Complexity", "CS5231 Systems Security", 
        "CS5232 Formal Specification & Design Techniques", "CS5233 Simulation and Modelling Techniques", 
        "CS5234 Combinatorial and Graph Algorithms", "CS5236 Advanced Automata Theory", "CS5237 Computational Geometry and Applications", 
        "CS5239 Computer System Performance Analysis", "CS5240 Theoretical Foundation of Multimedia", "CS5241 Speech Processing", 
        "CS5242 Neural Networks and Deep Learning", "CS5246 Text Processing on the Web", "CS5248 Systems Support for Continuous Media",
        "CS5249 Audio in Multimedia Systems", "CS5250 Advanced Operating Systems", "CS5271 Performance Analysis of Embedded Systems", 
        "CS5272 Embedded Software Design", "CS5321 Network Security", "CS5322 Database Security", "CS5330 Randomized Algorithms", 
        "CS5331 Web Security", "CS5332 Biometric Authentication", "CS5339 Theory and Algorithms for Machine Learning", 
        "CS5340 Uncertainty Modelling in AI", "CS5342 Multimedia Computing and Applications", "CS5343 Advanced Computer Animation", 
        "CS5344 Big-Data Analytics Technology", "CS5345 Social and Digital Media Analytics", "CS5346 Information Visualisation",
        "CS6101 Exploration of Computer Science Research", "CS6202 Advanced Topics in Programming Languages", 
        "CS6203 Advanced Topics in Database Systems", "CS6204 Advanced Topics in Networking", "CS6205 Advanced Modelling & Simulation", 
        "CS6206 Advanced Topics in HCI", "CS6207 Advanced Natural Language Processing", "CS6208 Advanced Topics in AI",
        "CS6210 The Art of Computer Science Research", "CS6211 Analytical Performance Modelling for Computer Systems", 
        "CS6212 Topics in Media", "CS6213 Topics in Distributed Computing", "CS6215 Advanced Topics in Program Analysis", 
        "CS6220 Advanced Topics in Data Mining", "CS6222 Special Topics in Computational Biology", "CS6230 Topics in Information Security", 
        "CS6231 Topics in System Security", "CS6234 Advanced Algorithms", "CS6240 Multimedia Analysis", "CS6241 Advanced Topics in Computer Graphics", 
        "CS6242 Digital Libraries", "CS6243 Computational Photography", "CS6244 Robot Motion Planning & Control", "CS6270 Virtual Machines", 
        "CS6280 Datacentre Software Dynamics", "CS6281 Topics in Computer Science II", "CS6282 Topics in Computer Science III", 
        "CS6283 Topics in Computer Science IV", "CS6284 Topics in Computer Science IV", "CS6285 Topics in Computer Science VI", 
        "CS6880 Advanced Topics in Software Engineering"
      ],
      filteredResults: [],
      modal: []
    };
  }

  componentDidMount(){
    this.getData();
    this.getImgData();
  }

  async getData(){
    const res = await fetch('https://orbital-cabb2.firebaseio.com/tutors.json'
    );
    const data = await res.json();
    return this.setState({data});
 }

 async getImgData() {
   const wait = await this.getData();

   const {data} = this.state;
   const entries = Object.entries(data);
   const imgData = [];
   entries.forEach( async ([key, value]) => {
     const emailImgUrl = [];
     const email = value.email;
     const imgUrl = await this.getUrl(email).then( async url => await fetch(url)).then(res => res.url);
     console.log(imgUrl);
     emailImgUrl.push(email, imgUrl);
     imgData.push(emailImgUrl);
   });

   return this.setState({imgData});
 }

 getUrl = async (email) => {
  var returnURL;
  const promise = await storage.ref().child(email + "/profile").getDownloadURL().then(function(url) {
    // This can be downloaded directly:
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    returnURL = url;          
  }).catch(function(error) {
       // Handle any errors
       console.log(error.message);
     });           
  return returnURL;
}

  handleOnInputChange = (event) => {
    const query = event.target.value;
    this.setState( { query: query });
    this.listSuggestions(query);
  };

  listSuggestions = (query) => {
    const suggestions = [];

    //compare query to all tutor names in database
    const entriesArr = Object.entries(this.state.data);
    if(query != "") {
      entriesArr.forEach( ([key, value]) => {
        if(key.toLowerCase().includes(query.toLowerCase())) {
          if(value.verified) {
            suggestions.push(key);
          }
        }
      });
      const modulesArr = this.state.moduleSuggestions;
      modulesArr.forEach( module => {
        if(module.toLowerCase().includes(query.toLowerCase())) {
          suggestions.push(module);
        }
      });
    }
    this.displaySuggestions(suggestions);
  }

  displaySuggestions = (suggestions) => {
    this.state.filteredData = [];
    suggestions.forEach( suggestion => {
      this.state.filteredData.push(<li style={{cursor: "pointer"}} onClick={this.autoFill} 
           id="display-data">{suggestion}</li>);
    })
  }

  autoFill = (event) => {
    const result = event.target.innerText;
    //autofill in the searchbar
    this.setState({query: result});
    //remove suggestions
    this.setState({filteredData: []});
  }

  searchResults =  () => {
    const infoNode = this.infoRef.current;
    infoNode.style.visibility = "hidden";
    
    this.setState({filteredData: []});
    const results = [];
    const {query} = this.state;
    const {imgData} = this.state;
    const resultsNode = this.myRef.current;
    resultsNode.style.display = "none";

    //if query is blank
    if(query == "") {
      this.state.modal.push(
        <div style = {{display:"block"}} id="myModal" className="modal">
            <div className="modal-content">
              <span onKeyUp={(e) => this.userTyping(e)} onClick={ this.closeModal } className="close">&times;</span>
              <div className="modal-header">
                <h4>{"Your search: " + this.state.query}</h4>
              </div>
              <p id="noTutorMsg">Search field is empty!</p>
            </div>
          </div>
      );
      this.setState({query: ''});
      return false;
    } else {
      const dataMap = this.state.data;
      const entriesArr = Object.entries(dataMap);
      entriesArr.forEach( ([key, value]) => {
        if(value.verified) {
          //search through keys first
          if(key.toLowerCase().includes(query.toLowerCase())) {
            //create tutor array (name, email, modules and grades array, fees)
              const tutor = [];
              const name = key;
              const email = value.email;
              const modulesAndGrades = value.modules;
              const fees = value.pref_fees;
              const imgUrlPromise = [];
                
              this.state.imgData.forEach( emailImg => {
                console.log(emailImg[0]);
                console.log(email == emailImg[0]);
                if(email == emailImg[0]) {
                  console.log(emailImg[1]);
                  imgUrlPromise.push(emailImg[1]);
                }
              });     
                        
              tutor.push(name, email, modulesAndGrades, fees, imgUrlPromise);
              results.push(tutor);
              delete dataMap[key];                 

          } else {
            //then search through modules
            const modulesArr = value.modules;
            const moduleCode = query.split(" ")[0];
            for(var i=0; i < modulesArr.length; i++) {
              if(modulesArr[i][0].toLowerCase().includes(query.toLowerCase()) || 
                  modulesArr[i][0].toLowerCase().includes(moduleCode.toLowerCase())) {
                const tutor = [];
                const name = key;
                const email = value.email;
                const modulesAndGrades = value.modules;
                const fees = value.pref_fees; 
                const imgUrlPromise = [];
                
                this.state.imgData.forEach( emailImg => {
                  console.log(emailImg[0]);
                  console.log(email == emailImg[0]);
                  if(email == emailImg[0]) {
                    console.log(emailImg[1]);
                    imgUrlPromise.push(emailImg[1]);
                  }
                });     
                
                console.log(imgUrlPromise[0]);
                tutor.push(name, email, modulesAndGrades, fees, imgUrlPromise);
                results.push(tutor);
                delete dataMap[key];              
                //break when one of the tutor's modules matches (so will not add tutor repeatedly)
                break;
              } 
            }
          }
        }
      });
    }
    //reset the data
    this.getData();
    //display the results array
    this.displayResults(results);
  }

  displayResults = async (results) => {
    this.state.filteredResults = [];
    this.state.modal = [];

    if(results.length == 0) {
      this.state.modal.push(
        <div style = {{display:"block"}} id="myModal" className="modal">
            <div className="modal-content">
              <span onKeyUp={(e) => this.userTyping(e)} onClick={ this.closeModal } className="close">&times;</span>
              <div className="modal-header">
                <h4>{"Your search: " + this.state.query}</h4>
              </div>
              <p id="noTutorMsg">No matching tutors found!</p>
            </div>
          </div>
      );
      this.setState({query: ''});
    } else {
      this.state.modal.push(
        <div style = {{display:"block"}} id="myModal" className="modal">
            <div className="modal-content">
              <span onKeyUp={(e) => this.userTyping(e)} onClick={ this.closeModal } className="close">&times;</span>
              <div className="modal-header">
                <h4>{"Your search: " + this.state.query}</h4>
                <div className="dropdown-column">
                  <div className="sortByButton" onClick={this.sortByDropDown}>
                    <p ref={this.dropdownRef}>Sort By</p>
                    <i className="fa fa-sort" aria-hidden="true"></i>
                  </div>
                  <ul>
                    <li onClick={this.searchAndSortByHighestGrade} className="dropdown-highestgrade" ref={this.highestgradeRef}>Highest Grade</li>
                  </ul>
                </div>
                
              </div>
              <ul className="list-group" id="tutor-list">{this.state.filteredResults}</ul>
            </div>
          </div>
      );
      results.forEach( result => {
        const name = result[0];
        const email = result[1];
        const modulesAndGrades = result[2];
        const fees = result[3];
        //this is a promise
        
        const imgUrlPromise = result[4];

        this.state.filteredResults.push(
          <li className="list-group-item link-class" id="tutor-list-item">
            <div id="tutor">
              <img id ={email} className="profileImg" id="profImg" src={imgUrlPromise}></img>
              <div className="basicProfileInfo">
                <ul>
                  <li id="name"><Link to={{ pathname: "/tutorprofile_/" + name, name: name}} target="_blank">{name}</Link></li>
                  <li id="email">{"Email: " + email}</li>
                  <li id="modulesAndGrades">{"Modules: " + this.showModules(modulesAndGrades)}</li>
                  <li id="fees">{"Fee Structure: " + fees}</li>
                </ul>
              </div>
            </div>
          </li>);         
      });
    }
  }


  showModules = (modulesAndGrades) => {
    var stringOfModules = "";
    for(var i = 0; i < modulesAndGrades.length; i++) {
      if(i == modulesAndGrades.length - 1) {
        stringOfModules += (modulesAndGrades[i][0].toUpperCase() + " - " + modulesAndGrades[i][1].toUpperCase());
      } else {
        stringOfModules += (modulesAndGrades[i][0].toUpperCase() + " - " + modulesAndGrades[i][1].toUpperCase()) + ", ";
      }
    }
    return stringOfModules;
  }

  closeModal = () => {
    this.setState({modal: []});
    this.setState({query: ''});
    const resultsNode = this.myRef.current;
    resultsNode.style.display = "";
  }

  sortByDropDown = () => {
    const highestgradeNode = this.highestgradeRef.current;
    if(highestgradeNode.style.display == "block") {
      highestgradeNode.style.display = "none";
    } else {
      highestgradeNode.style.display = "block";
    }
  }

  searchAndSortByHighestGrade = ()=> {
    //Replace the Sort By with Highest Grade
    const highestgradeNode = this.highestgradeRef.current;
    highestgradeNode.style.display = "none";
    const dropdownNode = this.dropdownRef.current;
    dropdownNode.innerText = "Highest Grade";

    this.setState({filteredData: []});
    const results = [];
    const {query} = this.state;

    //if query is blank
    if(query == "") {
      document.getElementById("errorMsgHome").innerHTML =  "Search field is empty";
      document.getElementById("popupHome").classList.toggle("active");
      return false;
    } else {
      const dataMap = this.state.data;
      const entriesArr = Object.entries(dataMap);
      entriesArr.forEach( ([key, value]) => {
        if(value.verified) {
          //search through keys first
          if(key.toLowerCase().includes(query.toLowerCase())) {
            //create tutor array (name, email, modules and grades array, fees)
              const tutor = [];
              const name = key;
              const email = value.email;
              const modulesAndGrades = value.modules;
              const fees = value.pref_fees;
              const imgUrlPromise = [];
                
              this.state.imgData.forEach( emailImg => {
                console.log(emailImg[0]);
                console.log(email == emailImg[0]);
                if(email == emailImg[0]) {
                  console.log(emailImg[1]);
                  imgUrlPromise.push(emailImg[1]);
                }
              });     
                      
              tutor.push(name, email, modulesAndGrades, fees, imgUrlPromise);
              results.push(tutor);
              delete dataMap[key];    
              //$('#result').append('<li class="list-group-item link-class"> '+key+' </li>');
          } else {
            //then search through modules
            const modulesArr = value.modules;
            const moduleCode = query.split(" ")[0];
            for(var i=0; i < modulesArr.length; i++) {
              if(modulesArr[i][0].toLowerCase().includes(query.toLowerCase()) || 
                  modulesArr[i][0].toLowerCase().includes(moduleCode.toLowerCase())) {
                const tutor = [];
                const name = key;
                const email = value.email;
                const modulesAndGrades = value.modules;
                const fees = value.pref_fees;
                const imgUrlPromise = [];
                
              this.state.imgData.forEach( emailImg => {
                console.log(emailImg[0]);
                console.log(email == emailImg[0]);
                if(email == emailImg[0]) {
                  console.log(emailImg[1]);
                  imgUrlPromise.push(emailImg[1]);
                }
              });     
                             
                tutor.push(name, email, modulesAndGrades, fees, imgUrlPromise);
                results.push(tutor);
                delete dataMap[key];              
                //break when one of the tutor's modules matches (so will not add tutor repeatedly)
                break;
              } 
            }
          }
        }
      });
    }
    //reset the data
    this.getData();

    // array of tutor key value pair
    var valuedResults = [];

    //get a value for tutor and store as key value pair in valuedResults array
    for (var i = 0; i < results.length; i++) {
      const email = results[i][1];
      const modulesAndGrades = results[i][2];
      var sum = 0;
      const numOfModules = modulesAndGrades.length;

      for (var j = 0; j < numOfModules; j++) {
        const grade = modulesAndGrades[j][1];
        if (grade == "A+") {
          sum += 10;
        } else if (grade == "A") {
          sum += 9;
        } else if (grade == "A-") {
          sum += 8;
        } else if (grade == "B+") {
          sum += 7;
        } else if (grade == "B") {
          sum += 6;
        } else if (grade == "B-") {
          sum +=5;
        } else if (grade == "C+") {
          sum += 4;
        } else if (grade == "C") {
          sum += 3;
        }
      }
      const average = (sum*1.0) / numOfModules;
      valuedResults.push([average, email]);
    }

    // sort the  valuedResults array
    valuedResults = valuedResults.sort(function (a, b) {
      return b[0] - a[0];
    });

    // then put sorted tutors into array
    const sortedResults = [];
    for(var k = 0; k < valuedResults.length; k++) {
      const averageAndEmail = valuedResults[k];
      var email = averageAndEmail[1];
      results.forEach( result => {
        if(result[1] == email) {
          sortedResults.push(result);
        } 
      })
    }
    this.displayResults(sortedResults);

  }

 

  goToProfile = (event) => {
    const tutorName = event.target.innerText;
    this.setState({tutorName});
    window.open("muletutorprofile", "_blank")
  }

  

  

  userTyping = (e)=> {
    if(e.keyCode === 13) {
      this.searchResults();
    } else if(e.keyCode == 27) {
      this.closeModal();
    }
  }

  stickInfo =()=> {
    const infoNode = this.infoRef.current;
    if(infoNode.style.visibility == "visible") {
      infoNode.style.visibility = "hidden";
    } else {
      infoNode.style.visibility = "visible";
    }
  }
  
  render() {
    const {query} = this.state;

    console.warn(this.state.imgData);

    return (
      <div className="backgroundHome">
        <DirectoriesUserComponent></DirectoriesUserComponent>
        <div className="tutor-search-body">
          <div className="find-tutor">
            <h3>Find a tutor...</h3>
            <i className="tooltip" className="fas fa-question-circle" onClick={this.stickInfo}>
              <span className="right" ref={this.infoRef}>
                  <p>SOCabin recommends a list of tutors for you when you search either by module code or name.</p>
                  <p>You may use our <a href="/dashboard" target="_blank">Chat</a> functionality to get to know the tutors. Just enter the tutor's email to chat freely with any tutor.</p>
                  <i></i>
              </span>
            </i>
          </div>
          <div className="search-box">
            <input
              type="text"
              name="query"
              value={query}
              id="tags"
              className="search-text"
              placeholder="Search by module code or tutor's name!"
              onChange={this.handleOnInputChange}
              onKeyUp={(e) => this.userTyping(e)}
            />
            <a className="search-button" href="#" onClick={() => this.searchResults()}>
              <i className="fas fa-search" />
            </a>
          </div>
          <ul className="list-group" ref={this.myRef} id="result">
          {this.state.filteredData}
          </ul>
          <div className="display-results">
            {this.state.modal}
          </div> 
        </div>
        <div className="popup-home" id="popupHome">
          <div className="overlay-home"></div>
          <div className="content-home">
            <div className="close-btn-home" onClick={() => this.togglePopup()}>
              &times;
            </div>
            <p className="errorMsg-home" id="errorMsgHome">Error</p>
          </div>
        </div>
      </div>
    );
  }

  togglePopup = () => {
  document.getElementById("popupHome").classList.toggle("active");
}
}

export default HomePageComponent;
