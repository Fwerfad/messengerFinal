import * as actionTypes from "../../actions/chats/actionTypes"
import { updateObject } from "../utility"

const initialState = {
  chats: [],
  loading: false,
  messages: [],
  chatID: "",
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CHATS_SUCCESS:
      return updateObject(state, {
        loading: false,
        chats: action.chats,
      })
    case actionTypes.FETCH_CHATS_FAIL:
      return updateObject(state, { loading: false })
    case actionTypes.FETCH_CHATS_START:
      return updateObject(state, { loading: true })
    case actionTypes.FETCH_MESSAGES_START:
      return updateObject(state, { loading: true })
    case actionTypes.FETCH_MESSAGES_SUCCESS:
      return updateObject(state, {
        loading: false,
        messages: action.messages,
        chatID: action.chatID,
      })
    default:
      return state
  }
}

export default reducer
