import { firestore } from "../firebaseConfig"

class ContactsService {
    async fetchContacts(user) {
        const docRef = await firestore.collection(`contacts`).doc(user).get()
        return docRef.data()
    }

    //TODO: add regex
    async searchContacts(user) {
        console.log("USER", user)
        const docRef = await firestore.collection(`contacts`).doc(user).get()
        console.log("DATA", docRef.data())
        return docRef.data()
    }
    badContactListener(myId, user, contactsCallback = () => {}) {
        return firestore
            .collection("contacts")
            .where("user", "==", `${myId}`)
            .onSnapshot((docSnapshot) => {
                let contacts = [];
                docSnapshot.forEach((doc) => {
                    let data = {
                        ...doc.data()
                    }
                    let flag = false;
                    for (let contact of data.contacts) {
                        if (contact.name === user) {
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

    contactsListener(myId, limit = 10, contactsCallback = () => {}) {
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


}
export let contactsService = new ContactsService()
