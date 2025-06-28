import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebase";
import { v4 as uuidv4 } from "uuid"; 

import { useAuth } from "../auth/useAuth";
import { getDefaultImageUrl } from "../firebase/firebaseHelpers"; 

import "../styles/CharacterModal.css";

function CharacterModal({ onClose, onCreate, onUpdate, character }) {
    const isEdit = !!character;
    const { user } = useAuth();

    const [name, setName] = useState("");
    const [locations, setLocations] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null); // New image file
    const [defaultCharacterImageUrl, setDefaultCharacterImageUrl] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [affiliations, setAffiliations] = useState("");

    useEffect(() => {
        const fetchDefaultImage = async () => {
            const url = await getDefaultImageUrl("characters/default-character.png");
            if (url) {
                setDefaultCharacterImageUrl(url);
                console.log("Default character image URL fetched:", url);
            } else {
                // Fallback or error handling if default image cannot be fetched
                console.warn("Could not fetch default character image from Firebase Storage.");                
            }
        };
        fetchDefaultImage();
    }, []);

    useEffect(() => {
        if (isEdit && character) {
            setName(character.name || "");
            setLocations(character.locations || "");
            setDescription(character.description || "");
            setAffiliations(character.affiliations || "");
            setImagePreview(character.image || "");
        }
        else {
            setImagePreview(defaultCharacterImageUrl || ""); // Set to default image if not editing
        }
    }, [character, isEdit, defaultCharacterImageUrl]);    

    const handleSubmit = async (e) => {
        e.preventDefault();

        let imageUrl = imagePreview;

        try {
            if (image) {
                const imageRef = ref(storage, `characters/${user.uid}/${uuidv4()}`);
                const snapshot = await uploadBytes(imageRef, image);
                imageUrl = await getDownloadURL(snapshot.ref);
            }

            const characterData = {
                name,
                locations,
                description,
                affiliations,
                image: imageUrl,
                createBy: user?.uid || null,
                createdAt: isEdit ? character.createdAt : new Date().toISOString()
            };

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
        //<div className="modal-overlay">
        //    <div className="character-modal">
        //        <h2>{isEdit ? "Edit Character" : "Create Character"}</h2>
        //        <form onSubmit={handleSubmit} className="character-form">
        //            <label>
        //                Name
        //                <input
        //                    type="text"
        //                    value={name}
        //                    onChange={(e) => setName(e.target.value)}
        //                    required
        //                />
        //            </label>

        //            <label>
        //                Location
        //                <input
        //                    type="text"
        //                    value={locations}
        //                    onChange={(e) => setLocations(e.target.value)}
        //                />
        //            </label>

        //            <label>
        //                Description
        //                <textarea
        //                    value={description}
        //                    onChange={(e) => setDescription(e.target.value)}
        //                    rows="3"
        //                />
        //            </label>

        //            <label>
        //                Affiliations
        //                <input
        //                    type="text"
        //                    value={affiliations}
        //                    onChange={(e) => setAffiliations(e.target.value)}
        //                />
        //            </label>

        //            {imagePreview && (
        //                <div style={{ marginTop: "0.5rem" }}>
        //                    <img
        //                        src={imagePreview}
        //                        alt="Preview"
        //                        style={{ maxWidth: "100px", borderRadius: "8px" }}
        //                    />
        //                </div>
        //            )}

        //            <label>
        //                Image
        //                <input
        //                    type="file"
        //                    accept="image/*"
        //                    onChange={handleImageChange}
        //                />
        //            </label>



        //            <div className="modal-actions">
        //                <button type="submit" className="btn-primary">
        //                    {isEdit ? "Update" : "Create"}
        //                </button>
        //                <button type="button" className="btn-secondary" onClick={onClose}>
        //                    Cancel
        //                </button>
        //            </div>
        //        </form>
        //    </div>
        //</div>

        <div className="modal-overlay">
            <div className="character-modal">
                <h2>{isEdit ? "Edit Character" : "Create Character"}</h2>
                <form onSubmit={handleSubmit} className="character-form">
                    

                    <div className="form-columns">
                        <div className="column-left">
                            {imagePreview && (
                                <div style={{ marginTop: "0.5rem" }}>
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        style={{ maxWidth: "100px", borderRadius: "8px" }}
                                    />
                                </div>
                            )}

                            <label>
                                Image
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </label>

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
                                Affiliations
                                <input
                                    type="text"
                                    value={affiliations}
                                    onChange={(e) => setAffiliations(e.target.value)}
                                />
                            </label>
                        </div>

                        <div className="column-right">
                            <label>
                                Description
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows="10" // Increased rows for better appearance in a separate column
                                />
                            </label>
                        </div>
                    </div>

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
