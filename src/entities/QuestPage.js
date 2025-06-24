import { Helmet } from "react-helmet-async";

function QuestPage() {
    return (
        <>
            <Helmet>
                <title>Quests | Campaign Manager</title>
                <meta name="description" content="Manage your quests" />
            </Helmet>

            <div className="quests-page">
                <div className="content-header">
                    <h2>Quests</h2>
                    <p>Create quests to add into your world!</p>
                </div>

                <div className="tile-grid-container">
                    <p>Quests coming soon!</p>
                </div>
            </div>
        </>
    );
}

export default QuestPage;