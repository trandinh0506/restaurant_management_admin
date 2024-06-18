import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import ManageProduct from "./ManageProduct";
import ManageTable from "./ManageTable";
import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="manage-product" element={<ManageProduct />} />
                <Route path="manage-table" element={<ManageTable />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
