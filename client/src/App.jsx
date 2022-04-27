import React from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { ChannelListContainer, ChannelContainer, Auth } from './components';

import './App.css';
import '@stream-io/stream-chat-css/dist/css/index.css';

const customStyles: CustomStyles = {
  '--primary-color': 'purple',
  '--md-font': '1.2rem',
  '--xs-m': '1.2rem',
  '--xs-p': '1.2rem',
  '--grey-gainsboro': 'purple',
}

const slouchApiKey = 'wjdterkuvn6h'; 

// this will declare the instance of our Streamchat, which will allow this chat to work.
const client = StreamChat.getInstance(slouchApiKey);

const authToken = false;

// the basis of our entire application. Gets rendered in the ReactDOM in index.js
const App = () => {

  // if we aren't logged in, then Auth component will be returned.
  if(!authToken) return <Auth />

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