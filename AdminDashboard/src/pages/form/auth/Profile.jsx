import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ArtistProfile } from '../../../store/authSlice';

const Profile = () => {
    const dispatch=useDispatch();
    const {profile}=useSelector((state)=>state.auth)
    useEffect(()=>{
        dispatch(ArtistProfile());
    },[])
    console.log(profile)

  return (
    <>
     <h1>{profile?.username}</h1>
     <h2>{profile?.email}</h2>

    </>
  )
}

export default Profile
