import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuth } from "../auth/useAuth";

export const useUserModel = () => {
    const { user } = useAuth();
    const [userModel, setUserModel] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            setUserModel(null);
            setLoading(false);
            return;
        }

        const fetchUserModel = async () => {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setUserModel(docSnap.data());
            }
            setLoading(false);
        };

        fetchUserModel();
    }, [user]);

    return { userModel, loading };
};
