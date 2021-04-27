import React, { useState, useEffect } from "react";
import QbIndexItem from "./QbIndexItem";
import QbHistory from "./QbHistory";
import axios from "axios";
import "./qbindex.styles.scss";

const QbIndex = () => {
    const [qbs, setQbs] = useState([]);
    const [currentQb, setCurrentQb] = useState(2543477);
    const [gameHistory, setGameHistory] = useState([]);
    const [ydsPerAttempt, setYdsPerAttempt] = useState(0);
    const [completeRate, setCompleteRate] = useState(0);
    const [chartData, setChartData] = useState({});
    const [currentStat, setCurrentStat] = useState("ydsPerAttPerGame");
    const [qbName, setQbName] = useState("Blake Bortles");

    useEffect(() => {
        fetchQbs();
        fetchQbHistory(currentQb);
    }, []);

    useEffect(() => {
        chart(gameHistory);
    }, [currentStat]);

    const fetchQbs = async () => {
        const API =
            process.env.NODE_ENV === "production"
                ? "https://qb-analysis-app.herokuapp.com/qbs"
                : "http://localhost:5000/qbs";
        try {
            const response = await axios.get(API);
            setQbs(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchQbHistory = async (qbId) => {
        qbId = currentQb;
        const API =
            process.env.NODE_ENV === "production"
                ? `https://qb-analysis-app.herokuapp.com/${qbId}`
                : `http://localhost:5000/${qbId}`;
        try {
            const response = await axios.get(API);
            setGameHistory(response.data);
            setYdsPerAttempt(findYdsPerAttempt(response.data));
            setCompleteRate(findCompleteRate(response.data));
            chart(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const changeCurrentQb = (e) => {
        const qbId = e.currentTarget.value;
        const API =
            process.env.NODE_ENV === "production"
                ? `https://qb-analysis-app.herokuapp.com/${qbId}`
                : `http://localhost:5000/${qbId}`;
        axios
            .get(API)
            .then((res) => {
                return [
                    chart(res.data),
                    setGameHistory(res.data),
                    setQbName(res.data[0].fullName),
                ];
            })
            .then(() => setCurrentQb(qbId));
    };

    const changeCurrentStat = (e) => {
        const qbId = currentQb;
        const selectedStat = e.target.value;
        setCurrentStat(selectedStat);
        chart(gameHistory);
    };

    const findTotalAttempts = (gameHistory) => {
        const attemptsByGame = gameHistory.map((game) => game.Att);
        return attemptsByGame.reduce((a, b) => a + b);
    };

    const findYdsPerAttempt = (gameHistory) => {
        const totalAttempts = findTotalAttempts(gameHistory);
        const ydsByGame = gameHistory.map((game) => game.PsYds);
        const totalYds = ydsByGame.reduce((a, b) => a + b);
        return parseFloat((totalYds / totalAttempts).toFixed(1));
    };

    const findCompleteRate = (gameHistory) => {
        const totalAttempts = findTotalAttempts(gameHistory);
        const completionsByGame = gameHistory.map((game) => game.Cmp);
        const totalCompletions = completionsByGame.reduce((a, b) => a + b);
        return parseFloat(
            ((totalCompletions / totalAttempts) * 100).toFixed(1)
        );
    };

    const chart = (gameHistory) => {
        const passingYards = gameHistory.map((game) => game.PsYds);
        const rushingYards = gameHistory.map((game) => game.RshYds);
        const passAttempts = gameHistory.map((game) => game.Att);
        const rushAttempts = gameHistory.map((game) => game.Rush);
        const passTds = gameHistory.map((game) => game.PsTD);
        const rushTds = gameHistory.map((game) => game.RshTD);
        const interceptions = gameHistory.map((game) => game.Int);
        const sacks = gameHistory.map((game) => game.Sack);
        const completions = gameHistory.map((game) => game.Cmp);

        const opps = gameHistory.map((game) => [
            game.opponent,
            "Week: " + `${game.week}`,
        ]);
        const ydsPerAttPerGame = gameHistory.map(
            (game) => game.PsYds / game.Att
        );
        const completeRatePerGame = gameHistory.map((game) => [
            (game.Cmp / game.Att) * 100,
        ]);

        switch (currentStat) {
            case "sackInt":
                setChartData({
                    labels: opps,
                    datasets: [
                        {
                            label: "Sacks Per Game",
                            data: sacks,
                            backgroundColor: "orange",
                            borderWidth: 4,
                            tension: 0.1,
                        },
                        {
                            label: "INTs Per Game",
                            data: interceptions,
                            backgroundColor: "red",
                            borderWidth: 4,
                            tension: 0.1,
                        },
                    ],
                });
                break;
            case "passTdRushTd":
                setChartData({
                    labels: opps,
                    datasets: [
                        {
                            label: "Passing TDs Per Game",
                            data: passTds,
                            backgroundColor: "green",
                            borderWidth: 4,
                            tension: 0.1,
                        },
                        {
                            label: "Rushing TDs Per Game",
                            data: rushTds,
                            backgroundColor: "blue",
                            borderWidth: 4,
                            tension: 0.1,
                        },
                    ],
                });
                break;
            case "passYdsRushYds":
                setChartData({
                    labels: opps,
                    datasets: [
                        {
                            label: "Passing Yds Per Game",
                            data: passingYards,
                            backgroundColor: "green",
                            borderWidth: 4,
                            tension: 0.1,
                        },
                        {
                            label: "Rushing Yds Per Game",
                            data: rushingYards,
                            backgroundColor: "blue",
                            borderWidth: 4,
                            tension: 0.1,
                        },
                    ],
                });
                break;
            case "attemptsCompletions":
                setChartData({
                    labels: opps,
                    datasets: [
                        {
                            label: "Pass Attempts Per Game",
                            data: passAttempts,
                            backgroundColor: "lightblue",
                            borderWidth: 4,
                            tension: 0.1,
                        },
                        {
                            label: "Completions Per Game",
                            data: completions,
                            backgroundColor: "violet",
                            borderWidth: 4,
                            tension: 0.1,
                        },
                    ],
                });
                break;
            case "completeRatePerGame":
                setChartData({
                    labels: opps,
                    datasets: [
                        {
                            label: "Completion Rate Per Game",
                            data: completeRatePerGame,
                            backgroundColor: "violet",
                            borderWidth: 4,
                            tension: 0.1,
                        },
                    ],
                });
                break;
            case "ydsPerAttPerGame":
                setChartData({
                    labels: opps,
                    datasets: [
                        {
                            label: "Yds Per Attempt",
                            data: ydsPerAttPerGame,
                            backgroundColor: "purple",
                            borderWidth: 4,
                            tension: 0.1,
                        },
                    ],
                });
            default:
                setChartData({
                    labels: opps,
                    datasets: [
                        {
                            label: "Yds Per Attempt",
                            data: ydsPerAttPerGame,
                            backgroundColor: "purple",
                            borderWidth: 4,
                            tension: 0.1,
                        },
                    ],
                });
                break;
        }
    };

    return (
        <>
            <div className="qb-index-container">
                <QbIndexItem
                    qbs={qbs}
                    changeCurrentQb={changeCurrentQb}
                    currentQb={currentQb}
                />
            </div>
            <div className="qb-history-container">
                <div className="app-title">
                    <p>Current QB: {qbName} </p>
                    <p>Yds Per Attempt (AVG): {ydsPerAttempt} yds</p>
                    <p>Cmp Percentage (AVG): {completeRate}%</p>
                </div>
                <QbHistory
                    gameHistory={gameHistory}
                    chartData={chartData}
                    changeCurrentStat={changeCurrentStat}
                    currentStat={currentStat}
                />
            </div>
        </>
    );
};

export default QbIndex;
