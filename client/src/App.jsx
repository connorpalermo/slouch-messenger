import React from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { ChannelListContainer, ChannelContainer } from './components';

import './App.css';

const slouchApiKey = 'wjdterkuvn6h';

// this will declare the instance of our Streamchat, which will allow this chat to work.
const client = StreamChat.getInstance(slouchApiKey);

const App = () => {
  return (
    <div className='app-wrapper'> 
        <Chat client={client} theme="team light">
            <ChannelListContainer

            />
            <ChannelContainer

            />
        </Chat>
    </div>
  )
}

export default App