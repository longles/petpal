import React from 'react';
import Notification from './Notification'; 

const NotificationModal = () => {
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
              <Notification id={1} title="Application Approved" details="Your application for Whiskers has been approved" />
              <Notification id={2} title="Application Rejected" details="Your application for Rocky has been rejected" />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;