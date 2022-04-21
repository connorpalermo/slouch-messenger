import React from 'react'
import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'uversal-cookie';

import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './';
import SlouchIcon from '../assets/slouch.png';

const SideBar = () => (
    <div className="channelListSidebar">
        <div className="channelListSidebar_icon1">
            <div className="icon1_inner">
                <img src={SlouchIcon} alt="SlouchIcon" width="30"/>
            </div>
        </div>
    </div>
)

const ChannelListContainer = () => {
  return (
        <div>
            ChannelListContainer
        </div>
  )
}

export default ChannelListContainer