import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link,
    BrowserRouter,
} from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
