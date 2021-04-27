import React from "react";

import "./qbindexitem.styles.scss";

const QbIndexItem = ({ qbs, changeCurrentQb, currentQb }) => {
    return (
        <div className="qb-index-item-container">
            {qbs.map((qb) => {
                return (
                    <li
                        onClick={changeCurrentQb}
                        className={currentQb === qb.playerId ? "qb-selected" : "qb-item"}
                        key={qb.playerId}
                        value={qb.playerId}
                    >
                        <p>{qb.fullName}</p>
                        <img className="team-image" src={qb.teamImage} alt="" />
                        <img
                            className="player-image"
                            src={qb.playerImage}
                            alt=""
                        />
                    </li>
                );
            })}
        </div>
    );
};

export default QbIndexItem;
