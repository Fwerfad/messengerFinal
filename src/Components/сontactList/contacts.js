import React, {Fragment, useEffect, useReducer} from "react";
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



export const ContactsList = (props) => {
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

    useEffect(() => {
        if (props.contacts.length === 0 && props.refresh === true) {
            props.fetchContacts(myId, 10)
        }
    })

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

    console.log("PROPS", props)
    const listItems = props.contacts.map((user) =>
        <Fragment key={user.name}>
            <ListItem className={classes.listItem}
                      alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar src={user.avatar} alt={'avatar'}/>
                </ListItemAvatar>
                <ListItemText onMouseDown={() => {moveToChat(user, history)}}
                              className={classes.listItemText}
                              primary={
                                  <Typography className={classes.contactNameText}>
                                      {user.name}
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
    return (
        <List className={classes.container}>
            {listItems}
        </List>
    )
}


const mapDispatchToProps = (dispatch) => {
    return {
        fetchContacts: (user, limit) =>
            dispatch(contactsActions.fetchContacts(user, limit)),
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

