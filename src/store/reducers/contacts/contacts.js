import * as actionTypes from '../../actions/contacts/actionTypes'
import {updateObject} from "../utility";

const initialState = {
    user: "",
    contacts: [],
    loading: false,
    refresh: true
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_CONTACTS_SUCCESS:
            return updateObject(state, {
                user: action.contacts[0].user,
                loading: false,
                contacts: action.contacts[0].contacts,
                refresh: true
            })
        case actionTypes.FETCH_CONTACTS_FAIL:
            return updateObject(state, {loading: false})
        case actionTypes.FETCH_CONTACTS_START:
            return updateObject(state, {loading: true})
        case actionTypes.ADD_CONTACT_SUCCESS:
            return updateObject(state, {contacts: state.contacts.concat(action.contact)})
        case actionTypes.REFRESH_DISABLED:
            return updateObject((state, {refresh: false}))
        case actionTypes.REFRESH_ENABLED:
            return updateObject((state, {refresh: true}))
        default:
            return state
    }
};

export default reducer
