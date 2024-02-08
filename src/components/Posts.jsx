import React, { useContext, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Modal from 'react-bootstrap/Modal';
import { addPostApi } from '../services/allAPI';
import { ServerURL } from '../services/baseUrl';
import { postUpdateContext } from '../contextShare/ProfileContext';
import Swal from 'sweetalert2';

function Posts() {

  //state to manage modal
    const [show, setShow] = useState(false);
    const [open, setOpen] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //states for other purposes
    const [userName,setUsername]=useState('')
    const [imageUrl,setImageUrl] = useState('')

    const{isUpdatePost,setIsUpdatePost}=useContext(postUpdateContext)

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
              Swal.fire({
                title: "Success",
                text: "Post added successfully",
                icon: "success",
                showConfirmButton: false,
                timer: 2000
              });
              console.log(result.data);
              setIsUpdatePost(true)
              handleClose()
            }else{
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: result.response.data,
              });
            }

          }else{

            const reqHeader ={
              "Content-Type":"application/json",
              "Authorization":`Bearer ${token}`
            }
            const result = await addPostApi(reqBody,reqHeader)
            console.log(result);

            if(result.status==200){
              Swal.fire({
                title: "Success",
                text: "Post added successfully",
                icon: "success",
                showConfirmButton: false,
               timer: 2000
              });
              console.log(result.data);
              setIsUpdatePost(true)
              handleClose()
            }else{
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: result.response.data,
              });
              
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
    <div>
         <div className='p-3 d-flex justify-content-center post-div'>
            <div className='bg-light p-3 rounded shadow container'>
                <div className='d-flex align-items-start'>
                    <img src={userName.profile_pic?`${ServerURL}/upload/${userName.profile_pic}`:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFgwygkIBAbmTWG73mmB3A54s0UOWwqItsaA&usqp=CAU'} alt='profile' className='rounded-circle me-2' width={50} height={50} style={{objectFit:'cover',objectPosition:'center'}}/>
                    <div className='flex-grow-1'>
                    <div className='rounded border p-2'style={{ minHeight: '100px' }}onClick={handleShow}>
                    What are you thinking about?
                    </div>
                </div>
                </div>
                <div className='d-flex justify-content-between mt-3'>
                    <div className='d-flex align-items-center'>
                        <label htmlFor='imageInput' className='me-2'>
                            <i className='far fa-image'></i>
                        </label>
                    </div>
                    <button className='btn btn-dark' onClick={handleShow}>Pitch</button>
                </div>
            </div>
         </div>

      <Modal show={show} onHide={handleClose} centered>

      <Modal.Header closeButton>
        <Modal.Title>Create a Post</Modal.Title>
      </Modal.Header>

      <Modal.Body>

        <div className="d-flex align-items-center">
          <img src={userName.profile_pic?`${ServerURL}/upload/${userName.profile_pic}`:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFgwygkIBAbmTWG73mmB3A54s0UOWwqItsaA&usqp=CAU"} alt="profile"className="rounded-circle me-2"width={40}height={40} style={{objectFit:'cover',objectPosition:'center'}}/>
          <div>
            <h5 className="fw-bold mb-0 text-capitalize 
            ">{userName.username}</h5>
          </div>
        </div>

        <Form className="mt-3">

          <Form.Group controlId="postText">
            <Form.Control as="textarea" placeholder="What's occupying your thoughts?" rows={3} onChange={(e)=>setPost({...post,postContent:e.target.value})}/>
          </Form.Group>

          <div className='d-flex justify-content-center  p-3  mt-2 '>

          <label htmlFor='imageInput' className='me-2'>

          <Collapse in={open} style={{overflowY:'scroll'}}>
          <div id="example-collapse-text">
            
          { !imageUrl? <div className='text-center'>
            <i className="fa-solid fa-file-arrow-up fa-xl"></i>
              <h5>Upload image</h5>
            </div>
           :
          <img src={imageUrl} style={{ maxWidth: '100%', maxHeight: '100%', margin: 'auto', display: 'block' }}alt="Full Image"/>
          }
         </div>
         </Collapse>

          </label>

         <input type='file'id='imageInput'className='d-none' onChange={(e)=>setPost({...post,PostImage:e.target.files[0]})}/>
        </div>
          <button className='btn' type='button' onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}><i className='far fa-image ' style={{cursor:'pointer'}}></i></button>

        </Form>

        <div className="text-end mt-3">
          <Button variant="dark" onClick={handleAdd}>
            Pitch
          </Button>
        </div>
      </Modal.Body>

      </Modal>
    </div>
  )
}

export default Posts