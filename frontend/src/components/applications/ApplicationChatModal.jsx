import React, { useEffect, useState } from 'react';
import { applicationCommentAPIService } from '../../services/commentAPIService';
import '../../styles/layout.scope.css'
import '../../styles/applications.scoped.css'

const ChatModal = ({ isOpen, onClose, applicationId }) => {
    const [messages, setMessages] = useState([]);
    const [newComment, setNewComment] = useState('');
    const commentService = applicationCommentAPIService();

    const fetchMessages = async () => {
        if (isOpen && applicationId) {
            const response = await commentService.getApplicationCommentList(applicationId);
            if (response.success) {
                setMessages(response.data.content);
            } else {
                console.error('Error fetching messages:', response.message);
            }
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [isOpen, applicationId]);

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleCommentSubmit = async (event) => {
        event.preventDefault();
        if (newComment.trim()) {
            const response = await commentService.createApplicationComment(applicationId, newComment);
            if (response.success) {
                setNewComment('');
                fetchMessages(); // Refresh messages after submitting a comment
            } else {
                console.error('Error creating comment:', response.message);
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className={`modal fade ${isOpen ? 'show' : ''}`} id="chatModal1" tabIndex="-1" aria-labelledby="chatModal1Label" aria-hidden="true" style={{ display: isOpen ? 'block' : 'none' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="chatModalLabel">Chat</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body chat-modal-body">
                        <div className="chat-container">
                            {messages.map((message, index) => (
                                <div key={index} className={`message ${message.sender === 'other-user' ? 'other-user' : ''}`}>
                                    {message.text}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <form onSubmit={handleCommentSubmit}>
                            <input type="text" className="form-control" placeholder="Type your message..." value={newComment} onChange={handleCommentChange} />
                            <button type="submit" className="btn btn-primary">Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatModal;
