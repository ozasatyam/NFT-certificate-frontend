import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/UserContext';

const Header = () => {
  const {user, logOut} = useContext(AuthContext);
  console.log('context', user);
  const handleSignOut = () =>{
    logOut()
    .then(() =>{})
    .catch(error => console.error(error));
  }
    return (
      <div className="navbar bg-primary text-primary-content w-full justify-between">
        <div className=''>
          <Link to='/' className="btn btn-ghost normal-case text-xl">Awesome Auth</Link>
          <Link className="btn btn-ghost normal-case text-xl" to='/'>Home</Link>
          <Link className="btn btn-ghost normal-case text-xl" to='/orders'>Orders</Link>
        </div>
        {/* <Link className="btn btn-ghost normal-case text-xl" to='login'>Login</Link> */}
        <div className=''>
          <Link to='register'><button className={`${!user ? 'btn btn-sm m-3' : 'hidden'}`}>Register</button></Link>
          {user?.email && <span className='pr-5'>Welcome, {user.email}</span>}
        {
          user?.email ?  <button onClick={handleSignOut} className={`btn btn-sm`}>Log Out</button> : <Link to='/login'>
            <button className="btn btn-sm">Login</button>
          </Link>
        }
        </div>
      </div>
    );
};

export default Header;