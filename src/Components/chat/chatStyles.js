import { makeStyles } from "@material-ui/core/styles"
import chatBackgroundImage from "./../../images/white-scratone.png"

export let chatStyles = makeStyles({
  container: {
    padding: 0,
    height: "calc(100% - 80px)",
    overflow: "hidden",
    width: "100%",
    margin: 0,
  },
  chat: {
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    paddingRight: 20,
    marginRight: -20,
    overflowY: "scroll",
    overflowX: "hidden",
    width: "100%",
    height: "100%",
  },
  chatContollers: {
    display: "flex",
    "align-items": "center",
    height: "80px",
    "background-color": "#e6e7e8",
  },
  chatControllersPosition: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "100%"
  },
  imageInput: {
    float: "left",
    display: "flex",
    justifyContent: "center",
    marginLeft: "33px",
    height: "40px",
    width: "40px",
    borderRadius: "20px",
    backgroundColor: "#1771f1",
    color: "inherit",
    border: "none",
    padding: 0,
    // font: "inherit",
    outline: "inherit",
  },
  imageInputIcon: {
    margin: "auto",
    color: "white",
  },
  messageInputContainer: {
    display: "flex",
    alignItems: "center",
    paddingLeft: "23px",
    paddingRight: "23px",
    marginLeft: "20px",
    marginRight: "20px",
    height: "53px",
    backgroundColor: "white",
    borderRadius: "20px",
    flexGrow: "1",
  },
  messageText: {
    color: "black",
    backgroundColor: "white",
    cursor: "text",
    width: "100%",
    border: "none",
    padding: 0,
    // font: "inherit",
    outline: "inherit",
  },
  sendMessageContainer: {
    float: "left",
    display: "flex",
    justifyContent: "center",
    marginRight: "33px",
    height: "40px",
    width: "40px",
    borderRadius: "20px",
    backgroundColor: "#1771f1",
  },
  sendMessageButton: {
    color: "white",
    background: "none",
    border: "none",
    padding: 0,
    // font: "inherit",
    outline: "inherit",
  },
})

export let messagesStyles = makeStyles({
  messages: (props) => {
    const yourOrMineStyles = props.yours
      ? {
          alignItems: "flex-start",
        }
      : {
          alignItems: "flex-end",
        }

    return {
      marginTop: "30px",
      display: "flex",
      flexDirection: "column",
      ...yourOrMineStyles,
    }
  },
})

export let messageStyles = makeStyles({
  message: (props) => {
    const yoursOrMineStyles = props.yours
      ? {

          alignItems: "flex-start",
          marginRight: "25%",
          backgroundColor: "#e6e7e8",
          position: "relative",
        }
      : {

          alignItems: "flex-end",
          color: "black",
          marginLeft: "25%",
          background: "rgba(23, 113, 241, 0.5)",
          position: "relative",
          // color: "white"
        }
    return {
      borderRadius: "20px",
      padding: "8px 15px",
      marginTop: "5px",
      marginBottom: "5px",
      display: "inline-block",
      ...yoursOrMineStyles,
    }
  },
})
