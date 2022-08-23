import React, { useEffect, useState } from 'react';
import './Messages.css';

function Messages({ socket }) {
  const [messages, setMessages] = useState({});

  console.log("Current socket server to FE: ", socket);

  useEffect(() => {
    const messageListener = (message) => {
        
        console.log("Obtained message from server:", message);

      setMessages((prevMessages) => {
        const newMessages = {...prevMessages};
        newMessages[message.id] = message;
        return newMessages;
      });
    };
  
    // const deleteMessageListener = (messageID) => {
    //   setMessages((prevMessages) => {
    //     const newMessages = {...prevMessages};
    //     delete newMessages[messageID];
    //     return newMessages;
    //   });
    // };
  
    socket.on('startAutoGroupFiles', messageListener);
    // socket.on('deleteMessage', deleteMessageListener);
    // socket.emit('getMessages');

    return () => {
      socket.off('startAutoGroupFiles', messageListener);
    //   socket.off('deleteMessage', deleteMessageListener);
    };
  }, [socket]);



  return (
    <div className="message-list">
      {[...Object.values(messages)]
        .sort((a, b) => a.time - b.time)
        .map((message) => (
          <div
            key={message.id}
            className="message-container"
            title={`Sent at ${new Date(message.time).toLocaleTimeString()}`}
          >
            {/* <span className="user">{message.user.name}:</span> */}
            <span className="message">{message}</span>
          </div>
        ))
      }
    </div>
  );
}

export default Messages;