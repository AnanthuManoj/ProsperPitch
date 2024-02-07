import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Authentication from './components/Authentication';
import EditProfile from './components/EditProfile';
import Home from './components/Home';
import PageNotFound from './components/PageNotFound';
import Pitch from './components/Pitch';
import Profile from './components/Profile';
import Search from './components/Search';
import { ProfileViewContext } from './contextShare/ProfileContext';

function App() {
  const{isLogOUt,setIsLogOut}=useContext(ProfileViewContext)
  return (
    <div className="App">
    
        <Routes> 
         <Route path='/' element={<Authentication/>}/> 
         <Route path='/pitch' element={isLogOUt?<Pitch/>:<Navigate to={'/'}/>}/> 
         <Route path='/home' element={isLogOUt?<Home/>:<Navigate to={'/'}/>}/>
         <Route path='/search' element={isLogOUt?<Search/>:<Navigate to={'/'}/>}/>
         <Route path='/register' element={<Authentication isregister/>}/>
         <Route path='/Profile/:id' element={isLogOUt?<Profile/>:<Navigate to={'/'}/>}/>
         <Route path='/Profile/edit/:id' element={isLogOUt?<EditProfile/>:<Navigate to={'/'}/>}/>
         <Route path='*' element={<PageNotFound/>}/>
        </Routes>
        
    </div>
  );
}

export default App;
