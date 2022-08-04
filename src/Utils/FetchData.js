import { collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, where } from "firebase/firestore";


//fetching all docs from firebase database
export const getAllFeeds = async (firebaseDb) => {
    const feeds = await getDocs(query(collection(firebaseDb, 'videos'), orderBy('id', 'desc')));
    return feeds.docs.map((doc) => doc.data());
}

//Category feeds
export const categoryFeeds = async (firebaseDb, categoryId) => {
    const feeds = await getDocs(query(collection(firebaseDb, 'videos'),
    where("category", "==", categoryId),
    orderBy('id', 'desc')));
    return feeds.docs.map((doc) => doc.data());
}

//Getting recommended feeds
export const recommendedFeed = async (firebaseDb, categoryId, videoId) => {
    const feeds = await getDocs(query(collection(firebaseDb, 'videos'),
    where("category", "==", categoryId),
    where("id", "!=" , videoId),
    orderBy('id', 'desc')));
    return feeds.docs.map((doc) => doc.data());
}

//user uplaoded videos
export const userUploadedVideos = async (firebaseDb,userId) => {
    const feeds = await getDocs(query(collection(firebaseDb, 'videos'),
    where('userId', '==', userId ),orderBy('id', 'desc')));
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



//fetching a specific video details

export const getSpecificVideo = async (firebaseDb, videoId) => {
    const videoRef = doc(firebaseDb, 'videos', videoId);

    const videoSnap = await getDoc(videoRef);
    if (videoSnap.exists) {
        return videoSnap.data();
    } else {
        return 'No such Document';
    }
} 

export const deleteVideo = async (firebaseDb, videoId) => {
    await deleteDoc(doc(firebaseDb, 'videos', videoId))
}