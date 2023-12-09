import React, { useEffect, useState, useRef } from 'react';
import { applicationCommentAPIService } from '../../services/commentAPIService';
import '../../styles/applications.scoped.css';

// Fetch messages for a specific page
const fetchMessages = async (commentService, applicationId, page) => {
    const response = await commentService.getApplicationCommentList(applicationId, page);
    return response.success ? response.data : null;
};

const ChatMessage = ({ message, isCurrentUser }) => (
    <div className={`message ${isCurrentUser ? '' : 'other-user'}`}>
        {message.content}
    </div>
);

const ChatModal = ({ applicationId }) => {
    const [messages, setMessages] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isInitialLoad, setIsInitialLoad] = useState(true); // New state variable to track initial load
    const commentService = applicationCommentAPIService();
    const chatContainerRef = useRef(null);

    useEffect(() => {
        const initFetchMessages = async () => {
            const fetchedMessages = await fetchMessages(commentService, applicationId, 1);
            if (fetchedMessages) {
                setMessages(fetchedMessages.results);
                setHasMore(fetchedMessages.next != null);
                setIsInitialLoad(false); // Set initial load to false after first fetch
            } else {
                console.error('Error fetching messages');
            }
        };

        initFetchMessages();
    }, [applicationId]);

    const loadMoreMessages = async () => {
        if (chatContainerRef.current && hasMore && !isInitialLoad) { // Only adjust scroll if not initial load
            const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
            if (scrollTop + clientHeight >= scrollHeight - 10) {
                const nextPage = currentPage + 1;
                const fetchedMessages = await fetchMessages(commentService, applicationId, nextPage);
                if (fetchedMessages) {
                    const oldScrollHeight = chatContainerRef.current.scrollHeight;
                    setMessages(prevMessages => [...prevMessages, ...fetchedMessages.results]);
                    setHasMore(fetchedMessages.next != null);
                    setCurrentPage(nextPage);

                    // Adjust scroll position
                    const newScrollHeight = chatContainerRef.current.scrollHeight;
                    const newMessagesHeight = newScrollHeight - oldScrollHeight;
                    chatContainerRef.current.scrollTop += newMessagesHeight;
                }
            }
        }
    };

    useEffect(() => {
        const chatContainer = chatContainerRef.current;
        if (chatContainer) {
            chatContainer.addEventListener('scroll', loadMoreMessages);
        }

        return () => {
            if (chatContainer) {
                chatContainer.removeEventListener('scroll', loadMoreMessages);
            }
        };
    }, [currentPage, hasMore, isInitialLoad]);

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleCommentSubmit = async (event) => {
        event.preventDefault();
        if (newComment.trim()) {
            const response = await commentService.createApplicationComment(applicationId, newComment);
            if (response.success) {
                setNewComment('');
                const updatedMessages = await fetchMessages(commentService, applicationId, 1);
                setMessages(updatedMessages.results || messages);
                setCurrentPage(1);
                setHasMore(updatedMessages.next != null);
                setIsInitialLoad(false); // Ensure initial load is false after new comment is submitted
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
                        <div className="chat-container" ref={chatContainerRef}>
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
