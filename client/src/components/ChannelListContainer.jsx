import React, { useState } from 'react'
import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { ChannelSearch, GroupChannelList, GroupChannelPreview } from './';
import SlouchIcon from '../assets/slouch.png';
import LogoutIcon from '../assets/logout.png'

const cookies = new Cookies();

const SideBar = ({ logout }) => (
    <div className="channel-list__sidebar">
        <div className="channel-list__sidebar__icon1">
            <div className="icon1__inner">
                <img src={SlouchIcon} alt="SlouchIcon" width="30"/>
            </div>
        </div>
        <div className="channel-list__sidebar__icon2">
            <div className="icon2__inner" onClick={logout}>
                <img src={LogoutIcon} alt="LogoutIcon" width="30"/>
            </div>
        </div>
    </div>
);

const CompanyHeader = () => (
    <div className="channel-list__header">
        <p className="channel-list__header__text">Slouch Music Chat</p>
    </div>
);

const customChannelGroupFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'team');
}

const customChannelDMFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'messaging');
}

// ChannelListContainer class will bring ChannelSearch, ChannelList, GroupChannelList etc together and display them in the ChannelList Wrapper
// Sidebar with icons defined in a const above.
const ChannelListContent = ({ isCreating, setIsCreating, setCreateType, setIsEditing }) => {
    const { client } = useChatContext();

    const logout = () => {
        cookies.remove('token');
        cookies.remove('username');
        cookies.remove('fullName');
        cookies.remove('userId');
        cookies.remove('phoneNumber');
        cookies.remove('avatarURL');
        cookies.remove('hashedPassword');

        window.location.reload(); //bring us back to auth page.
    }

    const filters = {members: { $in: [client.userID] }}; // get all channels and DMs that our user is in.

  return (
        <>
        <SideBar logout={logout}/>
        <div className="channel-list__list__wrapper">
            <CompanyHeader/>
            <ChannelSearch />
            <ChannelList 
                filters={filters}
                channelRenderFilterFunc={customChannelGroupFilter}
                List={(listProps) => (
                    <GroupChannelList
                        {...listProps}
                        type="team"
                        isCreating={isCreating}
                        setIsCreating={setIsCreating}
                        setCreateType={setCreateType}
                        setIsEditing={setIsEditing}
                    />
                )}
                Preview={(previewProps) => (
                    <GroupChannelPreview
                        {...previewProps}
                        type="team"
                    />
                )
                }
            />
            <ChannelList 
                filters={filters}
                channelRenderFilterFunc={customChannelDMFilter}
                List={(listProps) => (
                    <GroupChannelList
                        {...listProps}
                        type="messaging"
                        isCreating={isCreating}
                        setIsCreating={setIsCreating}
                        setCreateType={setCreateType}
                        setIsEditing={setIsEditing}
                    />
                )}
                Preview={(previewProps) => (
                    <GroupChannelPreview
                        {...previewProps}
                        type="messaging"
                    />
                )
                }
            />
        </div>
        </>
  )
}

const ChannelListContainer = ({ setCreateType, setIsCreating, setIsEditing }) => {
    const [toggleContainer,setToggleContainer] = useState(false);

    return (
        <>
            <div className="channel-list__container">
                <ChannelListContent
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                />
            </div>

            <div className="channel-list__container-responsive" 
                style={{ left: toggleContainer ? "0%" : "-89%", backgroundColor: "#005fff"}}
            >
                <div className="channel-list__container-toggle" onClick={() => setToggleContainer((prevToggleContainer) => !prevToggleContainer)} />
                <ChannelListContent
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                    setToggleContainer={setToggleContainer}
                />
            </div>
        </>
    )
}

export default ChannelListContainer