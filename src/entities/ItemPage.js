import { Helmet } from "react-helmet-async";

function ItemPage() {
    return (
        <>
            <Helmet>
                <title>Items | Campaign Manager</title>
                <meta name="description" content="Manage your items (eg. weapons, relics, etc.)" />
            </Helmet>

            <div className="items-page">
                <div className="content-header">
                    <h2>Items</h2>
                    <p>Create wonderous items!</p>
                </div>

                <div className="tile-grid-container">
                    <p>Items coming soon!</p>
                </div>
            </div>
        </>
    );
}

export default ItemPage;