import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { addPostApi } from '../services/allAPI';
import { ServerURL } from '../services/baseUrl';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Pitch() {
    const [userName,setUsername]=useState('')
    const [imageUrl,setImageUrl] = useState('')
    const navigate = useNavigate()
    //state for storing values of the textarea and imageupload
    const [post,setPost] = useState({
      postContent:'',
      PostImage:'',
    })


   //to get the username from session storage
    useEffect(()=>{
      setUsername(JSON.parse(sessionStorage.getItem('CurrentUser')))
    },[])

   //to make url inorder to show a previw to users
    useEffect(()=>{
      post.PostImage&&setImageUrl(URL.createObjectURL(post.PostImage))
    },[post.PostImage])

    //function to add post
    const handleAdd = async()=>{

       const{postContent , PostImage} = post
       const username = userName.username

       if(postContent||PostImage){
        
          const reqBody = new FormData()
          reqBody.append('username',username)
          reqBody.append('postContent',postContent)
          imageUrl&&reqBody.append('postImage',PostImage)
   
          const token = sessionStorage.getItem('token')

          if(imageUrl){

            const reqHeader ={
              "Content-Type":"multipart/form-data",
              "Authorization":`Bearer ${token}`
            }

            const result = await addPostApi(reqBody,reqHeader)
            console.log(result);

            if(result.status==200){
              Swal.fire("Saved!", "", "success");
              console.log(result.data);
              navigate('/home')
            }else{
              Swal.fire(result.response.data);
            }

          }else{

            const reqHeader ={
              "Content-Type":"application/json",
              "Authorization":`Bearer ${token}`
            }
          
            const result = await addPostApi(reqBody,reqHeader)
            console.log(result);

            if(result.status==200){
              Swal.fire("Saved!", "", "success");
              console.log(result.data);
              navigate('/home')
            }else{
              Swal.fire(result.response.data);
            }

          }

       }else{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "you need to add something to post",
        });
       }
    }

  return (

      <>
            <NavBar /> 
          <div className='container'>
           <div className="card mx-auto mt-5 shadow " style={{ maxWidth: '600px' }}>
         <div className="card-body">
        <div className="d-flex flex-column  mb-3">
          <div className='d-flex align-items-center '>
              <img src={userName.profile_pic ? `${ServerURL}/upload/${userName.profile_pic}` : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFgwygkIBAbmTWG73mmB3A54s0UOWwqItsaA&usqp=CAU'}alt="profile"className="rounded-circle mb-3"
                width={100}
                height={100}
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
              <h4 className='ms-3 fw-bold text-capitalize '>{userName.username}</h4>
          </div>
          <div className="w-100">
            <Form>
              <Form.Group controlId="postText">
                <Form.Control
                  as="textarea"
                  placeholder="What's on your mind?"
                  rows={3}
                  value={post.postContent}
                  onChange={(e) => setPost({ ...post, postContent: e.target.value })}
                />
              </Form.Group>
            </Form>
          </div>
        </div>
        {imageUrl && (
          <div className="text-center mb-3">
            <img src={imageUrl} style={{ maxWidth: '100%', borderRadius: '8px', objectFit: 'cover' }}alt="Full Image"/>
          </div>
        )}
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <label htmlFor="imageInput" className="me-3">
            <i className="far fa-image" style={{ cursor: 'pointer' }}></i>
            </label>
          </div>
          <div className="d-flex">
            <label htmlFor="imageInput" className="me-3">
              <input
                type="file"
                id="imageInput"
                className="d-none"
                onChange={(e) => setPost({ ...post, PostImage: e.target.files[0] })}
              />
            </label>
            <button className="btn btn-dark" onClick={handleAdd}>
              Pitch
            </button>
          </div>
        </div>
      </div>
    </div>
    
    
         </div>
      </>
  )
}

export default Pitch