import React, {Fragment, useReducer, useEffect, useState} from "react"
import { connect } from "react-redux"
import * as chatsActions from "../../store/actions/chats/chats"
import {
  Drawer,
  List,
  Tooltip,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import PersonIcon from "@material-ui/icons/Person"
import useStyles from "./sidePanelStyles"
import AddIcon from '@material-ui/icons/Add';
import {firebase, firestore} from "../../firebaseConfig";
import Modal from "@material-ui/core/Modal";
import {userService} from "../../services/UserService";
import {chatsService} from "../../services/ChatsService";


export const SidePanel = (props) => {
  const classes = useStyles()
  const [isOpen, toggleDrawer] = useReducer((state) => !state, false)
  const [open, handleOpen] = useState(false)
  const [nickname, changeNickname] = useState("")
  const [message, changeMessage] = useState("")
  const [refresh, setRefresh] = useState(true);
  const setChat = ((chatId) => {
  props.fetchMessages(chatId, 10)
  })

  if (props.chats.length === 0 && refresh) {
    setRefresh(false)
    props.fetchCharts(firebase.auth().currentUser.providerData[0].uid, 10)
    console.log(props.chats)
  }

  function addChat() {
    handleOpen(!open);
  }

  function startChat() {
    handleOpen(!open);
    Promise.resolve(userService.findUser(nickname)).then((e) => {
      chatsService.createPersonalChatWithMessage(
          firebase.auth().currentUser.providerData[0].uid, e, message, firebase.auth().currentUser.displayName, nickname)
    })
    setRefresh(true)
  }

  return (
    <Fragment>
      <Drawer
        variant="permanent"
        className={classes.drawer}
        classes={{
          paper: isOpen ? classes.drawerOpen : classes.drawerClose,
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={addChat}>
            {isOpen ? <AddIcon /> : null}
          </IconButton>
          <Modal
              open={open}
              onClose={startChat}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
          >
            <div className={classes.bestModal}>
              <input className={classes.nickname} placeholder="Никнейм(Полный)" onChange={(e) => changeNickname(e.target.value)}/>
              <input className={classes.firstMessage} placeholder="Ваше приветственное сообщение" onChange={(e) => changeMessage(e.target.value)}/>
            </div>
          </Modal>
          <IconButton onClick={toggleDrawer}>
            {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <div className={classes.hiddenScroll}>
          <List className={classes.scrollContainer}>
            <div style={{ minWidth: "57px" }}>
              {props.chats.map((chat) => (
                <ListItem
                  button
                  key={chat.id}
                  onClick={() => {
                    props.fetchMessages(chat.id, 20)
                  }}
                >
                  <ListItemIcon>
                    <PersonIcon fontSize="small" />
                  </ListItemIcon>
                  <Tooltip title={chat.users[0] !== firebase.auth().currentUser.providerData[0].uid ? chat.users[2]: chat.users[3]}>
                    <ListItemText
                      className={classes.message}
                      primary={chat.users[0] !== firebase.auth().currentUser.providerData[0].uid ? chat.users[2]: chat.users[3]}
                      secondary={chat.lastMessage}
                    />
                  </Tooltip>
                </ListItem>
              ))}
            </div>
          </List>
        </div>
      </Drawer>
    </Fragment>
  )
}

export const mapDispatchToProps = (dispatch) => {
  return {
    fetchCharts: (id, chatsNum) =>
        dispatch(chatsActions.fetchChats(id, chatsNum)),
    fetchMessages: (id, limit) =>
        dispatch(chatsActions.fetchMessages(id, limit))
  }
}
const mapStateToProps = (state) => {
  return {
    chats: state.chatsReducer.chats,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SidePanel)

// export default SidePanel
