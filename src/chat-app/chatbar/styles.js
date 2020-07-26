const styles = (theme) => ({

  sendBtn: {
    color: "white",
    cursor: "pointer",
    "&:hover": {
      color: "gray",
    },
    paddingTop:"8px"
  },

  chatTextBoxContainer: {
    position: "absolute",
    bottom: "10px",
    left: "315px",
    boxSizing: "border-box",
    overflow: "auto",
    width: "calc(100% - 300px - 50px)",
    backgroundColor: "#7C7B81",
    borderRadius: "20px",
    paddingLeft: "15px",
    paddingRight: "5px",
  },

  chatTextBox: {
    width: "calc(100% - 25px)",
  },
  input: {
    color: "white",
  },
});

export default styles;
