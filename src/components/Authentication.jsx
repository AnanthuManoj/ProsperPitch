import React, { useContext, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import logo from '../assets/logowobg.png';
import { loginUserApi, userRegisterApi } from '../services/allAPI';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ProfileViewContext } from '../contextShare/ProfileContext';

function Authentication({isregister}) {
    const register = isregister?true:false
    const{isLogOUt,setIsLogOut}=useContext(ProfileViewContext)

    const [isUsername,setIsUserName]=useState('')
    const [isEmail,setIsEmail]=useState('')
    const [isPassword,setIsPassword]=useState('')
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()

    const [userDetails,setUserDetails]=useState({
      username:"",
      email:"",
      password:""
    })

    const validateInput = (username, email, password) => {
      const isUsernameValid = username.match(/^[A-Za-z]{3,}$/);
      const isEmailValid = email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
      const isPasswordValid = password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/);
  
      return {
          isUsernameValid,
          isEmailValid,
          isPasswordValid
      };
  }

    const handleRegister = async() => {
      const { username, email, password } = userDetails;

    if (username && email && password) {
        const { isUsernameValid, isEmailValid, isPasswordValid } = validateInput(username, email, password);

        if (isUsernameValid && isEmailValid && isPasswordValid) {
          const res = await userRegisterApi(userDetails)
          console.log(res);
          if(res.status==200){
            Swal.fire({
              title: "success!",
              text: "You have successfully registered!",
              icon: "success",
              showConfirmButton: false,
              timer: 1500
            });
        
            setIsUserName('')
            setIsEmail('')
            setIsPassword('')
            setUserDetails({
              username:"",
              email:"",
              password:""
            })

            navigate('/')
            
          }else{
            Swal.fire({
              title: "oops",
              text: `${res.response.data}`,
              icon: "error",
            });
        
          }
        
        } else{
        
          if (!isUsernameValid) {
            setIsUserName( 'Username must have at least 3 letters and consist only of alphabets.');
          }
          if (!isEmailValid) {
            setIsEmail('Invalid email address.')
          }
          if (!isPasswordValid) {
            setIsPassword('Invalid password. It must contain at least 1 letter, 1 digit, and  at least 8 characters long.');
          }
        }

      } else {
          Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Please fill all the fields",
          });
      }
  }

  const handleLogin = async ()=>{
    const { email, password } = userDetails;

    if ( email && password) {
        const { isEmailValid, isPasswordValid } = validateInput('', email, password);

        if ( isEmailValid && isPasswordValid) {
          const res = await loginUserApi(userDetails)
          console.log(res);
          if(res.status==200){
              sessionStorage.setItem("token",res.data.token)
              sessionStorage.setItem("CurrentUser",JSON.stringify(res.data.Login))
              setIsLogOut(true)
              setIsEmail('')
              setIsPassword('')
              setUserDetails({
              username:"",
              email:"",
              password:""
            })
            navigate('/home')
          }else{
              Swal.fire({
                title: "oops",
                text: `${res.response.data}`,
                icon: "error",
              });
            
            }
        } else{
          if (!isEmailValid) {
            setIsEmail('Invalid email address.')
          }
          if (!isPasswordValid) {
            setIsPassword('Invalid password.');
          }
        }

      } else {
          Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Please fill all the fields",
          });
      }
  }
  
  return (
    <div>
         <div  style={{height:'100vh'}} className='d-flex align-items-center justify-content-center '>
           <Row className='container'>
            <Col className='d-flex align-items-center d-none d-md-block '>
             <div className='text-center' style={{marginTop:'6rem'}}>
              <img src={logo} alt="no image" width={'250px'} />
              <p className='lead fw-bold mt-3'>Welcome to ProsperPitch, where your ideas find a home to connect, thrive, and prosper.</p>
             </div>
            </Col>
            <Col>
             
                 
            <div className=' p-4 rounded shadow-lg'>
                <div className='text-center d-md-none d-block mb-5'>
                  <img src={logo} alt="noimage" width={'200px'} />
                </div>
            <div className='text-center mt-3'> 
                {register? <div>
                   <h3 className='fw-bold'>Sign up</h3>  
                 </div>:
                  <div className='d-flex justify-content-between'>
                   <h3 className='fw-bold'>Login</h3>  <span>or <Link className='text-decoration-none' to={'/register'}>create account</Link></span>
                   </div>}
                  <p className='lead'>Unlocking Doors to Innovation</p>
                  </div>
                  {register&&
                  <FloatingLabel controlId="floatingInput1" label="UserName" className="mb-3">
                  <Form.Control type="text" placeholder="UserName" value={userDetails.username} onChange={(e)=>setUserDetails({...userDetails,username:e.target.value})}/>
                  <span style={{ color: 'red' }}>{isUsername}</span>
                  </FloatingLabel>
                 }
                  <FloatingLabel controlId="floatingInput2" label="Email address" className="mb-3">
              <Form.Control type="email" placeholder="name@example.com" value={userDetails.email} onChange={(e)=>setUserDetails({...userDetails,email:e.target.value})}/>
              <span style={{ color: 'red' }}>{isEmail}</span>
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3 position-relative">
              <Form.Control type={showPassword ? 'text' : 'password'}  placeholder="Password" value={userDetails.password} onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}/>
              <span className="password-toggle-icon position-absolute top-50 end-0 translate-middle-y me-3 " onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              <span style={{ color: 'red' }}>{isPassword}</span>
            </FloatingLabel>

         
            {!register?
                <button className='mt-3 btn btn-dark' onClick={handleLogin}>
                  Login
                </button>
              :
              <button className='mt-3 btn btn-dark' onClick={handleRegister}>
              Sign up
             </button>}
             {register&&
             <p className='mt-3 '>Already a user?<Link to={'/'} className='text-decoration-none' >Login</Link></p>
              // : <p className='mt-3 '><Link to={'/forgotpass'} className='text-decoration-none' >Forgot Password ?</Link></p>
              }
            </div>

              
            </Col>
           </Row>
        </div>
    </div>
  )
}

export default Authentication