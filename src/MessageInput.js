import React, { useState } from 'react';
import './MessageInput.css';

const NewMessage = ({socket}) => {
  const [value, setValue] = useState('');

  console.log("Current socket message to server: ", socket);

  const submitForm = (e) => {
    e.preventDefault();
    socket.emit('startAutoGroupFiles',{userId: "123", previewId: "123"});
    setValue('');
  };

  return (
    <form onSubmit={submitForm}>
      <input
        autoFocus
        value={value}
        placeholder="Type your message"
        onChange={(e) => {
          setValue(e.currentTarget.value);
        }}
      />
    </form>
  );
};

export default NewMessage;