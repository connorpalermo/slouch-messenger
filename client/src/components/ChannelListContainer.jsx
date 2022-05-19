import React from 'react'
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

// ChannelListContainer class will bring ChannelSearch, ChannelList, GroupChannelList etc together and display them in the ChannelList Wrapper
// Sidebar with icons defined in a const above.
const ChannelListContainer = ({ isCreating, setIsCreating, setCreateType, setIsEditing }) => {

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
  return (
        <>
        <SideBar logout={logout}/>
        <div className="channel-list__list__wrapper">
            <CompanyHeader/>
            <ChannelSearch />
            <ChannelList 
                filters={{}}
                channelRenderFilterFunc={() => {}}
                List={(listProps) => (
                    <GroupChannelList
                        {...listProps}
                        type="group"
                        isCreating={isCreating}
                        setIsCreating={setIsCreating}
                        setCreateType={setCreateType}
                        setIsEditing={setIsEditing}
                    />
                )}
                Preview={(previewProps) => (
                    <GroupChannelPreview
                        {...previewProps}
                        type="group"
                    />
                )
                }
            />
            <ChannelList 
                filters={{}}
                channelRenderFilterFunc={() => {}}
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

export default ChannelListContainer