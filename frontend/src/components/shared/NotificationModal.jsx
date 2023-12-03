import React from 'react';
import Notification from './Notification'; 
import { useState, useEffect } from 'react';
import { notificationAPIService } from '../../services/notificationAPIService';

const NotificationModal = () => {
  const API = notificationAPIService()
  const [notifs, setNotifs] = useState([])
  useEffect(() => {
    API.getNotificationList().then((ret) => {
      if (ret.success) {
        setNotifs(ret.data.results)
      } else {

      }
    })
  }, [])
  console.log(notifs)
  return (
    <div className="modal fade" id="notificationModal" tabIndex="-1" aria-labelledby="notificationModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="notificationModalLabel">Notifications</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <ul className="list-group">
              {[...notifs].map((x,i) => {return <Notification key={i} id={x.id} data={x} />})}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;