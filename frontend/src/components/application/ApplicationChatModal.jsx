import React, { useEffect, useState, useRef } from 'react';
import { applicationCommentAPIService } from '../../services/commentAPIService';
import '../../styles/applications.scoped.css';
import { Modal } from 'react-bootstrap';

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

const ChatModal = ({ applicationId, showModal, setShowModal }) => {
    const [messages, setMessages] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const commentService = applicationCommentAPIService();
    const chatContainerRef = useRef(null);
    const bottom = useRef(null);
    const [oldScrollHeight, setOldScrollHeight] = useState(null)

    useEffect(() => {
        const initFetchMessages = async () => {
            const fetchedMessages = await fetchMessages(commentService, applicationId, 1);
            if (fetchedMessages) {
                setMessages(fetchedMessages.results);
                setHasMore(fetchedMessages.next != null);
                setIsInitialLoad(false);
                console.log(fetchedMessages)
            } else {
                console.error('Error fetching messages');
            }
        };

        initFetchMessages();
        if (bottom.current) {
            bottom.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [applicationId]);

    const loadMoreMessages = async () => {
        if (chatContainerRef.current && hasMore && !isInitialLoad) {
            const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
            console.log(scrollTop)
            if (scrollTop === 0) {
                const nextPage = currentPage + 1;
                const fetchedMessages = await fetchMessages(commentService, applicationId, nextPage);
                if (fetchedMessages) {
                    setOldScrollHeight(chatContainerRef.current.scrollHeight);
                    setMessages(prevMessages => [...prevMessages, ...fetchedMessages.results]);
                    setHasMore(fetchedMessages.next != null);
                    setCurrentPage(nextPage);
                }
            }
        }
    };

    useEffect(() => {
        scrollToBottom()
    }, [isInitialLoad, newComment])

    useEffect(() => {
        const chatContainer = chatContainerRef.current;
        if (chatContainer) {
            chatContainer.addEventListener('scroll', loadMoreMessages);
            const newScrollHeight = chatContainerRef.current.scrollHeight;
            const newMessagesHeight = newScrollHeight - oldScrollHeight;
            chatContainerRef.current.scrollTop += newMessagesHeight;
        }
        
        

        return () => {
            if (chatContainer) {
                chatContainer.removeEventListener('scroll', loadMoreMessages);
                
            }
            
        };
    }, [currentPage, hasMore, isInitialLoad]);

    const scrollToBottom = () => {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    };

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleCommentSubmit = async (event) => {
        event.preventDefault();
        if (newComment.trim()) {
            const response = await commentService.createApplicationComment(applicationId, newComment);
            if (response.success) {
                const newMessage = response.data; // Assuming response.data contains the new message
                setMessages(prevMessages => [newMessage, ...prevMessages]);
                setNewComment('');
                scrollToBottom();
            } else {
                console.error('Error creating comment:', response.message);
            }
        }
    };

    return (
        <Modal show={showModal} onHide={() => {setShowModal(false)}} >
            <Modal.Header closeButton>
                <h5 className="modal-title">Chat</h5>
            </Modal.Header>
            <Modal.Body className="chat-modal-body">
                <div className="chat-container" ref={chatContainerRef}>
                    {messages.length === 0 ? <div className="no-messages">No messages</div> :
                        [...messages].reverse().map(message => (
                            <ChatMessage
                                key={message.id}
                                message={message}
                                isCurrentUser={String(message.sender) === localStorage.getItem('user_id')}
                            />
                        ))
                    }
                    <div ref={bottom}></div>
                </div>
            </Modal.Body>
            <Modal.Footer>
            <input
                type="text"
                className="form-control"
                placeholder="Type your message..."
                value={newComment}
                onChange={handleCommentChange}
            />
            <button type="submit" className="btn btn-primary" onClick={handleCommentSubmit}>Send</button>
            </Modal.Footer>
                    
        </Modal>
    );
};

export default ChatModal;
