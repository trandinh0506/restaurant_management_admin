import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";

import Notification from "../Notification";
import { SERVERHOST } from "../domain";

import "./dashboard.css";

const socket = io(SERVERHOST);

document.title = "Dashboard";
const Dashboard = () => {
    const [message, setMessage] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [tables, setTables] = useState([]);

    const navigate = useNavigate();

    // validate token
    useEffect(() => {
        axios
            .get(`${SERVERHOST}/admin/validateAdminToken`, {
                withCredentials: true,
            })
            .then((response) => {
                if (response.status !== 200) {
                    setMessage(
                        `Status: ${response.status} - Message: ${response.data}`
                    );
                    const timer = setTimeout(() => {
                        navigate("/login");
                    }, 2500);
                    return () => {
                        clearTimeout(timer);
                    };
                } else {
                    setIsAdmin(true);
                }
            })
            .catch((err) => {
                const response = err.response;
                setMessage(
                    `Status: ${response.status} - Message: ${response.data}`
                );
                const timer = setTimeout(() => {
                    navigate("/login");
                }, 2500);
                return () => {
                    clearTimeout(timer);
                };
            });
    }, [navigate]);

    // get Table
    useEffect(() => {
        socket.on("updateTable", (tables) => {
            setTables(tables);
            console.log(tables);
        });
    }, []);
    // reset notification
    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage("");
        }, 2500);
        return () => {
            clearTimeout(timer);
        };
    }, [message]);

    return (
        <div>
            {message && <Notification message={message} />}
            {isAdmin && (
                <div id="dashboardWapper">
                    <div>
                        <button
                            key={"product"}
                            onClick={() => {
                                navigate("/manage-product");
                            }}
                        >
                            Manage Product
                        </button>
                        <button key={"table"}>Manage Table</button>
                    </div>
                    <div id="viewTableWapper">
                        {tables.map((table) => {
                            return (
                                <div key={table.__id}>{table.tableName}</div>
                            );
                        })}
                    </div>
                </div>
            )}
            {!isAdmin && (
                <div id="access-denied">
                    <div>Access Denied</div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
