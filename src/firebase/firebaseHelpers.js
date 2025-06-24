import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebase";

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