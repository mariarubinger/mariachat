import React from 'react';
import './MessageItem.css';

export default ({data, user}) => {
    return (
        <div
            className="messageLine"
            style={{
                justifyContent: user.id === data.author ? 'flex-end' : 'flex-start' /* identificar quem mandou a msg e passar ela pro lado direito ou pro lado esquerdo */
            }}
        >
            <div
                className="messageItem"
                style={{
                    backgroundColor: user.id === data.author ? '#DCF8C6' : '#FFF' 
                }}
            >
                <div className="messageText">{data.body}</div>
                <div className="messageDate">19:00</div>
            </div>
        </div>
    );
}