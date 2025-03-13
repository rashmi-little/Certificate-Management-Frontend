import React from 'react'
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const user = useSelector(state => state.login?.user);
  return (
    <div>
       {user &&
        <div>
            <p>Name: {user.firstName} {user.lastName}</p>
            <p>Email: {user.email} </p>
            <p>Role: {user.role} </p>
        </div>
      }
    </div>
  )
}

export default Dashboard