import React from 'react'
import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { ChannelSearch, GroupChannelList, GroupChannelPreview } from './';
import SlouchIcon from '../assets/slouch.png';
import LogoutIcon from '../assets/logout.png'

const SideBar = () => (
    <div className="channel-list__sidebar">
        <div className="channel-list__sidebar__icon1">
            <div className="icon1__inner">
                <img src={SlouchIcon} alt="SlouchIcon" width="30"/>
            </div>
        </div>
        <div className="channel-list__sidebar__icon2">
            <div className="icon2__inner">
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

const ChannelListContainer = () => {
  return (
        <>
        <SideBar />
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