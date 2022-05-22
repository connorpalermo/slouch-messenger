import React, { useEffect, useState } from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';

import { InviteIcon } from '../assets';

// our userList, with invite functionality, Avatars etc
const ListContainer = ({ children }) => {

    return (
        <div className="user-list__container">
            <div className="user-list__header">
                <p>User</p>
                <p>Invite</p>
            </div>
            {children}
        </div>
    )
}

// need to better understand how the logic works here. 
const UserItem = ({ user, setSelectedUsers }) => {
    const [selected, setSelected] = useState(false);

    const handleSelect = () => {
        if(selected) {
            setSelectedUsers((prevUsers) => prevUsers.filter((prevUser) => prevUser !== user.id)); // filtering out the user we just clicked
        } else {
            setSelectedUsers((prevUsers) => [...prevUsers, user.id]); //otherwise , appending the user id to the list
        }
        setSelected((prevSelected) => !prevSelected);
    }
    
    return (
        <div className="user-item__wrapper" onClick={handleSelect}>
            <div className="user-item__name-wrapper">
                <Avatar image={user.image} name={user.fullName || user.id} size={32} />
                <p className="user-item__name">{user.fullName || user.id}</p>
            </div>
            {selected ? <InviteIcon /> :
            <div className="user-item__invite-empty" />}
        </div>
    )
}

const UserList = ({setSelectedUsers}) => {
    const { client } = useChatContext();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [listEmpty, setListEmpty] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
      const getUsers = async () => {
          if(loading) return;

          setLoading(true);

          try {
             const response = await client.queryUsers(
                { id : { $ne: client.userID } }, // exclude querying ID of the current user.
                {id: 1}, 
                {limit: 8} 
             );

             if(response.users.length){
                setUsers(response.users);
             } else {
                setListEmpty(true);
             }
          } catch (error) {
             setError(true);
          }
          setLoading(false);
      }
      if(client) getUsers(); // if there is a client (we're connected) call the getUsers function
    }, []);
    
    if(error) {
        return (
        <ListContainer>
            <div className="user-list__message">
                Error loading, please refresh and try one more time.
            </div>
        </ListContainer>
        )
    }

    if(listEmpty) {
        return (
        <ListContainer>
            <div className="user-list__message">
                Could not find any users.
            </div>
        </ListContainer>
        )
    }

    return (
        <ListContainer>
            {loading ? <div className="user-list__message">
                Loading users...
                </div> : (
                    users?.map((user, i) => (
                        <UserItem index={i} key={user.id} user={user} setSelectedUsers={setSelectedUsers}/>
                    ))
                )}
        </ListContainer>
    )
}

export default UserList;