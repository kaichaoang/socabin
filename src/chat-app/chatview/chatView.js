import React from "react";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

class ChatViewComponent extends React.Component {

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

    componentDidUpdate = () => {
        const container = document.getElementById("chatview-container");

        //make it such that the conversation is always scrolled to most bottom
        if (container) {
            container.scrollTo(0, container.scrollHeight);
        }
    }

    render() {
        const {classes, chat, user,} = this.props;
        
        const WhiteTextTypography = withStyles({
          root: {
            color: "#FFFFFF",
            textAlign: "center",
            background: "rgba(97, 97, 97, 0.8)",
            width: "35%",
            fontSize: "15px",
            fontWeight: "bold",
            borderRadius: "20px",
            transform: "translate(calc(50vw - 100%),calc(50vh - 100px))",
          },
        })(Typography);

        if (chat === undefined) {
            // handle the case where index is null
            return (
              <main id="chatview-container" className={classes.noContent}>
                <WhiteTextTypography>
                  Please select a chat to start messaging!
                </WhiteTextTypography>
              </main>
            );
        } else {
            return(
            <div>
                <div className={classes.chatHeader}>
                    {this.getOtherUserName(chat.users.filter(_user => _user !== user)[0])}
                    <div className={classes.chatHeaderEmail}>{chat.users.filter(_user => _user !== user)[0]}</div>
                </div>
              <main id="chatview-container" className={classes.content}>
                  {
                      chat.messages.map((_msg, _index) => {
                          return(
                              //display message on left or right depending on sender
                              <div key={_index} className={_msg.sender === user ? classes.userSent : classes.friendSent}>
                                {_msg.message}
                            </div>                          
                          )
                    })
                  }
              </main>
            </div>
            )
        }
    }
}

export default withStyles(styles)(ChatViewComponent);