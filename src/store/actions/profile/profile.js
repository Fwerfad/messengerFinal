import * as actionTypes from './actionTypes'
import axios from 'axios'

export const fetchSuccess = (contacts) => {
    return {
        type: actionTypes.FETCH_PROFILE_SUCCESS,
        contacts: contacts
    }
};

export const fetchFailed = (error) => {
    return {
        type: actionTypes.FETCH_PROFILE_FAIL,
        error: error
    }
};

export const fetchStart = () => {
    return {
        type: actionTypes.FETCH_PROFILE_START
    }
};

export const fetchProfile = (token, userID) => {
    return dispatch => {
        const query = `'https://###.firebaseio.com/?auth=${token}&orderBy="userId"&equalTo="${userID}"`
        axios.get("/profile.json" + query)
            .then((response) => {
                const profile = [];
                for (let key in response.data)
                    profile.push({
                        id: key,
                        ...response.data[key]
                    });
                dispatch(fetchSuccess(profile))
            })
            .catch((err) => {
                fetchFailed(err)
            })
    }
};

export const changeProfileSuccess = (contactID) => {
    return {
        type: actionTypes.CHANGE_PROFILE_SUCCESS,
        contact: contactID
    }
};

export const changeProfileFailed = (error) => {
    return {
        type: actionTypes.CHANGE_PROFILE_FAIL,
        error: error
    }
};

export const changeProfile = (contactID, token, profile) => {
    return dispatch => {
        const query = `'https://###.firebaseio.com/?auth=${token}&orderBy="userId"&equalTo="${userID}"`
        axios.post('/profile.json' + token, {data: "some data IDK"})
            .then((response) => {
                dispatch(changeProfileSuccess(profile))
            })
            .catch((err) => {
                changeProfileFailed(err);
            });
    }
};