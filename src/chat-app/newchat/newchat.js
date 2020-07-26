import React from 'react';
import { FormControl, InputLabel, Input, Button, Paper, withStyles, CssBaseline, Typography } from '@material-ui/core';
import styles from './styles';

const firebase = require("firebase");

class NewChatComponent extends React.Component {

  constructor() {
    super();
    this.state = {
      username: null,
      message: null,
      sameEmail: false
    };
  }
  
  render() {

    const { classes } = this.props;
    return(<main className={classes.main}>
        <CssBaseline>   </CssBaseline>
        <Paper className={classes.paper}>
            <Typography component="h1" variant="h5">Send a message!</Typography>
            <form className={classes.form} onSubmit={(e) => this.submitNewChat(e)}>
            <FormControl fullWidth> 
                <InputLabel htmlFor="new-chat-username">
                    Enter your friend's email
                </InputLabel>
                <Input required className={classes.input} autoFocus onChange={(e) => this.userTyping('username', e)} id="new-chat-username"></Input>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel htmlFor="new-chat-message">
                    Enter your message
                </InputLabel>
                <Input required className={classes.input} onChange={(e) => this.userTyping('message', e)} 
                id="new-chat-message"></Input>
            </FormControl>
            <Button disabled={this.checkEmail()} fullWidth className={classes.submit} variant="contained" color="primary" type="submit">Send!</Button>            
            </form>
            {
                this.checkEmail() ?
                    <Typography className={classes.errorText} component="h5" variant="h6">
                           cannot send to yourself!
                    </Typography>
                    : null
            }
        </Paper>


    </main>);
  }

  userTyping = (type, e) => {      
      switch (type) {
          case 'username':
              this.setState({username: e.target.value});
              break;

        case 'message':
            this.setState({message: e.target.value});
            break;

        default:
            break;
      }
  }

  submitNewChat = async (e) => {
    e.preventDefault();
    //making sure if user exists in our firebase
    const userExists = await this.userExists();
    
    if (userExists) {
        const chatExists = await this.chatExists();
        //if chat already exists, enter the current chat, else create new one
        chatExists ? this.goToChat() : this.createChat();
    } else {
        alert("User does not exist!");
    }
  }

  checkEmail = () => {
      return firebase.auth().currentUser.email === this.state.username;
  }

  createChat = () => {
      this.props.newChatSubmitFunc({
          sendTo: this.state.username,
          message: this.state.message
      })
  }

  goToChat = () => {
      //calls a function that requires 1) doc key to be created, 2) the new message
      this.props.goToChatFunc(this.buildDocKey(), this.state.message);
  }

  buildDocKey = () => {
      //index 0 is sender, index 1 will be new user's username, i.e email
      //doing this to follow doc key format we defined
      return [firebase.auth().currentUser.email, this.state.username].sort().join(":");
  }

  chatExists = async (e) => {
      const docKey = this.buildDocKey();
      const chat = await firebase.firestore().collection("chatLog").doc(docKey).get();
      console.log(chat.exists);
      return chat.exists;
  }

    userExists = async (e) => {
        //obtains possible user data
        const userSnapshot = await firebase.firestore().collection("users").get();

        //maps to the possible user data and sees if the user email entered exists in firebase
        const exists = userSnapshot.docs.map(_doc => _doc.data().email).includes(this.state.username);
        //this.setState({ serverError: !exists });
        return exists;

    }
}

export default withStyles(styles)(NewChatComponent);