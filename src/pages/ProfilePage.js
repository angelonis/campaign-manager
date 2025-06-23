import { Helmet } from "react-helmet-async";
function ProfilePage() {
    return (
        <>
            <Helmet>
                <title>Profile | Campaign Manager</title>
                <meta name="description" content="Manage your profile" />
            </Helmet>

            <div style={{ padding: "2rem" }}>
            <h2>User Profile</h2>
            <p>This is where user info will go.</p>
            </div>
        </>
    );
}

export default ProfilePage;
