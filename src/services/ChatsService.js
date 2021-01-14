import { firestore } from "../firebaseConfig"
import { messagesService } from "./MessagesService"

class ChatsService {
  async getChat(chatId) {
    const docRef = await firestore.collection(`chats`).doc(chatId).get()
    return docRef.data()
  }

  async chatsListener(myId, limit = 3, chatsCallback = () => {
  }) {
    console.log(myId)
    let chats = []
    const querySnapshot = await firestore
        .collection("chats")
        .where("users", "array-contains", `${myId}`)
        .limit(limit)
        .get()

    querySnapshot.forEach((doc) => {
      let data = {
        ...doc.data(),
        id: doc.id,
      }
      chats.push(data)
    })
    return chatsCallback(chats)
  }

  async checkPersonalChats(myId, userId) {
    const  querySnapshot = await firestore.collection("users").where("uid", "==", myId).where("personal_chats", "==", userId).get()
    const userData = []
    querySnapshot.forEach((doc) => {
      userData.push(doc.data().uid)
    })
    if (userData.length === 0)
      return null
    return userData[0]
  }

  async updatePersonalChats(userId1, userId2, chatId) {
    let personalChats = {}
    personalChats[`personal_chats.${userId1}`] = chatId
    const  querySnapshot = await firestore.collection(`users`).where("uid", "==", userId2).get()
    querySnapshot.forEach( (doc) => {
      firestore.collection(`users`).doc(doc.id).update(personalChats)
    })
  }

  async createPersonalChatWithMessage(myId, otherUserId, text, myNickName, otherNickName) {
    if (await this.checkPersonalChats(myId, otherUserId) == null) {
      const docRef = await firestore.collection("chats").add({
        users: [myId, otherUserId, myNickName, otherNickName],
      })
      const chatId = docRef.id
      await this.updatePersonalChats(myId, otherUserId, chatId)
      await this.updatePersonalChats(otherUserId, myId, chatId)
      await messagesService.sendMessage(myId, chatId, text)
    }
  }
}

export let chatsService = new ChatsService()
