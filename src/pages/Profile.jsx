import React, { useState } from 'react'
import ProfileSavedModal from '../components/UserManagement/ProfileSavedModal'
import { useParams } from 'react-router-dom';

const Profile = () => {
  const [open, setOpen] = useState(false);
  const {userId} = useParams();
  return (
    <div>
      Profile Page user Id - {userId} 
    
      <ProfileSavedModal open={open} setOpenModal={setOpen} />
    </div>
  )
}

export default Profile