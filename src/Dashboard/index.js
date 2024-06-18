import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";

import Notification from "../Notification";
import { SERVERHOST } from "../domain";

import "./dashboard.css";

const socket = io(SERVERHOST);

const Dashboard = () => {
    const [message, setMessage] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [tables, setTables] = useState([]);

    const navigate = useNavigate();

    // validate token
    useEffect(() => {
        axios
            .get(`${SERVERHOST}/admin/validate-admin-token`, {
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

    // first time call api to get Table
    useEffect(() => {
        axios
            .get(SERVERHOST + "/table/get", { withCredentials: true })
            .then((response) => {
                console.log(response);
                setTables(response.data);
            });
    }, []);

    // get Table
    useEffect(() => {
        socket.on("updateTable", (tables) => {
            setTables(tables);
        });
    }, []);

    // set the title
    useEffect(() => {
        document.title = "Dashboard";
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
                        <button
                            key={"table"}
                            onClick={() => {
                                navigate("/manage-table");
                            }}
                        >
                            Manage Table
                        </button>
                    </div>
                    <div id="viewTableWapper">
                        {tables.map((table) => {
                            return (
                                <div key={table.__id}>
                                    <div id="table-name">
                                        Bàn {table.tableName}
                                    </div>
                                    <div>
                                        {table.orderedItems.map((item) => {
                                            return (
                                                <div key={item.__id}>
                                                    Tên sản phẩm:{" "}
                                                    {item.productName}
                                                    <br />
                                                    Số lượng: {item.quantity}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
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
