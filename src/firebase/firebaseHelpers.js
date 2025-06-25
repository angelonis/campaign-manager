import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebase";

import { ref, getDownloadURL } from "firebase/storage";
import { storage } from './firebase';

export const fetchCharactersByUser = async (userId) => {
    if (!userId) return [];

    try {
        const q = query(
            collection(db, "characters"),
            where("createBy", "==", userId)
        );
        const snapshot = await getDocs(q);

        return snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    } catch (error) {
        console.error("Error fetching characters:", error);
        return []; // return empty array on failure
    }
};

export async function getDefaultImageUrl(imageName = "characters/default-character.png") {
    try {
        const imageRef = ref(storage, imageName); // Reference to the image in the root of storage
        const url = await getDownloadURL(imageRef);
        console.log(`Successfully retrieved default image URL for ${imageName}:`, url);
        return url;
    } catch (error) {
        console.error(`Error retrieving default image URL for ${imageName}:`, error);
        // You might want to return a placeholder or handle this error more gracefully in your UI
        return null; // Return null if the image isn't found or an error occurs
    }
}