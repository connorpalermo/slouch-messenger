import React, { useState } from 'react';
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

const cookies = new Cookies();

const slouchApiKey = 'h73mtwqya8wq'; 
const authToken = cookies.get("token");

// this will declare the instance of our Streamchat, which will allow this chat to work.
const client = StreamChat.getInstance(slouchApiKey);

// note that some things are renamed to match the keys on the client side.
if(authToken){
  client.connectUser({
    token: cookies.get('token'),
    name: cookies.get('username'),
    fullName: cookies.get('fullName'),
    id: cookies.get('userId'),
    phoneNumber: cookies.get('phoneNumber'),
    image: cookies.get('avatarURL'),
    hashedPassword: cookies.get('hashedPassword'),
  }, authToken);
}

// the basis of our entire application. Gets rendered in the ReactDOM in index.js
const App = () => {
  // pass props from here because both ChannelListContainer and ChannelContainer need to know
  const [createType, setCreateType] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // if we aren't logged in, then Auth component will be returned.
  if(!authToken) return <Auth />

  return (
    <div className='app__wrapper'> 
        <Chat client={client} customStyles={customStyles}>
            <ChannelListContainer
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              isEditing={isEditing}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
            />
            <ChannelContainer
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              createType={createType}
            />
        </Chat>
    </div>
  )
}

export default App