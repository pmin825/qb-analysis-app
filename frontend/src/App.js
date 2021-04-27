import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import HomePage from "./pages/HomePage";

import "./App.css";

function App() {
    return (
        <Router>
            <Route path="/" exact component={HomePage} />
            <Redirect to="/"></Redirect>
        </Router>
    );
}

export default App;
