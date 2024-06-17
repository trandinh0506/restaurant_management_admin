import React from "react";
import Style from "./Notification.module.css";
const Notification = ({ message }) => {
    return <div className={Style.notification}>{message}</div>;
};

export default Notification;
