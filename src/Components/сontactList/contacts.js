import React, {Fragment, useEffect, useReducer, useState} from "react";
import {
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Typography, ListItemIcon, Tooltip
} from "@material-ui/core";
import {useStyles} from "./contactsStyles"
import {connect} from "react-redux";
import * as contactsActions from "../../store/actions/contacts/contacts"
import {useHistory} from "react-router";
import { chatsService } from "../../services/ChatsService"
import {fetchMessages} from "../../store/actions/chats/chats";
import { store } from "../../index"
import { firebase, uiConfig } from "./../../firebaseConfig"
import {userService} from "../../services/UserService";
import {refreshEnabled} from "../../store/actions/contacts/contacts";



const ContactsList = (props) => {
    const myId = firebase.auth().currentUser.providerData[0].uid
    let history = useHistory();
    console.log(store.getState().contactsReducer.refresh)
    const classes = useStyles()
    const moveToChat = (user, history) => {
        chatsService.checkPersonalChats(myId, user.name).then(value => {
            let respond = fetchMessages(value, 10)
            console.log("CONTACTS", respond)
            store.dispatch(respond)})
        history.push("/Chat")
    }
    console.log(props)
    if (props.refresh === true && props.contacts.length === 0) {
        props.fetchContacts(myId, 10)
        disableRefresh();
    }
    // useEffect(() => {
    //     if (props.refresh === true) {
    //         props.fetchContacts(myId, 10)
    //         console.log("loaded contacts")
    //     }
    // })

    function enableRefresh() {
        console.log("Back in to the game!")
        console.log(props)
        props.refreshEnabled()
        console.log(props)
    }

    function disableRefresh() {
        console.log("Back in to the pit!")
        console.log(props)
        props.refreshDisabled()
        console.log(props)
    }


    let listItems = ""
    if (props.contacts !== undefined) {
        console.log(props.contacts)
        listItems = props.contacts.map((user) =>
            <Fragment key={user.nickname}>
                <ListItem className={classes.listItem}
                          alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar src={user.avatar} alt={'avatar'}/>
                    </ListItemAvatar>
                    <ListItemText onMouseDown={() => {moveToChat(user, history)}}
                                  className={classes.listItemText}
                                  primary={
                                      <Typography className={classes.contactNameText}>
                                          {user.nickname}
                                      </Typography>
                                  }
                                  secondary={
                                      <Typography className={classes.contactDescriptionText}>
                                          {user.description}
                                      </Typography>
                                  }>
                    </ListItemText>
                    <ListItemText className={classes.contactLastMessageText}>
                        <React.Fragment>
                            <Typography className={classes.contactLastMessageHeader}
                                        display="inline">
                                Last message
                            </Typography>
                            <Typography className={classes.contactLastMessageContent}
                                        display="block">
                                {user.lastMessage}
                            </Typography>
                        </React.Fragment>
                    </ListItemText>
                </ListItem>
            </Fragment>
        );

    }
    console.log(listItems)
    return (
        <List className={classes.container}>
            {listItems}
        </List>
    )
}


const mapDispatchToProps = (dispatch) => {
    return {
        fetchContacts: (userId, limit) =>
            dispatch(contactsActions.fetchContacts(userId, limit)),
        refreshEnabled: () =>
            dispatch(contactsActions.refreshEnabled()),
        refreshDisabled: () =>
            dispatch(contactsActions.refreshDisabled()),
    }
}

const mapStateToProps = (state) => {
    return {
        ContactsID: state.contactsReducer.user,
        contacts: state.contactsReducer.contacts,
        refresh: state.contactsReducer.refresh
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactsList)

