import React from "react";
import { Line, Bar } from "react-chartjs-2";
import "./qbhistory.styles.scss";

const QbHistory = ({ chartData, changeCurrentStat, currentStat }) => {
    return (
        <>
            <div className="qb-history-item-container">
                <div className="stat-picker">
                    <option
                        className={
                            currentStat === "ydsPerAttPerGame"
                                ? "stat-selected"
                                : ""
                        }
                        onClick={changeCurrentStat}
                        value="ydsPerAttPerGame"
                    >
                        Yds/Attempt
                    </option>
                    <option
                        className={
                            currentStat === "completeRatePerGame"
                                ? "stat-selected"
                                : ""
                        }
                        onClick={changeCurrentStat}
                        value="completeRatePerGame"
                    >
                        Cmp %
                    </option>
                    <option
                        className={
                            currentStat === "attemptsCompletions"
                                ? "stat-selected"
                                : ""
                        }
                        onClick={changeCurrentStat}
                        value="attemptsCompletions"
                    >
                        Att/Cmp
                    </option>
                    <option
                        className={
                            currentStat === "passYdsRushYds"
                                ? "stat-selected"
                                : ""
                        }
                        onClick={changeCurrentStat}
                        value="passYdsRushYds"
                    >
                        Pass/Rush Yds
                    </option>
                    <option
                        className={
                            currentStat === "passTdRushTd"
                                ? "stat-selected"
                                : ""
                        }
                        onClick={changeCurrentStat}
                        value="passTdRushTd"
                    >
                        Pass/Rush TDs
                    </option>
                    <option
                        className={
                            currentStat === "sackInt" ? "stat-selected" : ""
                        }
                        onClick={changeCurrentStat}
                        value="sackInt"
                    >
                        Sacks/INTs
                    </option>
                </div>
                <div>
                    <Bar className="chart" data={chartData} />
                </div>
            </div>
        </>
    );
};

export default QbHistory;
