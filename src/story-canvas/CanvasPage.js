import { Helmet } from "react-helmet-async";

function CanvasPage() {
    return (
        <>
            <Helmet>
                <title>Canvas | Campaign Manager</title>
                <meta name="description" content="Build your story!" />
            </Helmet>

            <div className="canvas-page">
                <div className="content-header">
                    <h2>Canvas</h2>
                    <p>Drag in elements you've created such as Characters, NPCs, Events and more to tell the story of your campaign.</p>
                </div>

                <div className="tile-grid-container">
                    <p>Canvas coming soon!</p>
                </div>
            </div>
        </>
    );
}

export default CanvasPage;
