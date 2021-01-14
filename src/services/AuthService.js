import { firestore, firebase } from "../firebaseConfig"

const { Timestamp } = firebase.firestore

class AuthService {
    async login(user) {
        const querySnapshot = await firestore.collection("users").where("uid", "==", user.uid)
            .get()
        let uid = []
        querySnapshot.forEach((doc) => {
            uid.push(doc.data().uid)
        })
        if (uid.length > 0)
            return uid[0]
        return null
    }
    async register(user) {
        const data = {
            nickname: user.displayName,
            email: user.email,
            uid: user.uid
        }
        await firestore
            .collection('users')
            .add(data)
    }
}

export let authService = new AuthService()
