import React from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import styles from "./styles";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import NotificationImportant from "@material-ui/icons/NotificationImportant";

class ChatListComponent extends React.Component {

    constructor(){
        super();
        this.state = {
            data: [],
        };
    }

    async getData(){
        const res = await fetch('https://orbital-cabb2.firebaseio.com/users.json'
        );
        const data = await res.json();
        return this.setState({data});
    }
    
    componentDidMount(){
      this.getData();
    }

    getOtherUserName = (otherUserEmail) => {
        const entries = Object.entries(this.state.data);
        var otherUserName = "";
        entries.forEach( ([key, value]) => {
            if(JSON.stringify(value.email) === JSON.stringify(otherUserEmail)) {
                console.log("key:" + key);
                otherUserName += key;
            }
        });
        return otherUserName;
    }

    render() {
        const { classes } = this.props;

        const WhiteTextTypography = withStyles({
          root: {
            color: "#C8C8D3",
          },
        })(Typography);
        
        if(this.props.chats.length > 0) {
        return(<main className={classes.root}>
            <Button variant="contained"
            fullWidth
            color="primary"
            className={classes.newChatButton}
            onClick={this.newChat}>
                New Message
            </Button>
            <List>
                {
                    // mapping list items to array to render them
                    this.props.chats.map((_chat, _index) => {
                        // the other user's email
                        const otherUserEmail = _chat.users.filter(_user=> _user !== this.props.userEmail)[0];
                        // get other user's name to display on chat list
                        const otherUserName = this.getOtherUserName(otherUserEmail);

                        return (
                        <div key={_index}>
                          <ListItem
                            onClick={() => this.selectChat(_index)}
                            className={classes.listItem}
                            selected={this.props.selectedChatIndex === _index}
                            alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp">
                                        {_chat.users.filter(_user=> _user !== this.props.userEmail)[0].split('')}
                                    </Avatar>                                    
                                </ListItemAvatar>
                                <ListItemText primary={otherUserName}
                                secondary={
                                    <React.Fragment>
                                        <WhiteTextTypography component="span" color="initial">
                                            {
                                                // gets first 30 characters
                                                _chat.messages[_chat.messages.length-1].message.substring(0,30)
                                            }
                                        </WhiteTextTypography>
                                    </React.Fragment>
                                }>

                                </ListItemText>
                                {
                                    //only if havent read and the last message is not from the sender 
                                    _chat.receiverHasRead === false && !this.userIsSender(_chat) ?
                                    <ListItemIcon>
                                        <NotificationImportant className={classes.unreadMessage}></NotificationImportant>
                                    </ListItemIcon> : null
                                }
                            </ListItem>
                            <Divider classes={{root: classes.divider}}></Divider>
                            </div>
                        );                                    
                    })                
                }
            </List>
        </main>
        );
            } else {
                return(
                <main className={classes.root}>
                    <Button variant="contained"
                    fullWidth
                    color="primary"
                    onClick={this.newChat}
                    className={classes.newChatButton}>
                        New Message
                    </Button>
                <List></List>
                </main>);
            }        
    }

    newChat = () => {
        this.props.newChatButtonFunc();
    }

    selectChat = (index) => {
        this.props.selectChatFunc(index);
    }

    userIsSender = (chat) => chat.messages[chat.messages.length - 1].sender === this.props.userEmail;

    

}

export default withStyles(styles)(ChatListComponent);