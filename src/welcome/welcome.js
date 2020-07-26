import React from "react";
import "./welcome.css"


class WelcomeComponent extends React.Component {
  render() {
    return (
      <div className="backgroundContainer">
        <button id="button">
          <a href="/login" id="button-link">
            Go to SOCabin
          </a>
        </button>
      </div>
    );
  }
}


//export default withStyles(styles)(WelcomeComponent);
export default WelcomeComponent;