import React from "react";
import DirectoriesNoUserComponent from "../general/directoriesNoUser";
import "./faqnouser.css";

class FAQNoUserComponent extends React.Component {
  render() {
    return (
      <div className="backgroundFAQ">
        <DirectoriesNoUserComponent></DirectoriesNoUserComponent>
        <div className="page-body">
          <div className="header">
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="questions-body">
            <div className="Login">
              <h4>Sign Up / Login</h4>
              <h5>
                Why am I not able to use my personal email to sign up for an
                account?
              </h5>
              <p>
                SOCabin is designed for NUS SOC students and only one account
                can be made per student to ensure an authentic experience. Only
                the NUS email can be used to create an account with SOCabin.
              </p>
            </div>
            <div className="Tutor">
              <h4>Tutor</h4>
              <h5>
                I have submitted the tutor form. Why am I not a tutor yet?
              </h5>
              <p>
                All tutor applications have to go through a verification of
                grades as we want to provide the best for our users and the most
                authentic experience.
              </p>
              <h5>
                I want to become a tutor! Are there are minimum grade
                requirements?
              </h5>
              <p>
                There are no specific grade requirements but we will verify your
                application form and sift out successful applications.
                <br /> You can apply to become a tutor too, starting by creaintg an account!{" "}
              </p>
            </div>
            <div className="others">
              <h4>Others</h4>
              <h5>
                My question is not answered here. Where can I get clarification?
              </h5>
              <p>
                You may use our <a href="/contactusnouser">Contact Us</a> page!
                <br />
                Select "I have a question" option, fill up the details (eg.
                name, email) along with your question
                <br /> and we will get back to you shortly.
              </p>
              <h5>
                I have some feedbacks / have noticed some problems with the
                website. Where can I give my feedback?
              </h5>
              <p>
                You may use our <a href="/contactusnouser">Contact Us</a> page!
                <br />
                Select "Feedback" option, fill up the details (eg. name, email)
                along with your feedback
                <br /> and we will get back to you shortly.
              </p>
            </div>
          </div>
        </div>
        <div id="creators">
          {/* creators div */}
          <h4>Developed by</h4>
          <p>Amy and Kai Chao</p>
          <p className="year">Year 2, Computer Science students</p>
        </div>
      </div>
    );
  }
}

export default FAQNoUserComponent;
