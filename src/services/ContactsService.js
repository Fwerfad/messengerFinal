import { firestore } from "../firebaseConfig"

class ContactsService {
    async fetchContacts(userId) {
        const docRef = await firestore.collection(`contacts`).where("user", "==", userId).get()
        return docRef.data()
    }

    //TODO: add regex
    async searchContacts(user) {
        console.log("USER", user)
        const docRef = await firestore.collection(`contacts`).doc(user).get()
        console.log("DATA", docRef.data())
        return docRef.data()
    }
    async badContactListener(myId, user, contactsCallback = () => {}) {
        console.log(myId)
        return firestore
            .collection("contacts")
            .where("user", "==", `${myId}`)
            .onSnapshot((docSnapshot) => {
                let contacts = [];
                docSnapshot.forEach((doc) => {
                    let data = {
                        ...doc.data()
                    }
                    console.log(data)
                    let flag = false;
                    for (let contact of data.contacts) {
                        if (contact.nickname.includes(user)) {
                            data.contacts = [contact];
                            flag = true;
                            break;
                        }
                    }
                    if (!flag) {
                        data.contacts = []
                    }
                    contacts.push(data)
                })
                console.log("END", contacts)
                contactsCallback(contacts)
            })
    }

    async contactsListener(myId, limit = 10, contactsCallback = () => {}) {
        console.log(myId)
        return firestore
            .collection("contacts")
            .where("user", "==", `${myId}`)
            .onSnapshot((docSnapshot) => {
                let contacts = []
                docSnapshot.forEach((doc) => {
                    let data = {
                        ...doc.data()
                    }
                    console.log("DATA", data)
                    contacts.push(data)
                })
                console.log(contacts)
                contactsCallback(contacts)
            })
    }

    async initContacts(myId) {
        const data = {
            contacts: [],
            user: myId
        }
        await firestore.collection("contacts").add(data)
    }

}
export let contactsService = new ContactsService()
