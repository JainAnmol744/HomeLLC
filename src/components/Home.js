import React from 'react';
import './Style.css';
import { BsSearch } from 'react-icons/bs';
import { FaUserAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Home = ({ user }) => {
  const  firstName = user.authtoken;
  // const lastName = user.lname;
  const username = firstName;
const history = useNavigate();

const handleclick = ()=>{
    // localStorage.removeItem()
    history("/");
}

  return (
    <div className='home-container'>
      <div className='sidebar'>
        <div className='sidebar-items'>
          <p className='sidebar-items-header'>Insights on real estate</p>
          <div className='sidebar-links'>
            <p className='sidebar-items-link'>National Insights</p>
            <p className='sidebar-items-link'>Local Insights</p>
          </div>
        </div>
      </div>
      <div className='main-content'>
        <div className='navbar'>
          <div className='search-items'>
            <input className='search-bar' placeholder='Search' />
            <button className='search-icon'>
              <BsSearch style={{ fontSize: '18px', color: 'white' }} />
            </button>
          </div>
          <div className='user-items'>
            <span className='username'>
              <FaUserAlt
                style={{
                  fontSize: '20px',
                  color: 'black',
                  marginRight: '10px',
                }}
              />
              {username}
            </span>
            <button className='logout-button' onClick={handleclick}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
