import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { FaSearch, FaHome, FaUser, FaClipboardList } from 'react-icons/fa';

function NavBar() {
  const [userId,setUserId]=useState('')
  useEffect(()=>{
    setUserId(JSON.parse(sessionStorage.getItem('CurrentUser'))._id)
  },[])

  return (
    <div style={{margin:'0px',padding:'0px'}}>
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to={'/home'} className='text-decoration-none text-white'>
            <h4 className='fw-bold'>ProsperPitch.</h4>
          </Link>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link to="/home" className='nav-link'>
              <FaHome className="me-2" /> Home
            </Link>
            <Link to="/pitch" className='nav-link'>
              <FaClipboardList className="me-2" /> Pitch
            </Link>
            <Link to="/search" className='nav-link'>
              <FaSearch className="me-2" /> Search
            </Link>
            <Link to={`/Profile/${userId}`} className='nav-link'>
              <FaUser className="me-2" /> Profile
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default NavBar