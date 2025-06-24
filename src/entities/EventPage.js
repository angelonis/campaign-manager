import { Helmet } from "react-helmet-async";

function EventPage() {
    return (
        <>
            <Helmet>
                <title>Events | Campaign Manager</title>
                <meta name="description" content="Manage your events (eg. wars, assassinations, etc.)" />
            </Helmet>

            <div className="events-page">
                <div className="content-header">
                    <h2>Events</h2>
                    <p>Create events to add into your world!</p>
                </div>

                <div className="tile-grid-container">
                    <p>Events coming soon!</p>
                </div>
            </div>
        </>
    );
}

export default EventPage;
