import { async } from "@firebase/util";
import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";


//fetching all docs from firebase database
export const getAllFeeds = async (firebaseDb) => {
    const feeds = await getDocs(query(collection(firebaseDb, 'videos'), orderBy('id', 'desc')));
    return feeds.docs.map((doc) => doc.data());
}

//fetching a user information by userId

export const getUserInfo = async (firebaseDb, userId) => {
    const userRef = doc(firebaseDb, 'users', userId);

    const userSnap = await getDoc(userRef);
    if (userSnap.exists) {
        return userSnap.data();
    } else {
        return 'No such Document';
    }
}