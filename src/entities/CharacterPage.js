import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import "../styles/CharacterPage.css";
import { AiOutlinePlus } from "react-icons/ai";
import { useAuth } from "../auth/useAuth";
import CharacterModal from "../components/CharacterModal";
import CharacterCard from "../components/CharacterCard";



function CharacterPage() {
    const { user } = useAuth();
    const [characters, setCharacters] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingCharacter, setEditingCharacter] = useState(null);


    const handleCreate = (newCharacter) => {
        setCharacters(prev => [...prev, newCharacter]); // append to grid
        setShowModal(false);
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
                    {/* Always render create button first */}
                    <div className="character-card create-card" onClick={() => setShowModal(true)}>
                        <div className="create-card-content">
                            <AiOutlinePlus size={24} />
                            <span>Create Character</span>
                        </div>
                    </div>

                    {characters.map((char, index) => (
                        <CharacterCard
                            key={index}
                            character={char}
                            onEdit={(char) => {
                                setEditingCharacter(char);
                                setShowModal(true);
                                // You may want to store `editingCharacter` too
                            }}
                            onDelete={(char) => console.log("TODO: delete character", char)}
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
                        setCharacters(prev =>
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

        </>
    );
}

export default CharacterPage;
