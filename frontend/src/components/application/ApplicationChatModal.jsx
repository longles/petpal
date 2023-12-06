import React, { useEffect, useState } from 'react';
import { applicationCommentAPIService } from '../../services/commentAPIService';
import '../../styles/applications.scoped.css'

const fetchAllMessages = async (commentService, applicationId) => {
    let allMessages = [];
    let response = await commentService.getApplicationCommentList(applicationId, 1);
    allMessages = allMessages.concat(response.data.results);

    while (response.data.next) {
        const nextPage = response.data.next.split('page=')[1];
        response = await commentService.getApplicationCommentList(applicationId, nextPage);
        allMessages = allMessages.concat(response.data.results);
    }

    return response.success ? allMessages : null;
};

const ChatMessage = ({ message, isCurrentUser }) => (
    <div className={`message ${isCurrentUser ? '' : 'other-user'}`}>
        {message.content}
    </div>
);

const ChatModal = ({ applicationId }) => {
    const [messages, setMessages] = useState([]);
    const [newComment, setNewComment] = useState('');
    const commentService = applicationCommentAPIService();

    useEffect(() => {
        const initFetchMessages = async () => {
            const fetchedMessages = await fetchAllMessages(commentService, applicationId);
            if (fetchedMessages) {
                setMessages(fetchedMessages);
            } else {
                console.error('Error fetching messages');
            }
        };

        initFetchMessages();
    }, [applicationId]);

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleCommentSubmit = async (event) => {
        event.preventDefault();
        if (newComment.trim()) {
            const response = await commentService.createApplicationComment(applicationId, newComment);
            if (response.success) {
                setNewComment('');
                const updatedMessages = await fetchAllMessages(commentService, applicationId);
                setMessages(updatedMessages || messages);
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
                        <h5 className="modal-title">Chat</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body chat-modal-body">
                        <div className="chat-container">
                            {messages.length === 0 ? <div className="no-messages">No messages</div> :
                                messages.map(message => (
                                    <ChatMessage
                                        key={message.id}
                                        message={message}
                                        isCurrentUser={String(message.sender) === localStorage.getItem('user_id')}
                                    />
                                ))
                            }
                        </div>
                    </div>
                    <div className="modal-footer">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Type your message..."
                            value={newComment}
                            onChange={handleCommentChange}
                        />
                        <button type="submit" className="btn btn-primary" onClick={handleCommentSubmit}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatModal;
