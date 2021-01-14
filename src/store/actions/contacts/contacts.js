import * as actionTypes from './actionTypes'
import axios from 'axios'
import {contactsService} from "../../../services/ContactsService"

export const fetchSuccess = (contacts) => {
    return {
        type: actionTypes.FETCH_CONTACTS_SUCCESS,
        contacts: contacts
    }
};

export const refreshEnabled = () => {
    return {
        type: actionTypes.REFRESH_ENABLED,
    }
}

export const refreshDisabled = () => {
    return {
        type: actionTypes.REFRESH_DISABLED,
    }
}

export const fetchFailed = (error) => {
    return {
        type: actionTypes.FETCH_CONTACTS_FAIL,
        error: error
    }
};

export const fetchStart = () => {
    return {
        type: actionTypes.FETCH_CONTACTS_START
    }
};

export const fetchContacts = (userID, limit) => {
    console.log("here be dragons")
    return (dispatch) => {
       contactsService.contactsListener(userID, limit, (contacts) => {
           dispatch(fetchSuccess(contacts))
       })
    }
};
export const fetchContact = (userID, user) => {
    return (dispatch) => {
        console.log(userID, user)
        contactsService.badContactListener(userID, user, (contacts) => {
            dispatch(fetchSuccess(contacts))
        })
    }
}

export const addContactSuccess = (contactID) => {
    return {
        type: actionTypes.ADD_CONTACT_SUCCESS,
        contact: contactID
    }
};

export const addContactFailed = (error) => {
    return {
        type: actionTypes.ADD_CONTACT_FAIL,
        error: error
    }
};

export const addContact = (userID, token) => {
    return dispatch => {
        const query = `'https://###.firebaseio.com/?auth=${token}&orderBy="userId"&equalTo="${userID}"`
        axios.post('/contacts.json' + token, {data: "some data IDK"})
            .then((response) => {
                dispatch(addContactSuccess(response.data.name, userID))
            })
            .catch((err) => {
                addContactFailed(err);
            });
    }
};

// TODO: update function and add contact function
