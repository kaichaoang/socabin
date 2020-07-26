import React from 'react';
import ChatListComponent from '../chatlist/chatlist';
import { withStyles } from '@material-ui/core';
import styles from "./styles";
import ChatViewComponent from "../chatview/chatView";
import ChatBarComponent from "../chatbar/chatbar";
import NewChatComponent from "../newchat/newchat";

const firebase = require("firebase");

class DashboardComponent extends React.Component {

    constructor() {
        super();
        this.state = {
          selectedChat: null,
          newChatFormVisible: false,
          email: null,
          chats: []
        };
    }

    render() {

        const {classes} = this.props;

        return (
          <div className={classes.wrapper} >
            <ChatListComponent
              history={this.props.history}
              newChatButtonFunc={this.newChatButtonClicked}
              selectChatFunc={this.selectChat}
              chats={this.state.chats}
              userEmail={this.state.email}
              selectedChatIndex={this.state.selectedChat}
            ></ChatListComponent>

            {
                this.state.newChatFormVisible ? null : (
              <ChatViewComponent user={this.state.email} chat={this.state.chats[this.state.selectedChat]}
              ></ChatViewComponent>
            )}
            {
              // for chat bar
              this.state.selectedChat !== null && !this.state.newChatFormVisible ? (
                <ChatBarComponent messageReadFunc={this.messageRead} submitMessageFunc={this.submitMessage}
                ></ChatBarComponent>
              ) : null
            }

            {
              // for new chat
              this.state.newChatFormVisible ? (<NewChatComponent goToChatFunc={this.goToChat}
                  newChatSubmitFunc={this.newChatSubmit}></NewChatComponent>
              ) : null
            }
          </div>
        );
    }

    goToChat = async (docKey, msg) => {
        //returns an array of 2 users
        const usersInvolved = docKey.split(":");

        const chat =  this.state.chats.find(_chat => usersInvolved.every(_user => _chat.users.includes(_user)));
        this.setState({newChatFormVisible: false});
        await this.selectChat(this.state.chats.indexOf(chat));
        this.submitMessage(msg);
    }

    newChatSubmit = async (chatObj) => {
    const docKey = this.buildDocKey(chatObj.sendTo);
    await 
      firebase
        .firestore()
        .collection('chatLog')
        .doc(docKey)
        .set({
          messages: [{
            message: chatObj.message,
            sender: this.state.email
          }],
          users: [this.state.email, chatObj.sendTo],
          receiverHasRead: false
        })
    this.setState({ newChatFormVisible: false });
    this.selectChat(this.state.chats.length - 1);
  }
    //last index of chats, if its not sent by sender, should be marked as unread, thus receieverHasRead will be false
    //returns a boolean 
    clickChatNotSender = (chatIndex) => this.state.chats[chatIndex].messages[this.state.chats[chatIndex].messages.length - 1].sender !== this.state.email;    

    messageRead = () => {
        const docKey = this.buildDocKey(this.state.chats[this.state.selectedChat].users.filter(_user => _user !== this.state.email)[0]);
        if (this.clickChatNotSender(this.state.selectedChat)) {
            firebase.firestore().collection("chatLog").doc(docKey)
            .update({
                receiverHasRead: true
            })
        } else {
            console.log("clicked message where user is sender")
        }
    }

    //filters you out from an array of you and your friend
    submitMessage = (msg) => {
        const docKey= this.buildDocKey(this.state.chats[this.state.selectedChat].users.filter(_user => _user !== this.state.email)[0])
        firebase.firestore().collection("chatLog").doc(docKey)
        .update({
            //arrayunion combines the messages
            messages: firebase.firestore.FieldValue.arrayUnion({
                sender: this.state.email,
                message: msg,
                timestamp: Date.now()
            }),
            receiverHasRead: false  
        })
    }
    //sorts so that its always in alphabetical order, so that it will always be in the format in firebase as a:b
    buildDocKey = (friend) => [this.state.email, friend].sort().join(":");

    //enables new chat form and prevents any chat selection
    newChatButtonClicked = () => {
        this.setState({newChatFormVisible: true, selectedChat: null})
        console.log('new chat button clicked');
    }

    selectChat = async (chatIndex) => {
        //waits for selectedChat: chatIndex finish
        await this.setState({ selectedChat: chatIndex, newChatFormVisible: false});
        this.messageRead();
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(async _user => {
            try {
            if (!_user) {
                console.log(this.props.history);
                this.props.history.push('/login');
            }
            else {
                await firebase.firestore()
                .collection('chatLog')
                .where('users', 'array-contains', _user.email)
                .onSnapshot(async result => {
                    const chats = result.docs.map(_doc => _doc.data());
                    await this.setState({
                        email: _user.email,
                        chats: chats
                    });
                })
            }
        } catch (err) {
            //has an undefined user error due to no user log in
            console.log(err.message);
        }
        });
    }
}


export default withStyles(styles)(DashboardComponent);