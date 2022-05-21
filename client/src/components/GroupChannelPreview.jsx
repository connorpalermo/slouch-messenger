import React from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';

// Group Channel preview will allow you to preview DMs and channels in the sidebar wrapper. Defined as const,
// logic to differentiate between the two below.
const GroupChannelPreview = ({ setActiveChannel, setIsCreating, setIsEditing, setToggleContainer, channel, type}) => {
    const {channel: activeChannel, client} = useChatContext();

    const ChannelPreview = () => (
        <p className='channel-preview__item'>
            {channel?.data?.name || channel?.data?.id}
        </p>
    )

    const DMPreview = () => {
        const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID);
    
        console.log(members[0]);

        return (
            <div className="channel-preview__item single">
                <Avatar 
                    image={members[0]?.user?.image}
                    name={members[0]?.user?.fullName || members[0]?.user?.id}
                    size={24}
                />
                <p>{members[0]?.user?.fullName || members[0]?.user?.id}</p>
            </div>
        )
    }

  return (
    <div className={
        channel?.id === activeChannel?.id
        ? 'channel-preview__wrapper__selected'
        : 'channel-preview__wrapper'
    }
        onClick={() => {
            setIsCreating(false); // no longer creating, we want to see the messages for a channel.
            setIsEditing(false); // same for editing, we no longer want to see that screen either.
            setActiveChannel(channel);
            if(setToggleContainer) {
                setToggleContainer((prevState) => !prevState);
            }
        }}
        >
        {type === 'team' ? <ChannelPreview/> : <DMPreview/>}
        
    </div>
  )
}

export default GroupChannelPreview