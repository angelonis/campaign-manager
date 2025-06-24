import { Helmet } from "react-helmet-async";

function LocationPage() {
    return (
        <>
            <Helmet>
                <title>Locations | Campaign Manager</title>
                <meta name="description" content="Manage your locations (eg. Barovia, Saltmarsh, etc.)" />
            </Helmet>

            <div className="locations-page">
                <div className="content-header">
                    <h2>Locations</h2>
                    <p>Create locations to add into your world!</p>
                </div>

                <div className="tile-grid-container">
                    <p>Locations coming soon!</p>
                </div>
            </div>
        </>
    );
}

export default LocationPage;
