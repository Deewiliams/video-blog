import { collection,getDocs, orderBy, query } from "firebase/firestore";

export const getAllFeeds  = async (firebaseDb) => {
    const feeds =  await getDocs(query(collection(firebaseDb, 'videos'), orderBy('id', 'desc')));
     return feeds.docs.map((doc) => doc.data());
}