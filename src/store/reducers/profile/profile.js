import * as actionTypes from '../../actions/profile/actionTypes'
import {updateObject} from "../utility";

const initialState = {
    profile: [],
    loading: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PROFILE_SUCCESS:
            return updateObject(state, {loading: false, contacts: action.profile})
        case actionTypes.FETCH_PROFILE_FAIL:
            return updateObject(state, {loading: false})
        case actionTypes.FETCH_PROFILE_START:
            return updateObject(state, {loading: true})
        case actionTypes.CHANGE_PROFILE_SUCCESS:
            return updateObject(state, {profile: action.profile})
        default:
            return state
    }
};

export default reducer