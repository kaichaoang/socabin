import React from "react";
import TextField from "@material-ui/core/TextField";
import Send from "@material-ui/icons/Send";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";


class ChatBarComponent extends React.Component {

  constructor() {
    super();
    this.state = {
      chatText: "",
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.chatTextBoxContainer}>
        <TextField
          placeholder="Type here..."
          onKeyUp={(e) => this.userTyping(e)}
          id="chattextbox"
          className={classes.chatTextBox}
          onFocus={this.userClickedInput}
          InputProps={{
            className: classes.input,
          }}
        ></TextField>
        <Send onClick={this.submitMessage} className={classes.sendBtn}></Send>
      </div>
    );
  }

  //if user press enter, call submitMessage, else updates the chatText variable
  userTyping = (e) =>
    e.keyCode === 13
      ? this.submitMessage()
      : this.setState({
          chatText: e.target.value,
        });

  //checks if a message is valid, deemed by whether if its just full of spaces
  validMessage = (text) => text && text.replace(/\s/g, "").length;

  userClickedInput = () => this.props.messageReadFunc();

  submitMessage = () => {
    if (this.validMessage(this.state.chatText)) {
      //call parent function
      //clears the chat bar upon submitting
      this.props.submitMessageFunc(this.state.chatText);
      document.getElementById("chattextbox").value = "";
    }
  };
}

export default withStyles(styles)(ChatBarComponent);