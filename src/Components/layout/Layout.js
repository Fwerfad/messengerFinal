import React, { useReducer } from "react"
import { AppBar, Toolbar } from "@material-ui/core"

import Header from "../header/headerContainer"
import SidePanel from "../sidePanel/sidePanel"
import Modal from "../modal/modalContainer"

import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import ChatIcon from "@material-ui/icons/Chat"
import Container from "@material-ui/core/Container"
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import useStyles from "./layoutStyles"
import ContactsList from "../сontactList/contacts"
import {firebase} from "../../firebaseConfig";


export const Layout = (props) => {
  const [isOpen, toggleModal] = useReducer((state) => !state, false)
  const classes = useStyles();
  const logOff = () => {
      firebase.auth().signOut()
  };
  const createNewChat = (userID) => {
    //TODO
  }

  const editProfile = () => {
    //TODO
  }

  const addContact = () => {
    //TODO
  }

    return (
            <div className={classes.root}>
                <AppBar
                    position="fixed"
                    className={classes.appBar}
                >
                    <Toolbar className={classes.toolBar}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Header/>
                        <div>
                            <IconButton
                                onClick={toggleModal}
                                color="inherit"
                            >
                                <ChatIcon color="action"/>
                            </IconButton>
                            <IconButton
                                onClick={logOff}
                                color="inherit"
                            >
                                <ExitToAppIcon color="action"/>
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                <SidePanel/>
                <main className={classes.content}>
                    <div className={classes.contentContainer}>
                        <div className={classes.toolbar} />
                        {props.children}
                    </div>
                    <Modal isOpen={isOpen} close={toggleModal}>
                        <ContactsList users={[{name: "john"}, {name: "john"}, {name: "john"}, {name: "john"},{name: "john"},{name: "john"},{name: "john"},{name: "john"},{name: "john"},{name: "john"},{name: "john"},{name: "john"},{name: "john"},]}/>
                    </Modal>
                </main>
            </div>
    );
}
