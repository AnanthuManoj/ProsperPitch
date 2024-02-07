import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import { searchUsersApi } from '../services/allAPI';
import { ServerURL } from '../services/baseUrl';
import { Link } from 'react-router-dom';

function Search() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  const getUsers = async () => {
    try {
      const result = await searchUsersApi(search);
      if (result.status === 200) {
        setUsers(result.data);
      } else {
        console.log(result);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getUsers();
  },[search]);

  return (
    <div>
      <NavBar />
      <div className="container mt-4">
        <div className="d-flex justify-content-center flex-column align-items-center ">
          <input
            type="text"
            className="form-control"
            style={{ maxWidth: '700px', width: '100%' }}
            placeholder="Search users..."
            onChange={(e) => setSearch(e.target.value)}
          />

          {search &&
            users.map((user) => (
              <div className="card mt-4 d-flex flex-row justify-content-center align-items-center  p-3" style={{ maxWidth: '400px', width: '100%' }} key={user.id}>
                   <Link to={`/profile/${user._id}`}> <img src={user.profile_pic?`${ServerURL}/upload/${user.profile_pic}`:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFgwygkIBAbmTWG73mmB3A54s0UOWwqItsaA&usqp=CAU'} alt='profile' className='rounded-circle me-2' width={100} height={100} style={{objectFit:'cover',objectPosition:'center'}}/></Link>
                <div className="card-body text-center">
                  <h5 className="card-title"><Link to={`/profile/${user._id}`} className='text-decoration-none text-capitalize fw-bold text-dark'>{user.username}</Link></h5>
                  <p className="card-text text-muted ">{user.title}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Search;
