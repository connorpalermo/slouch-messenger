import React, { useState, useEffect }from 'react';
import { useChatContext } from 'stream-chat-react';

import { ResultsDropdown } from './'
import { SearchIcon } from '../assets'

// ChannelSearch will be used to implement the search functionality of the music chat.

const ChannelSearch = ({setToggleContainer}) => {
    const { client, setActiveChannel } = useChatContext();
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [groupChannels,setGroupChannels] = useState([]);
    const [directChannels, setDirectChannels] = useState([]);

    useEffect(() => {
        if(!query){
            setGroupChannels([]);
            setDirectChannels([]);
        }
    }, [query])

    const getChannels = async (text) => {
        try { 
            const channelResponse = client.queryChannels({
                type: 'team', 
                name: {$autocomplete: text}, // gets all names
                members: {$in: [client.userID]}
            });
            const userResponse = client.queryUsers({
                id: { $ne: client.userID},
                name: {$autocomplete: text}
            });

            const [channels, { users }] = await Promise.all([channelResponse, userResponse]); // this will allow us to get both of these requests at the same time

            if(channels.length) setGroupChannels(channels); // if channels exist, set channels
            if(users.length) setDirectChannels(users); // if users exist, set users

        } catch (error) {
            setQuery('');
        }
    };

    const onSearch = (e) => {
        e.preventDefault();

        setLoading(true);
        setQuery(e.target.value);
        getChannels(e.target.value);
    }

    const setChannel = (channel) => {
        setQuery('');
        setActiveChannel(channel);
    }

  return (
    <div className="channel-search__container">
        <div className="channel-search__input__wrapper">
            <div className="channel-search__input__icon">
                <SearchIcon />
            </div>
            <input 
                className="channel-search__input__text"
                placeholder="Search" 
                type="text" 
                value={query} 
                onChange={onSearch}
            />
        </div>
        { query && (
            <ResultsDropdown 
                groupChannels={groupChannels}
                directChannels={directChannels}
                loading={loading}
                setChannel={setChannel}
                setQuery={setQuery}
                setToggleContainer={setToggleContainer}
            />
        )}
    </div>
  )
}

export default ChannelSearch