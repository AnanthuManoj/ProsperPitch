import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ServerURL } from '../services/baseUrl'

function SideProfile() {
  const [userDetails,setUserDetails]=useState({})
  useEffect(()=>{
    setUserDetails(JSON.parse(sessionStorage.getItem('CurrentUser')))
  },[])

  return (
    <div>
     <div className='profile-section border rounded bg-light mt-3'>
   <div className='container'>
    <div className='d-flex justify-content-center flex-column align-items-center p-4'>
      
      <img src={userDetails.profile_pic?`${ServerURL}/upload/${userDetails.profile_pic}`:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFgwygkIBAbmTWG73mmB3A54s0UOWwqItsaA&usqp=CAU"} alt="profile" height={120} width={120} className='rounded-circle mb-3' style={{objectFit:'cover',objectPosition:'center'}}/>
      
      <div className="profile-info text-center">
        <h2 className='fw-bold mb-2 text-capitalize '>{userDetails.username}</h2>
        <p className='mb-4'>Update your profile</p>
      </div>
      
      <Link to={`/profile/${userDetails._id}`} className='btn btn-dark'>View Profile</Link>
    </div>
  </div>
</div> 
    </div>
  )
}

export default SideProfile