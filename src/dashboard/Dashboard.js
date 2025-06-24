
import { Helmet } from "react-helmet-async";

function Dashboard() {

    return (
        <>
            <Helmet>
                    <title>Dashboard | Campaign Manager</title>
            </Helmet>

            <div className="dashboard-page">
                <div className="content-header">
                    <h2>Dashboard</h2>
                    <p>Welcome to your Dashboard. Here you will be able to view campaigns shared with you as well as mangaed your own. <br />Happy Building!!</p> 
                </div>

                <div className="tile-grid-container">
                    <p>Dashboard coming soon!</p>
                </div>
            </div>
        </>
    );
}

export default Dashboard;