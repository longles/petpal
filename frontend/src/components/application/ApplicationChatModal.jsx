import React, { useEffect, useState } from 'react';
import { applicationCommentAPIService } from '../../services/commentAPIService';
import '../../styles/applications.scoped.css'

const ChatModal = ({ applicationId }) => {
    const [messages, setMessages] = useState([]);
    const [newComment, setNewComment] = useState('');
    const commentService = applicationCommentAPIService();

    const fetchMessages = async () => {
        let allMessages = [];
        let response = await commentService.getApplicationCommentList(applicationId, 1);
        allMessages = allMessages.concat(response.data.results);

        while (response.data.next) {
            const nextPage = response.data.next.split('page=')[1];
            response = await commentService.getApplicationCommentList(applicationId, nextPage);
            allMessages = allMessages.concat(response.data.results);
        }

        if (response.success) {
            setMessages(allMessages);
        } else {
            console.error('Error fetching messages');
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleCommentSubmit = async (event) => {
        event.preventDefault();
        if (newComment.trim()) {
            const response = await commentService.createApplicationComment(applicationId, newComment);
            if (response.success) {
                setNewComment('');
                fetchMessages();
            } else {
                console.error('Error creating comment:', response.message);
            }
        }
    };

    return (
        <div className="modal fade" id={`chatModal${applicationId}`} tabIndex="-1">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="chatModalLabel">Chat</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body chat-modal-body">
                        <div className="chat-container">
                        {messages.length === 0 ? (
                                <div className="no-messages">No messages</div>
                            ) : (
                                messages.map((message) => (
                                    <div key={message.id} className={`${String(message.sender) === localStorage.getItem('user_id') ? 'message' : 'message other-user'}`}>
                                        {message.content}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <input type="text" className="form-control" placeholder="Type your message..." value={newComment} onChange={handleCommentChange} />
                        <button type="submit" className="btn btn-primary" onClick={handleCommentSubmit}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatModal;
