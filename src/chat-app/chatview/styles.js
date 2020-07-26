import bg from "../../Images/4k-wallpaper-android-wallpaper-astro-astrology-1146134.jpg";

const styles = (theme) => ({
  content: {
    height: "calc(100vh - 99px)",
    overflow: "auto",
    padding: "25px",
    marginLeft: "300px",
    boxSizing: "border-box",
    top: "50px",
    width: "calc(100% - 300px)",
    position: "absolute",
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    overflowY: "scroll",
  },
  
  noContent: {
    height: "calc(100vh - 99px)",
    overflow: "auto",
    padding: "25px",
    marginLeft: "300px",
    boxSizing: "border-box",
    top: "50px",
    width: "calc(100% - 300px)",
    position: "absolute",
  },

  friendSent: {
    float: "left",
    clear: "both",
    padding: "20px",
    boxSizing: "border-box",
    wordWrap: "break-word",
    marginTop: "10px",
    backgroundColor: "#3A3A3A",
    color: "white",
    width: "300px",
    borderRadius: "10px",
  },

  userSent: {
    float: "right",
    clear: "both",
    padding: "20px",
    boxSizing: "border-box",
    wordWrap: "break-word",
    marginTop: "10px",
    backgroundColor: "#717171",
    color: "white",
    width: "300px",
    borderRadius: "10px",
  },

  chatHeader: {
    width: "calc(100% - 300px)",
    height: "50px",
    backgroundColor: "#222222",
    marginLeft: "300px",
    fontSize: "18px",
    textAlign: "center",
    color: "white",
    paddingTop: "5px",
    boxSizing: "border-box",
  },

  chatHeaderEmail: {
    fontSize: "13px",
    fontStyle: "italic",
  },
});

export default styles;
