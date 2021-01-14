import { firestore, firebase } from "../firebaseConfig"

const { Timestamp } = firebase.firestore

class MessagesServise {
  async sendMessage(myId, chatId, text) {
    const data = {
      senderId: myId,
      text: text,
      date: Timestamp.fromDate(new Date()),
    }

    await firestore
      .collection(`chats`)
      .doc(chatId)
      .collection("messages")
      .add(data)
  }

  messagesListener(chatId, limit = 2, messagesCallback = () => {}) {
    firestore
      .collection("chats")
      .doc(chatId)
      .collection("messages")
      .orderBy("date", "desc")
      .limit(limit)
      .onSnapshot(
        (docSnapshot) => {
          let messages = []
          docSnapshot.forEach((doc) => {
            messages.push(doc.data())
          })
          messagesCallback(messages)
        },
        (err) => {
          console.log(`Encountered error: ${err}`)
        }
      )
  }
}

export let messagesService = new MessagesServise()
