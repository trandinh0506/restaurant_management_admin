import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVERHOST } from "../domain";

const ManageTable = () => {
    const navigate = useNavigate();
    // validate authorization
    useEffect(() => {
        axios
            .get(`${SERVERHOST}/admin/validate-admin-token`, {
                withCredentials: true,
            })
            .then((response) => {
                if (response.status !== 200) {
                    navigate("/login");
                }
            })
            .catch((err) => {
                navigate("/login");
                return;
            });
    }, [navigate]);
    useEffect(() => {
        document.title = "Manage Table";
    }, []);
    return (
        <div>
            Manage Table is in development
            <div>
                <button
                    onClick={() => {
                        navigate("/dashboard");
                    }}
                >
                    Go to Dashboard
                </button>
            </div>
        </div>
    );
};

export default ManageTable;
