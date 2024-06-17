import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import ManageProduct from "./ManageProduct";
import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="manage-product" element={<ManageProduct />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
