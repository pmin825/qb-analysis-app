# qb-analysis-app

[Qb-Analysis-App](https://qb-analysis-app.herokuapp.com/#/ "Qb-Analysis-App"), is an interactive web application that allows users to analyze NFL QB statistics through chart visuals. 

# Key Features 

*  Toggle QB: User's are able to toggle between Quarterbacks to see individual statistics. 

*  Toggle Stats: User's are able to choose which stat category to have displayed.

*  Show/Hide datasets: User's can toggle datasets to display or not, for charts that have multiple datasets.

*  Display derived rate stats for: Yards per att & Completion Rate.

*  Display counting stats, some of which are used to derive rate stats. 

# Technologies 

*  React (Hooks)

*  Javascript

*  Node.js

*  Express.js

*  Chart.js 

*  Sass

*  Axios

# Implementation

## Fetching Stats

Game by game stat history is generated by fetching data from TruMedia's NFL API. 

```js
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
 
```

## Utilizing React Hooks / useEffect

We dynamically alter the data that is being displayed by incorporating hooks to help us manage state. Furthermore, we leverage useEffect to re-render the component when the state of one of our dependencies changes. 

```js
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
    
```

# Future Direction

*  Adding more players and statistics 

*  Add additional styles of visuals/charts 
