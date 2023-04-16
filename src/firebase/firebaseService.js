import { db, storage } from './configFirebase';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { doc, getDoc } from 'firebase/firestore';

export const FirebaseService = {
    uploadImg: async (imgs = [], locate) => {
        try {
            const imgsUrl = [];
            if (imgs.length > 0) {
                for (let item of imgs) {
                    const name = item.name + Date.now();
                    const storageRef = ref(storage, `/${locate}/${name}`);
                    const uploadTask = uploadBytesResumable(storageRef, item);
                    const url = await getDownloadURL((await uploadTask).ref);
                    imgsUrl.push(url);
                }
            }
            return imgsUrl;
        } catch (err) {
            console.log(err);
        }
    },
    getImgs: async (collection, document) => {
        const docRef = doc(db, collection, document);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            let dt = docSnap.data();
            return dt;
        } else {
            console.log('No such document!');
        }
    },
    deleteImg: async (img, collection, document) => {
        try {
            const deleteRef = ref(storage, img);
            await deleteObject(deleteRef);

            return { success: 'Success' };
        } catch (err) {
            console.log(err);
        }
    },
};
