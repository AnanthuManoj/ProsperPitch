import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ProfileViewContext, postUpdateContext } from '../contextShare/ProfileContext'
import { getAllLikedPostApi, getAllPostsApi, getUserDetailsApi } from '../services/allAPI'
import { ServerURL } from '../services/baseUrl'
import Feeds from './Feeds'
import NavBar from './NavBar'

function Profile() {
   const [isPost,setIsPost]=useState(true)
   const [isInterest,setIsInterest]=useState(false)
   const [profile,setProfile]=useState({})
   const [profileUser,setProfileUser]=useState(false)
   const [userPost,setUserPost]= useState([])
   const [userLikes,setUserLikes]=useState([])
   const{isLogOUt,setIsLogOut}=useContext(ProfileViewContext)
   const{isUpdatePost,setIsUpdatePost}=useContext(postUpdateContext)

   const {id}=useParams()
   const navigate = useNavigate()
  
   const handlePost=()=>{
    setIsPost(true)
    setIsInterest(false)
   }
   const handleInterest=()=>{
    setIsPost(false)
    setIsInterest(true)
   }
   const setUserProfile = () => {
    setProfile(JSON.parse(sessionStorage.getItem('feedUser')));
  };
 
   const getallUsers = async() =>{
    const result = await getUserDetailsApi()
    // console.log(result.data);
    const user = result.data.find((item)=>item._id == id)
      // console.log(user);
      sessionStorage.setItem("feedUser",JSON.stringify(user))
      setUserProfile()
   }

   const checkProfileUser=()=>{
    const userId = JSON.parse(sessionStorage.getItem("CurrentUser"))._id
    if(id==userId){
      setProfileUser(true)
    }else{
      setProfileUser(false)
    }
   }

   const getAllPosts=async()=>{
    const result = await getAllPostsApi()
    // console.log(result);
    const post = result.data.filter((item)=>item.userId == id)
    setUserPost(post)
   }

   useEffect(()=>{
    getallUsers()
    checkProfileUser()
    getAllPosts()
    getAllLikedPost()
  },[id,isUpdatePost])

  const handleLogOut = ()=>{
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('CurrentUser')
    sessionStorage.removeItem('feedUser')
    setIsLogOut(false)
    navigate('/')
  }

  const getAllLikedPost = async()=>{
    const result = await getAllLikedPostApi()
    // console.log(result);
    const likes = result.data.filter((item)=>item.LikedUser == id)
    setUserLikes(likes)
  }


 
  
    return (
    <div>
        <NavBar/>

      <div className='container-fluid mt-3'>
      <div className='row'>
        <div className='col-lg-8 mx-auto'>
          <div className='profile-info bg-light p-4 rounded'>
            <div className='d-flex flex-column flex-md-row align-items-md-center'>
              <div className='profile-image mb-4 mb-md-0 me-md-4'>
                <img
                  src={profile.profile_pic?`${ServerURL}/upload/${profile.profile_pic}`:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFgwygkIBAbmTWG73mmB3A54s0UOWwqItsaA&usqp=CAU"}
                  alt="profile"
                  className='rounded-circle'
                  style={{ width: '150px', height: '150px',objectFit:'cover',objectPosition:'center' }}
                />
              </div>
              <div className='flex-grow-1'>
                <h2 className='mb-1 text-capitalize fw-bold'>{profile.username}</h2>
            <p className='text-muted mb-2'>{profile.title?profile.title:'professional title'}</p>
                {profileUser&&<div className='d-block  d-sm-flex '>
                  <Link to={`/Profile/edit/${id}`}><button className='btn btn-dark me-2' >Edit Profile</button></Link>
                  <Link to={'/pitch'}><button className='btn btn-dark'>Pitch</button></Link>
                  <button className='btn ms-2 btn-dark'onClick={handleLogOut}>logout</button>
                </div>}
              </div>
            </div>

            <div className='mt-4'>

           {profile.about&&<div>
                <h5>About Me</h5>
                <p className='mb-3'>{profile.about?profile.about:'a short pitch about yourself'}</p>
              </div>}

              <div>
                <h5>Contact Information</h5>
                {profile.Phone&&<p className='mb-1'><strong>WhatsApp:</strong> <a target='_blank' href={`https://wa.me/+91${profile.Phone}`} className='text-decoration-none '>{profile.Phone? profile.Phone: 'add your phone no'}</a></p>}
                <p><strong>Email:</strong> {profile.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
       </div>

        <div className='d-flex justify-content-center mt-3  ' style={{cursor:'pointer'}}>
            <span  className={isPost?`border-bottom border-dark border-3  me-2`:`me-2 `} onClick={handlePost}>posts</span>
            
            <span className={isInterest?`border-bottom border-dark border-3 ms-2 `:` ms-2`} onClick={handleInterest}>Interests</span>
        </div>
       <hr />
       <div>
              <div className='container'>
                 { isPost?
                 <div className='d-flex justify-content-center '>
                   <div style={{ maxWidth: '700px' ,width:'100%'}}>
                      {userPost.length>0&&
                      userPost.map((item)=>(
                      <div>
                      <Feeds feedPost={item} context="userPosts"/> 
                      </div>
                      ))
                      }
                     
                    </div>
                 </div>:
                <div className='d-flex justify-content-center '>
                <div style={{ maxWidth: '700px' ,width:'100%'}}>
                   {userLikes.length>0&&
                   userLikes.map((item)=>(
                   <div>
                   <Feeds feedPost={item} context="likedPosts"/> 
                   </div>
                   ))
                   }
                  
                 </div>
              </div>
                  }
              </div>
       </div>

    </div>
  )
}

export default Profile