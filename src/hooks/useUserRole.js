import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../auth/useAuth";
import { db } from "../firebase/firebase";

export const useUserRole = () => {
    const { user } = useAuth();
    const [role, setRole] = useState(null);

    useEffect(() => {
        const fetchRole = async () => {
            if (!user) {
                setRole(null);
                return;
            }

            try {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setRole(data.role || null);
                } else {
                    console.warn("User document not found in Firestore.");
                    setRole(null);
                }
            } catch (error) {
                console.error("Error fetching user role from Firestore:", error);
                setRole("viewer");
            }
        };

        fetchRole();
    }, [user]);

    return role;
};
