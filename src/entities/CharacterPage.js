import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import "../styles/CharacterPage.css";
import { AiOutlinePlus } from "react-icons/ai";
import { useAuth } from "../auth/useAuth";
import CharacterModal from "../components/CharacterModal";

function CharacterPage() {
    const { user } = useAuth();
    const [characters, setCharacters] = useState([]);
    const [showModal, setShowModal] = useState(false);

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

                <div className="character-grid">
                    {/* Always render create button first */}
                    <div className="character-card create-card" onClick={() => setShowModal(true)}>
                        <div className="create-card-content">
                            <AiOutlinePlus size={24} />
                            <span>Create Character</span>
                        </div>
                    </div>

                    {/* Then render newly created characters */}
                    {characters.map((char, index) => (
                        <div className="character-card" key={index}>
                            <img className="character-image" src="https://via.placeholder.com/100" alt="Placeholder" />

                            
                            <div className="character-info">
                                <h4>{char.name}</h4>
                                <p>{char.location}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {showModal && (
                <CharacterModal
                    onClose={() => setShowModal(false)}
                    onCreate={handleCreate}
                />
            )}
        </>
    );
}

export default CharacterPage;
