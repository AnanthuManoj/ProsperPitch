import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { GrContact } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { postDeleteContext, postUpdateContext } from '../contextShare/ProfileContext';
import { deletePostApi, getAllLikedPostApi, getUserDetailsApi, likePostApi, removeLikedPostApi } from '../services/allAPI';
import { ServerURL } from '../services/baseUrl';


function Feeds({feedPost,context}) {

  const{isUpdatePost,setIsUpdatePost}=useContext(postUpdateContext)

    const [isInterestBtn,setIsInterestBtn]=useState(0)
    const [time,setTime] = useState('')
    const [userPfp,setUserPfp]=useState({})
    const [interestData,setInterestData]=useState({})
    const [likeValue,setLikeValue]=useState({})
    const{isDeletePost,setIsDeletePost}=useContext(postDeleteContext)

    const getTime = ()=>{
        const timeStamp = feedPost.postTimeCre
        const relTime = moment(timeStamp).fromNow();
        setTime(relTime);

    }
    const setPfp = async()=>{
     const result = await getUserDetailsApi()
     const user = result.data.find((item)=>item._id == feedPost.userId)
     setUserPfp(user) 
    }

    useEffect(()=>{
        getTime()
        setPfp()
        const likeduser = JSON.parse(sessionStorage.getItem('CurrentUser'))._id
        setInterestData({
        userId:feedPost.userId,
        userName:feedPost.userName,
        postContent:feedPost.postContent?feedPost.postContent:'',
        postImage:feedPost.postImage?feedPost.postImage:'',
        postTimeCre:feedPost.postTimeCre,
        PostId:feedPost._id,
        LikedUser:likeduser,
        })
    },[feedPost , context ,isInterestBtn])

  

    const handleInterest= async()=>{
   
      try{
       const result = await likePostApi(interestData)
        if(result.status==200){
          Swal.fire({
            text: "Your interest has been marked",
            icon: "success",
            showConfirmButton: false,
            timer: 2000
          });
        }
      }catch(error){
      console.log(error);
      }
    }
    
    const handleRemoveInterest = async () => {
      const LikedUser = JSON.parse(sessionStorage.getItem('CurrentUser'))._id;
    
      
      const postId = (context === "likedPosts") ? feedPost?.PostId : feedPost?._id;
    
      if (postId) {
        try {
          const result = await removeLikedPostApi({ LikedUser, postId });
          setIsUpdatePost((prevCounter) => prevCounter + 1)
          if(result.status==200){
            Swal.fire({
              text: "Your interest has been removed",
              icon: "success",
              showConfirmButton: false,
              timer: 2000
            });
          }
        } catch (error) {
          console.error('Error removing like:', error);
        }
      } else {
        console.warn('postId is undefined or null');
      }
    };
    

  

    const handleDelete = async()=>{
        const postId = feedPost._id
        const userId = JSON.parse(sessionStorage.getItem('CurrentUser'))._id
        if(feedPost.userId==userId){
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: "btn btn-outline-dark",
                  cancelButton: "btn btn-dark"
                },
                buttonsStyling: false
              });
              swalWithBootstrapButtons.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel!",
                reverseButtons: true
              }).then(async (result) => {
                if (result.isConfirmed) {
                   await deletePostApi(postId)
                   setIsDeletePost(true)
                  swalWithBootstrapButtons.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                  });
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                  swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Your file is safe :)",
                    icon: "error"
                  });
                }
              });
        }else{
            Swal.fire({
                title: "oops!",
                text: "You don't have permission to perform this action",
                icon: "warning"
              });
        }
        
    }
    

  return (

    <div className='p-3 d-flex justify-content-center'>
    <div className='bg-light p-3 rounded shadow container'>
        <div className='d-flex flex-column'>

            <div className='d-flex align-items-center mb-3'>

               <Link to={`/profile/${feedPost.userId}`}> <img src={userPfp.profile_pic?`${ServerURL}/upload/${userPfp.profile_pic}`:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFgwygkIBAbmTWG73mmB3A54s0UOWwqItsaA&usqp=CAU"} alt="profile" className='rounded-circle' width={50} height={50}  style={{objectFit:'cover',objectPosition:'center'}}/></Link>

              <div className='d-flex justify-content-between' style={{width:'100%'}}>
                    <div className='ms-3'>
                        <h4 className='fw-bold mb-0'><Link to={`/profile/${feedPost.userId}`} className='text-decoration-none text-dark text-capitalize '>{userPfp.username}</Link></h4>
                        <span className='text-muted' style={{ fontSize: '12px' }}>{time}</span>
                    </div>
                     <div>
                     <button className='btn' onClick={handleDelete}><MdDelete/></button>
                     </div>
              </div>
            </div>
            
            <p className="mb-3">
                {feedPost.postContent}
            </p>
            <div style={{ maxHeight: '600px', overflow: 'hidden' }}>
                {feedPost.postImage&&<img src={`${ServerURL}/upload/${feedPost.postImage}`} style={{ objectFit: 'cover', width: '100%', height: '100%'}} />}
            </div>
            <div className='d-flex justify-content-between mt-2 '>
                <div>
                    <button className='btn btn-light  me-2' onClick={handleInterest}>
                     <i class="fa-solid fa-thumbs-up"></i>
                    </button>
                    <button className='btn me-2 btn-light' onClick={handleRemoveInterest}>
                    <i class="fa-solid fa-thumbs-down"></i>
                    </button>
                </div>
                <div>
                    <button className='btn btn-light 'onClick={() => window.location.href = `mailto:${userPfp.email||''}`}>
                    <GrContact/>
                    </button>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Feeds