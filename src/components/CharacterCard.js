import React from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import "../styles/CharacterCard.css";

function CharacterCard({ character, onEdit, onDelete }) {
    return (
        <div className="character-card">
            <div className="image-container">
                <img
                    src={character.image || "/default-character.png"}
                    alt={character.name}
                    className="character-image"
                />
                <div className="image-actions">
                    <button className="icon-button" onClick={() => onEdit(character)}>
                        <FiEdit2 />
                    </button>
                    <button className="icon-button" onClick={() => onDelete(character)}>
                        <FiTrash2 />
                    </button>
                </div>
            </div>
            <div className="character-info">
                <h4>{character.name}</h4>
            </div>
        </div>
    );
}

export default CharacterCard;
