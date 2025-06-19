import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query } from "firebase/firestore";

function HomePage() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const q = query(collection(db, "administrators")); // 1-liner query
                const snapshot = await getDocs(q);       // one call
                setItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            } catch (err) {
                console.error("Firestore fetch error:", err);
            }
        };

        fetchItems();
    }, []);

    return (
        <div>
            <h1>Welcome to the Campaign Manager</h1>
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        {JSON.stringify(item)}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default HomePage;