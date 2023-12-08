import React from 'react';
import Notification from './Notification'; 
import { useState, useEffect } from 'react';
import { notificationAPIService } from '../../services/notificationAPIService';
import { Modal } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

const NotificationModal = ({showModal, setShowModal}) => {
  const API = notificationAPIService()
  const [notifs, setNotifs] = useState([])
  const navigate = useNavigate()
  const location = useLocation()
  const [reload, setReload] = useState(true)
  useEffect(() => {
    API.getNotificationList().then((ret) => {
      if (ret.success) {
        setNotifs(ret.data.results)
      } else {
        console.log(ret.message)
        if (ret.message.toLowerCase() === 'not authorized') {
          localStorage.clear()
          navigate("/login")
        }
      }
    }).catch(e => console.log(e.message))
  }, [showModal, location.pathname, reload])
  console.log(notifs)
  const displayNotifs = [...notifs]
  displayNotifs.sort((x, y) => Number(x.is_read) - Number(y.is_read))
  console.log(displayNotifs)
  return (
    <Modal show={showModal} onHide={() => {setShowModal(false)}}>
      <Modal.Header closeButton>
            <h5 className="modal-title" id="notificationModalLabel">Notifications</h5>
      </Modal.Header>
      <Modal.Body>
        <ul className="list-group">
          {displayNotifs.map((x,i) => {return <Notification key={i} id={x.id} data={x} closeModal={() => {setShowModal(false)}} reloadNotifs={() => {setReload(!reload)}}/>})}
        </ul>
        {displayNotifs.length === 0 && <p className="mb-0">No notifications to read!</p>}
      </Modal.Body>
    </Modal>
  );
};

export default NotificationModal;