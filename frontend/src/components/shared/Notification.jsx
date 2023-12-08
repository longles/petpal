import React from 'react';
import { useState, useEffect } from 'react';
import { notificationAPIService } from '../../services/notificationAPIService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

const Notification = ({ id, data, closeModal, reloadNotifs }) => {
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

  const updateNotification = () => {
    API.updateNotificationIsRead(id, true)
  }

  const deleteNotification = () => {
    API.deleteNotification(id)
    reloadNotifs()
  }

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

  const onLinkClick = () => {
    updateNotification()
    closeModal()
  }

  const notification_type = data.notification_type
  const link_params = getLinkParams(notification_type)
  const is_read_class = data.is_read ? "bg-secondary" : ""
  return (
    <li className={`list-group-item ${is_read_class} ps-2`}>
      <div className={`d-flex justify-content-between align-items-center`}>
        <div>
          <div className='d-flex align-items-center'>
            <button className='icon-button me-2' onClick={deleteNotification}><FontAwesomeIcon color="red" icon={faTrash}></FontAwesomeIcon></button>
            <h5 className="notification-title mb-0" data-bs-toggle="collapse" data-bs-target={`#notificationDetails${id}`} onClick={updateNotification}>
              {data.notification_type}
            </h5>
          </div>
          
          {/* Notification content goes here. */}
          <div className="collapse" id={`notificationDetails${id}`}>
            {data.content}
          </div>
        </div>
        <div>
          <Link to={link_params.link} state={link_params.state} onClick={onLinkClick}><FontAwesomeIcon icon={faArrowRight} /></Link>
        </div>
      </div>
    </li>
  );
};

export default Notification;