import React from 'react';
import { useState, useEffect } from 'react';

const Notification = ({ id }) => {
  const [notif, setNotif] = useState({})
  useEffect(() => {
    setNotif({
        title: "Title",
        details: "Details"
    })
  })
  return (
    <li className="list-group-item">
      <div className="d-flex justify-content-between">
        <div>
          {/* Clickable title to toggle details */}
          <h5 className="notification-title" data-bs-toggle="collapse" data-bs-target={`#notificationDetails${id}`} aria-expanded="false">
            {notif.title}
          </h5>
          {/* Notification content goes here. */}
          <div className="collapse" id={`notificationDetails${id}`}>
            {notif.details}
          </div>
        </div>
      </div>
    </li>
  );
};

export default Notification;