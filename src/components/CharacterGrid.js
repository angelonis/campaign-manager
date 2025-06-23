import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/useAuth";
import { getCharactersByUser, addCharacter } from "../firebase/characterService";
import { FaPlus } from "react-icons/fa";
import CharacterFormModal from "./CharacterFormModal";
import defaultAvatar from "../assets/default-character.png";
import "../styles/CharacterGrid.css";

function CharacterGrid() {
    const { user } = useAuth();
    const [characters, setCharacters] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchCharacters = async () => {
            if (user) {
                const chars = await getCharactersByUser(user.uid);
                setCharacters(chars);
            }
        };
        fetchCharacters();
    }, [user]);

    const handleCreateCharacter = async (characterData) => {
        if (!user) return;
        const docRef = await addCharacter(user.uid, characterData);
        const newCharacter = { id: docRef.id, ...characterData };
        setCharacters((prev) => [...prev, newCharacter]);
        setShowModal(false);
    };

    return (
        <div className="character-grid">
            {characters.map((char) => (
                <div key={char.id} className="character-tile">
                    <img src={char.imageUrl || defaultAvatar} alt={char.name} />
                    <span>{char.name}</span>
                </div>
            ))}

            <div className="character-tile create-tile" onClick={() => setShowModal(true)}>
                <FaPlus size={24} />
                <span>Create Character</span>
            </div>

            {showModal && (
                <CharacterFormModal
                    onClose={() => setShowModal(false)}
                    onSave={handleCreateCharacter}
                />
            )}
        </div>
    );
}

export default CharacterGrid;
