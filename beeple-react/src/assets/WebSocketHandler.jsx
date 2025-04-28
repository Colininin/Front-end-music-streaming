import React, {useState, useEffect, useContext} from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { toast } from 'react-toastify';
import UserContext from "./UserContext.jsx";
function WebSocketChat() {
    const [stompClient, setStompClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const {user} = useContext(UserContext);
    
    useEffect(() => {
        const client = new Client({
            webSocketFactory: () => new SockJS('http://localhost:8080/ws-chat'), 
            reconnectDelay: 5000,  
            heartbeatIncoming: 4000,  
            heartbeatOutgoing: 4000, 
            debug: (str) => console.log(str),
            onStompError: (frame) => {
                console.error('Broker reported error: ', frame.headers['message']);
                console.error('Additional details: ', frame.body);
            },
        });
        
        client.onConnect = () => {
            console.log('Connected to WebSocket');
            client.subscribe('/topic/global', (message) => {
                const parsedMessage = JSON.parse(message.body);
                setMessages((prevMessages) => [...prevMessages, parsedMessage]);
            });

            //if time left show history!
        };
        
        client.onDisconnect = () => {
            console.log('Disconnected from WebSocket');
        };

        client.activate();

        setStompClient(client);
        
        return () => {
            if (client) client.deactivate();
        };
    }, []);

    
    const sendMessage = () => {
        if (stompClient && messageInput.trim()) {
            const messagePayload = {
                username: user.name,
                text: messageInput,
                timestamp: new Date().toISOString(),
            };
            stompClient.publish({ destination: '/app/chat', body: JSON.stringify(messagePayload) });
            setMessageInput('');
        } else {
            toast.error('Message cannot be empty');
        }
    };

    return (
        <>
            <div className="chat-container">
                <h2>Global Chat</h2>
                <div className="chat">
                    {messages.map((msg, index) => (
                        <div key={index}>
                            <span><strong>{msg.username}: </strong>{msg.text}</span>
                        </div>
                    )) }
                </div>
                <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type a message"
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </>
        

        
    );
}

export default WebSocketChat;