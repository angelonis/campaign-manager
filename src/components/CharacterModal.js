import React, { useState } from "react";
import { db } from "../firebase/firebase"; 
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "../auth/useAuth"; 

import "../styles/CharacterModal.css";

function CharacterModal({ onClose, onCreate }) {
    const [name, setName] = useState("");
    const [locations, setLocations] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [affiliations, setAffiliations] = useState("");
    const { user } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();

        const characterData = {
            name,
            locations,
            description,
            affiliations,
            image: image ? URL.createObjectURL(image) : null,
            createdAt: new Date().toISOString(),
            createBy: user?.uid || null
        };

        try {
            const docRef = addDoc(collection(db, "characters"), characterData);
            console.log("Character created with ID: ", docRef.id);
            onCreate(characterData); // You could also pass back the doc ID if needed
            onClose(); // Close the modal after creation
        } catch (error) {
            console.error("Error adding character:", error);
        }

        //onCreate(characterData);
        //onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="character-modal">
                <h2>Create Character</h2>
                <form onSubmit={handleSubmit} className="character-form">
                    <label>
                        Name
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        Location
                        <input
                            type="text"
                            value={locations}
                            onChange={(e) => setLocations(e.target.value)}
                        />
                    </label>

                    <label>
                        Description
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="3"
                        />
                    </label>

                    <label>
                        Affiliations
                        <input
                            type="text"
                            value={affiliations}
                            onChange={(e) => setAffiliations(e.target.value)}
                        />
                    </label>

                    <label>
                        Image
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </label>

                    <div className="modal-actions">
                        <button type="submit" className="btn-primary">
                            Create
                        </button>
                        <button type="button" className="btn-secondary" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CharacterModal;
