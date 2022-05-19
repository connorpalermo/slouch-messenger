import React from 'react';
import { Channel, useChatContext, MessageTeam } from 'stream-chat-react';

import { ChannelInner, CreateChannel, EditChannel } from './';

// will house the actual channels/DMs themselves once implemented
const ChannelContainer = ({isCreating, setIsCreating, isEditing, setIsEditing, createType}) => {
  const { channel } = useChatContext(); // get context of current channel

  if(isCreating){
    return (
        <div className="channel__container">
          <CreateChannel createType={createType} setIsCreating={setIsCreating} />
        </div>
    )
  }

  if(isEditing){
    return (
      <div className="channel__container">
        <EditChannel setIsEditing={setIsEditing} />
      </div>
    )
  }

  const EmptyState = () => (
    <div className="channel-empty__container">
      <p className="channel-empty__first">There are currently no messages. This is the beginning of your chat.</p>
      <p className="channel-empty__second">Send messages with attachments, links, emojis and more!</p>
      </div>
  )
  return (
        <div className="channel__container">
            <Channel
              EmptyStateIndicator={EmptyState}
              Message={(messageProps, i) => <MessageTeam key={i} { ...messageProps} />} //built in component from stream, messages look good
            >
              <ChannelInner setIsEditing={setIsEditing}/>
            </Channel>
        </div>
  )
}

export default ChannelContainer