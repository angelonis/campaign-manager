import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Helmet } from "react-helmet-async";

import ConfirmModal from "../components/ConfirmModal";

import "../styles/AdminPage.css";

const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [pendingRoleChange, setPendingRoleChange] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersCollection = await getDocs(collection(db, "users"));
                const userList = usersCollection.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setUsers(userList);
            } catch (err) {
                console.error("Error fetching users:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const openRoleChangeModal = (userId, newRole, displayName) => {
        setPendingRoleChange({ userId, newRole, displayName });
        setModalOpen(true);
    };

    const handleConfirmRoleChange = async () => {
        const { userId, newRole } = pendingRoleChange;
        try {
            const userRef = doc(db, "users", userId);
            await updateDoc(userRef, { role: newRole });

            setUsers(prev =>
                prev.map(u => (u.id === userId ? { ...u, role: newRole } : u))
            );
        } catch (err) {
            console.error("Error updating role:", err);
        } finally {
            setModalOpen(false);
            setPendingRoleChange(null);
        }
    };

    if (loading) return <p>Loading users...</p>;

    return (
        <>
            <Helmet>
                <title>Admin | Campaign Manager</title>
                <meta name="description" content="Manage your users" />
            </Helmet>

            <div>
            <h2>User Management</h2>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Display Name</th>
                        <th>Date Joined</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.email}</td>
                            <td>{user.displayName || "—"}</td>
                            <td>{new Date(user.joined).toLocaleDateString() || "—"}</td>
                            <td>
                                <select
                                    value={user.role}
                                    onChange={(e) => openRoleChangeModal(user.id, e.target.value, user.displayName)} >
                                    <option value="admin">Admin</option>
                                    <option value="creator">Creator</option>
                                    <option value="viewer">Viewer</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ConfirmModal
                isOpen={modalOpen}
                title="Confirm Role Change"
                message={`Are you sure you want to change '${pendingRoleChange?.displayName}' role to '${pendingRoleChange?.newRole}'?`}
                onConfirm={handleConfirmRoleChange}
                onCancel={() => setModalOpen(false)} />
            </div>
        </>
    );
};

export default AdminPage;
