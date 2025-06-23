import { Helmet } from "react-helmet-async";

function ItemPage() {
    return (
        <>
            <Helmet>
                <title>Items | Campaign Manager</title>
                <meta name="description" content="Manage your items (eg. weapons, relics, etc.)" />
            </Helmet>

            <div>Items Page Coming Soon</div>
        </>
    );
}

export default ItemPage;