import React from 'react';
import Notification from './Notification'; 
import { useState, useEffect } from 'react';
import { notificationAPIService } from '../../services/notificationAPIService';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NotificationModal = ({showModal, setShowModal}) => {
  const API = notificationAPIService()
  const [notifs, setNotifs] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    API.getNotificationList().then((ret) => {
      if (ret.success) {
        setNotifs(ret.data.results)
      } else {
        if (ret.message === 'Not Authorized') {
          localStorage.clear()
          navigate("/login")
        }
      }
    }).catch(e => console.log(e.message))
  }, [])
  console.log(notifs)
  return (
    <Modal show={showModal} onHide={() => {setShowModal(false)}}>
      <Modal.Header closeButton>
            <h5 className="modal-title" id="notificationModalLabel">Notifications</h5>
      </Modal.Header>
      <Modal.Body>
        <ul className="list-group">
          {[...notifs].map((x,i) => {return <Notification key={i} id={x.id} data={x} closeModal={() => {setShowModal(false)}}/>})}
        </ul>
      </Modal.Body>
    </Modal>
  );
};

export default NotificationModal;