import React from 'react';
import { useState, useEffect } from 'react';
import { notificationAPIService } from '../../services/notificationAPIService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

const Notification = ({ id, data, closeModal }) => {
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

  const getLinkParams = () => {
    switch (notification_type) {
      case "status_update":
        return {link: "/applications", state: {defaultFilters: {id: data.link_id}}}
      case "shelter_comment":
        return {link: "/shelterdetail/"+data.link_id, state: {}}
      case "application_creation":
        return {link: "/applications", state: {defaultFilters: {id: data.link_id}}}
      default:
        throw new Error("Unexpected Notification Type "+notification_type)
    }

  }

  const notification_type = data.notification_type
  const link_params = getLinkParams(notification_type)
  return (
    <li className="list-group-item">
      <div className="d-flex justify-content-between align-items-center">
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
        <div>
          <Link to={link_params.link} state={link_params.state} onClick={closeModal}><FontAwesomeIcon icon={faArrowRight} /></Link>
        </div>
      </div>
    </li>
  );
};

export default Notification;