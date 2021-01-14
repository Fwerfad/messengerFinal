import * as actionTypes from "./actionTypes"
import { chatsService } from "../../../services/ChatsService"
import { messagesService } from "../../../services/MessagesService"

export const fetchSuccess = (chats) => {
  return {
    type: actionTypes.FETCH_CHATS_SUCCESS,
    chats: chats,
  }
}

export const fetchFailed = (error) => {
  return {
    type: actionTypes.FETCH_CHATS_FAIL,
    error: error,
  }
}

export const fetchStart = () => {
  return {
    type: actionTypes.FETCH_CHATS_START,
  }
}

export const fetchChats = (id, chatsNum) => {
  fetchStart()
  return (dispatch) => {
    chatsService.chatsListener(id, chatsNum, (chats) => {
      dispatch(fetchSuccess(chats))
    })
  }
}

export const fetchMessagesStart = () => {
  return {
    type: actionTypes.FETCH_MESSAGES_START,
  }
}

export const fetchMessagesSuccess = (messages, chatID) => {
  console.log("messages", messages, chatID)
  return {
    type: actionTypes.FETCH_MESSAGES_SUCCESS,
    messages: messages,
    chatID: chatID,
  }
}

export const fetchMessages = (chatID, limit) => {
  console.log("it happens")
  return (dispatch) => {
    messagesService.messagesListener(chatID, limit, (messages) => {
      dispatch(fetchMessagesSuccess(messages, chatID))
    })
  }
}

// TODO: update function
