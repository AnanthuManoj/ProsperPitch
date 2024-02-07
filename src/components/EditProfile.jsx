import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import { editProfileApi } from '../services/allAPI'
import { ServerURL } from '../services/baseUrl'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function EditProfile() {

  const userDetails =  JSON.parse(sessionStorage.getItem('feedUser'))
  const [userPFP,setUserPFP] = useState("")
  const navigate = useNavigate()


  const [updateProfile,setUpdateProfile]=useState({
    username:userDetails.username,
    about:userDetails.about,
    title:userDetails.title,
    Phone:userDetails.Phone,
    profile_pic:userDetails.profile_pic
  })

  const [preview,setPreview]= useState('')

  const handelCancel=()=>{
    setUpdateProfile({
      username:userDetails.username,
      about:userDetails.about,
      title:userDetails.title,
      Phone:userDetails.Phone,
      profile_pic:userDetails.profile_pic
    })
  }
 useEffect(()=>{
  userPFP&&setPreview(URL.createObjectURL(userPFP))
 },[userPFP])

 const handleUpdate=async(e)=>{
  e.preventDefault()
  const{username,about,title,Phone,profile_pic}=updateProfile
  console.log(username,about,title,Phone,profile_pic);
  const reqbody = new FormData()
  reqbody.append('username',username)
  reqbody.append("about",about)
  reqbody.append("title",title)
  reqbody.append("Phone",Phone)
  preview?reqbody.append('profile_pic',userPFP):reqbody.append('profile_pic',updateProfile.profile_pic)
   
  const token = sessionStorage.getItem('token')
  if(preview){
    const reqHeader ={
      "Content-Type":"multipart/form-data",
      "Authorization":`Bearer ${token}`
    }

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await editProfileApi(reqbody,reqHeader)
        console.log(result);
        if(result.status==200){
          Swal.fire("Saved!", "", "success");
          sessionStorage.setItem("feedUser",JSON.stringify(result.data))
          sessionStorage.setItem("CurrentUser",JSON.stringify(result.data))
          navigate(`/profile/${result.data._id}`)
        }else{
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: 'failed to update',
          });
        }
        
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });

    
  }else{
    const reqHeader ={
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
    }
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await editProfileApi(reqbody,reqHeader)
        console.log(result);
        if(result.status==200){
          Swal.fire("Saved!", "", "success");
          sessionStorage.setItem("feedUser",JSON.stringify(result.data))
          sessionStorage.setItem("CurrentUser",JSON.stringify(result.data))
          navigate(`/profile/${result.data._id}`)
        }else{
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: 'failed to update',
          });
        }
        
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }

 }

 console.log(updateProfile);
 
  return (
   <>
      <NavBar/>
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-md-6">
            <div className="card shadow">
              <div className="card-header bg-dark text-white">
                <h2 className="mb-0">Edit Profile</h2>
              </div>
              <div className="card-body">

                <form onSubmit={handleUpdate}>
                  <div className="form-group text-center">
                    <label htmlFor="profilePicture" className="mb-4">

                      <img src={preview?preview:updateProfile.profile_pic?`${ServerURL}/upload/${updateProfile.profile_pic}`:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFgwygkIBAbmTWG73mmB3A54s0UOWwqItsaA&usqp=CAU"} width={200} height={200} alt="profileimage" className=" rounded-circle" style={{cursor:'pointer',objectFit:'cover',objectPosition:'center'}}/>
                      
                    </label>
                    <input type="file" id="profilePicture" name="profilePicture" className="form-control-file d-none"onChange={(e)=>setUserPFP(e.target.files[0])}/>
                  </div>

                  <div className="form-group mb-2 ">
                   
                    <input type="text" id="username" name="username" className="form-control text-capitalize "required placeholder='username'value={updateProfile.username} onChange={(e)=>setUpdateProfile({...updateProfile,username:e.target.value})}/>
                  </div>

                  <div className="form-group mb-2">
                    <textarea id="about" name="about"className="form-control"rows="3" placeholder='A short pitch about yourself'value={updateProfile.about} onChange={(e)=>setUpdateProfile({...updateProfile,about:e.target.value})}></textarea>
                  </div>

                  <div className="form-group mb-2">
                    <input type="text" id="title"name="title"className="form-control" placeholder='which title best suits you' value={updateProfile.title} onChange={(e)=>setUpdateProfile({...updateProfile,title:e.target.value})}/>
                  </div>

                  <div className="form-group mb-2">
                    <input type="text"id="Phone"name="Phone"className="form-control" placeholder='WhatsApp no' value={updateProfile.Phone} onChange={(e)=>setUpdateProfile({...updateProfile,Phone:e.target.value})}/>
                  </div>

                  <div>
                    <button type="submit" className="btn btn-dark">
                      Save Changes
                    </button>
                    <button type='button' className='btn btn-outline-dark ms-3' onClick={handelCancel}>
                      cancel
                    </button>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
   </>
  )
}

export default EditProfile