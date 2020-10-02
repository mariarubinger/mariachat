import React, { useState, useEffect } from 'react';
import './App.css';

import Api from './Api';

import ChatListItem from './components/ChatListItem';
import ChatIntro from './components/ChatIntro';
import ChatWindow from './components/ChatWindow';
import NewChat from './components/NewChat';
import Login from './components/Login';

import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';

export default () => {

    const [chatlist, setChatList] = useState([]);
    const [activeChat, setActiveChat] = useState({});
   /*  const [user, setUser] = useState(null); */
   const [user, setUser] = useState({
        id: '4RdcdF6jINXsToURKoh9diWgcgC2',
        name: 'Maria Clara Rubinger de Sousa',
        avatar: 'https://scontent.fbsb3-1.fna.fbcdn.net/v/t1.0-9/106919151_4069551136451879_5607232725786716327_n.jpg?_nc_cat=100&_nc_sid=09cbfe&_nc_ohc=V8Q_4Kwe0QwAX-6JjgT&_nc_ht=scontent.fbsb3-1.fna&oh=8ca96d1d6f6c977f5ee4c33b8e990f35&oe=5F99A450'
   });
    const [showNewChat, setShowNewChat] = useState(false);

    const handleNewChat = () => {
        setShowNewChat(true);
    }

    const handleLoginData = async (u) => {
        let newUser = {
            id: u.uid,
            name: u.displayName,
            avatar: u.photoURL
        };
        await Api.addUser(newUser);
        setUser(newUser);
    }

    if(user === null ) {
        return (<Login onReceive={handleLoginData} />);
    }

    return (
        <div className="app-window">
            <div className="sidebar">
                <NewChat  
                    chatlist={chatlist}
                    user={user}
                    show={showNewChat}
                    setShow={setShowNewChat}
                />
                <header>
                    <img className="header--avatar" src={user.avatar} alt="" />
                    <div className="header--buttons">
                        <div className="header--btn">
                            <DonutLargeIcon style={{color: '#919191'}} />
                        </div>
                        <div onClick={handleNewChat} className="header--btn">
                            <ChatIcon style={{color: '#919191'}} />
                        </div>
                        <div className="header--btn">
                            <MoreVertIcon style={{color: '#919191'}} />
                        </div>
                    </div>
                </header>

                <div className="search">
                    <div className="search--input">
                        <SearchIcon fontSize="small" style={{color: '#919191'}}/>
                        <input type="search" placeholder="Procurar ou começar uma nova conversa"></input>
                    </div>
                </div>

                <div className="chatlist">
                    {chatlist.map((item, key) =>(
                        <ChatListItem
                            key={key}
                            data={item}
                            active={activeChat.chatId === chatlist[key].chatId}
                            onClick={()=>setActiveChat(chatlist[key])}
                        />
                    ))}
                </div>

            </div>
            <div className="contentarea">
                {activeChat.chatId !== undefined &&
                    <ChatWindow
                        user={user}
                    />
                }
                {activeChat.chatId === undefined &&
                    <ChatIntro />
                }
            </div>
        </div>
    );
}