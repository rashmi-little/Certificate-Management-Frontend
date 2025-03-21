import React from 'react'
import { useSelector } from 'react-redux';

const User = () => {
    const user = useSelector(store => store.login?.user);
    return (
        <div>
            Welcome {user.firstName} {user.lastName} !
        </div>
    )
}

export default User