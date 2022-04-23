import React from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { ChannelListContainer, ChannelContainer } from './components';

import './App.css';
import '@stream-io/stream-chat-css/dist/css/index.css';

const slouchApiKey = 'wjdterkuvn6h';

const customStyles: CustomStyles = {
  '--primary-color': 'purple',
  '--md-font': '1.2rem',
  '--xs-m': '1.2rem',
  '--xs-p': '1.2rem',
  '--grey-gainsboro': 'purple',
}

// this will declare the instance of our Streamchat, which will allow this chat to work.
const client = StreamChat.getInstance(slouchApiKey);

const App = () => {
  return (
    <div className='app__wrapper'> 
        <Chat client={client} customStyles={customStyles}>
            <ChannelListContainer

            />
            <ChannelContainer

            />
        </Chat>
    </div>
  )
}

export default App