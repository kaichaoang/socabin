import { withTheme } from "@material-ui/core";

const styles = (theme) => ({
  root: {
    backgroundColor: "#222222",
    height: "calc(100%)",
    position: "absolute",
    left: "0",
    width: "300px",
    boxShadow: "0px 0px 2px black",
    color: "white",
  },
  listItem: {
    cursor: "pointer",
  },
  newChatBtn: {
    borderRadius: "0px",
    color: "#2F2F30",
  },
  unreadMessage: {
    color: "red",
    position: "absolute",
    top: "0",
    right: "5px",
  },
  divider: {
    backgroundColor: "#999999",

  },
});

export default styles;
