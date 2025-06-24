import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { AiOutlinePlus } from "react-icons/ai";
import { useAuth } from "../auth/useAuth";

import CharacterModal from "../components/CharacterModal";
import CharacterCard from "../components/CharacterCard";
import ConfirmModal from "../components/ConfirmModal";

import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { fetchCharactersByUser } from "../firebase/firebaseHelpers";

import "../styles/CharacterPage.css";

function CharacterPage() {
    const { user } = useAuth();
    const [characters, setCharacters] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingCharacter, setEditingCharacter] = useState(null);
    const [characterToDelete, setCharacterToDelete] = useState(null);

    // Load characters on mount or when user changes
    useEffect(() => {
        if (!user) return;

        const loadCharacters = async () => {
            const results = await fetchCharactersByUser(user.uid);
            setCharacters(results);
        };

        loadCharacters();
    }, [user]);

    const handleCreate = (newCharacter) => {
        setCharacters((prev) => [...prev, newCharacter]);
        setShowModal(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteDoc(doc(db, "characters", characterToDelete.id));
            setCharacters((prev) =>
                prev.filter((char) => char.id !== characterToDelete.id)
            );
            setCharacterToDelete(null);
        } catch (error) {
            alert.apply("Failed to delete character. Please try again.");
            console.error("Error deleting character:", error);
        }
    };

    return (
        <>
            <Helmet>
                <title>Characters | Campaign Manager</title>
                <meta name="description" content="Manage and create characters in your world." />
            </Helmet>

            <div className="character-page">
                <div className="character-header">
                    <h2>Characters</h2>
                    <p>Track your world's heroes, villains, and everyone in between.</p>
                </div>

                <div className="tile-grid-container">
                    <div className="character-grid">
                    <div className="character-card create-card" onClick={() => setShowModal(true)}>
                        <div className="create-card-content">
                            <AiOutlinePlus size={24} />
                            <span>Create Character</span>
                        </div>
                    </div>

                    {characters.map((char, index) => (
                        <CharacterCard
                            key={char.id || index}
                            character={char}
                            onEdit={() => {
                                setEditingCharacter(char);
                                setShowModal(true);
                            }}
                            onDelete={() => setCharacterToDelete(char)}
                        />
                    ))}
                    </div>
                </div>
            </div>

            {showModal && (
                <CharacterModal
                    onClose={() => {
                        setShowModal(false);
                        setEditingCharacter(null);
                    }}
                    onCreate={handleCreate}
                    onUpdate={(updatedChar) => {
                        setCharacters((prev) =>
                            prev.map((char) =>
                                char.id === updatedChar.id ? updatedChar : char
                            )
                        );
                        setEditingCharacter(null);
                        setShowModal(false);
                    }}
                    character={editingCharacter}
                />
            )}

            <ConfirmModal
                isOpen={!!characterToDelete}
                title="Delete Character"
                message={`Are you sure you want to delete '${characterToDelete?.name}'?`}
                onConfirm={handleConfirmDelete}
                onCancel={() => setCharacterToDelete(null)}
            />
        </>
    );
}

export default CharacterPage;
