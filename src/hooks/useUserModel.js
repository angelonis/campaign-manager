import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuth } from "../auth/useAuth";

export const useUserModel = () => {
    const { user } = useAuth();
    const [userModel, setUserModel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 

    useEffect(() => {
        if (!user) {
            setUserModel(null);
            setLoading(false);
            return;
        }

        const fetchUserModel = async () => {
            try {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();

                    // Optional: validate essential fields
                    if (!data.role || !data.displayName) {
                        console.warn("User model is missing expected fields.");
                    }

                    setUserModel(data);
                } else {
                    console.warn("No user document found for UID:", user.uid);
                    setUserModel(null);
                }
            } catch (err) {
                console.error("Error fetching user model:", err);
                setError(err);
                setUserModel(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUserModel();
    }, [user]);

    return { userModel, loading, error };
};
