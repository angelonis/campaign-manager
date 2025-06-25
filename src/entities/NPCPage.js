import { Helmet } from "react-helmet-async";

function NPCPage() {
    return (
        <>
            <Helmet>
                <title>NPCs | Campaign Manager</title>
                <meta name="description" content="Manage your NPCs" />
            </Helmet>

            <div className="npcs-page">
                <div className="content-header">
                    <h2>NPCs</h2>
                    <p>Create NPCs to add into your world!</p>
                </div>

                <div className="tile-grid-container">
                    <p>NPCs coming soon!</p>
                </div>
            </div>
        </>
    );
}

export default NPCPage;
