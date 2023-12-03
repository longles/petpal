import React from 'react';
import { useState, useEffect } from 'react';
import { notificationAPIService } from '../../services/notificationAPIService';

const Notification = ({ id, data }) => {
  const API = notificationAPIService()
  // const [notif, setNotif] = useState({})
  // useEffect(() => {
  //   API.getNotificationDetail(id).then((ret) => {
  //     if (ret.success) {
  //       setNotif(ret.data)
  //     } else {

  //     }
  //   })
  // }, [API, id])
  return (
    <li className="list-group-item">
      <div className="d-flex justify-content-between">
        <div>
          {/* Clickable title to toggle details */}
          <h5 className="notification-title" data-bs-toggle="collapse" data-bs-target={`#notificationDetails${id}`} aria-expanded="false">
            {data.notification_type}
          </h5>
          {/* Notification content goes here. */}
          <div className="collapse" id={`notificationDetails${id}`}>
            {data.content}
          </div>
        </div>
      </div>
    </li>
  );
};

export default Notification;