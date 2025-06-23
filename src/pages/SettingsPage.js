import { Helmet } from "react-helmet-async";

const SettingsPage = () =>  {
    return (
        <>
            <Helmet>
                <title>Settings | Campaign Manager</title>
                <meta name="description" content="Manage your settings." />
            </Helmet>

            <div style={{ padding: "2rem" }}>
                <h2>Settings</h2>
                <p>Settings and preferences will be editable here.</p>
            </div>
        </>
    );
}

export default SettingsPage;

