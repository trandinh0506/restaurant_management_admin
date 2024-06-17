import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Notification from "../Notification";
import { SERVERHOST } from "../domain";

const Dashboard = () => {
    const [message, setMessage] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`${SERVERHOST}/admin/validateAdminToken`, {
                withCredentials: true,
            })
            .then((response) => {
                console.log(response);
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
            <Notification message={message} />
            {isAdmin && <div>This is Dashboard</div>}
            {!isAdmin && <div> Access Denied</div>}
        </div>
    );
};

export default Dashboard;
