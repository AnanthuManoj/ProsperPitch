import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { getAllPostsApi } from '../services/allAPI'
import Feeds from './Feeds'
import './Home.css'
import NavBar from './NavBar'
import Posts from './Posts'
import SideProfile from './SideProfile'
import Suggestion from './Suggestion'
import { postDeleteContext, postUpdateContext } from '../contextShare/ProfileContext'



function Home() {
  const{isDeletePost,setIsDeletePost}=useContext(postDeleteContext)
  const{isUpdatePost,setIsUpdatePost}=useContext(postUpdateContext)

  const [posts,setPosts] = useState([])
  const [modalShow, setModalShow] = useState(false)
  
  const getAllPosts= async()=>{
     const result = await getAllPostsApi()
     setPosts(result.data)
  }
  
  useEffect(()=>{
    getAllPosts()
  },[isUpdatePost])

  

  return (
    <div >
        <NavBar/>
       <div className='container-lg'>
       <Row className='d-flex justify-content-center '>
          <Col className='d-none d-md-block mt-1 fixed-sidebar' sm={3} md={4} lg={3}>
          <SideProfile />
          </Col>
          <Col sm={12} md={6} className='scrollable-column'>
            <Posts  show={modalShow} onHide={() => setModalShow(false)}/>
           { posts&&
           posts.map((post)=>(
            <Feeds feedPost={post} context="userPosts"/>
           ))
           }
          </Col>
          <Col className='d-none d-lg-block mt-1 fixed-sidebar' sm={3}>
              <Suggestion/>   
            </Col>
        </Row>
       </div>
    </div>
  )
}

export default Home