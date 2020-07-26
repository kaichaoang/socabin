import React from "react";
import DirectoriesNoUserComponent from "../general/directoriesNoUser";
import "./aboutusnouser.css";

class AboutUsNoUserComponent extends React.Component {

  constructor( props ) {
    super( props );
    this.hookRef = React.createRef();
    this.detailsRef = React.createRef();
    this.creatorsRef = React.createRef();
  }

  showHook = () => {
    const hookNode = this.hookRef.current;
    hookNode.style.visibility = "visible";
  }

  scrollToDetails = () => {
    const detailsNode = this.detailsRef.current;
    detailsNode.scrollIntoView({
         behavior: "smooth",
         block: 'center',
    });
  }

  scrollToCreators = () => {
    const creatorsNode = this.creatorsRef.current;
    creatorsNode.scrollIntoView({
         behavior: "smooth",
         block: 'center',
    });
  }

  render() {
    return (
      <div className="backgroundAboutUs">
        <DirectoriesNoUserComponent></DirectoriesNoUserComponent> 
        <div>
          <div className="top-half">
            <div id="page-one-content" className="header">
              <h2>The SOCabin Story</h2>
            </div>
            <div onMouseOver={this.showHook} className="hook">
              <p id="page-one-content">Supporting you in your SOC journey</p>
              <div id="page-two-content"  ref={this.hookRef}>
                <h5>No more</h5>
                <p>
                  {" "}
                  aimlessly struggling with module content...
                  <br /> hours and hours of debugging alone...
                  <br /> trouble with asking for guidance...
                </p>
                <h4>Welcome to SOCabin</h4>
              </div>
            </div>
            <input
              id="learn-more"
              type="button"
              onClick={this.scrollToDetails}
              defaultValue="Learn More"
            />
          </div>
          <div className="btm-half">
            {}
            <div ref={this.detailsRef} id="details">
              <p>
                SOCabin is a platform designed to support computing students and
                encourage you to strive to achieve more and gain more knowledge.
                With SOCabin, you can find a tutor in the school of computing
                best suited for your goals, who understands what you need and
                what you are going through. We connect students and tutors
                together, along with some features to support you in your
                academic goals.
              </p>
              <div className="inner">
                <h4>Features</h4>
                <p>
                  A convenient chat interface
                  <br />A group formation system
                  <br />
                  Informative academic forums
                </p>
                <input
                  id="meet"
                  type="button"
                  onClick={this.scrollToCreators}
                  defaultValue="Meet the Creators"
                />
              </div>
            </div>
            <div className="faq">
              <p>
                Have a question? View our <a href="/faqnouser">FAQs</a> section!
              </p>
            </div>
          </div>
          {}
          <div ref={this.creatorsRef} id="creators">
            <h4>Developed by</h4>
            <p>Amy and Kai Chao</p>
            <p className="year">Year 2, Computer Science students</p>
            <p></p>
          </div>
        </div>
      </div>
    );
  }
  
}

export default AboutUsNoUserComponent;
