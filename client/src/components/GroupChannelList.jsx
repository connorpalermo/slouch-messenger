import React from 'react';

import { AddChannel } from '../assets'

// this class will be used to display groups and DMs
// type prop is used for group chats or DMs

const GroupChannelList = ({ children, error = false, loading, type, isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer }) => {
      if(error) {
          return type === 'team' ? (
            <div className="team-channel-list">
                <p className="team-channel-list__message">
                    Connection issues, please wait a few moments and try again.
                </p>
            </div>
          ) : null;
          }
          if(loading) {
            return(
              <div className="team-channel-list">
                  <p className="team-channel-list__message loading">
                      {type === 'team' ? 'Channels' : 'Messages'} processing ...
                  </p>
              </div>
            );
      }

      return(
        <div className="team-channel-list">
            <div className="team-channel-list__header">
                <p className="team-channel-list__header__title">
                {type === 'team' ? 'Channels' : 'Direct Messages'} 
                </p>
                <AddChannel 
                        isCreating={isCreating}
                        setIsCreating={setIsCreating}
                        setCreateType={setCreateType}
                        setIsEditing={setIsEditing}   
                        type={type === 'team' ? 'team' : 'messaging'}    
                        setToggleContainer={setToggleContainer}           
                />
            </div>
            {children}
        </div>
      );
}

export default GroupChannelList