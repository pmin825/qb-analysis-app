import React from "react";
import QbIndex from "../components/QbIndex";

import "./homepage.styles.scss";

const HomePage = () => {
    return (
        <div className="homepage-container">
            <div className="qbdata-container">
                <QbIndex />
            </div>
        </div>
    );
};

export default HomePage;
