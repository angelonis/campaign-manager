import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { useAuth } from "../auth/useAuth";

import "../styles/CharacterModal.css";

function CharacterModal({ onClose, onCreate, onUpdate, character }) {
    const isEdit = !!character;
    const { user } = useAuth();

    const [name, setName] = useState("");
    const [locations, setLocations] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null); // New image file
    const [imagePreview, setImagePreview] = useState(""); // Preview URL
    const [affiliations, setAffiliations] = useState("");

    useEffect(() => {
        if (isEdit && character) {
            setName(character.name || "");
            setLocations(character.locations || "");
            setDescription(character.description || "");
            setAffiliations(character.affiliations || "");
            setImagePreview(character.image || "");
        }
    }, [character, isEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const imageUrl = image ? URL.createObjectURL(image) : imagePreview || null;

        const characterData = {
            name,
            locations,
            description,
            affiliations,
            image: imageUrl,
            createBy: user?.uid || null,
            createdAt: isEdit ? character.createdAt : new Date().toISOString()
        };

        try {
            if (isEdit) {
                const docRef = doc(db, "characters", character.id);
                await updateDoc(docRef, characterData);
                onUpdate?.({ ...character, ...characterData });
            } else {
                const docRef = await addDoc(collection(db, "characters"), characterData);
                onCreate?.({ ...characterData, id: docRef.id });
            }
            onClose();
        } catch (error) {
            console.error("Error saving character:", error);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    return (
        <div className="modal-overlay">
            <div className="character-modal">
                <h2>{isEdit ? "Edit Character" : "Create Character"}</h2>
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
                            onChange={handleImageChange}
                        />
                    </label>

                    {imagePreview && (
                        <div style={{ marginTop: "0.5rem" }}>
                            <img
                                src={imagePreview}
                                alt="Preview"
                                style={{ maxWidth: "100px", borderRadius: "8px" }}
                            />
                        </div>
                    )}

                    <div className="modal-actions">
                        <button type="submit" className="btn-primary">
                            {isEdit ? "Update" : "Create"}
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
