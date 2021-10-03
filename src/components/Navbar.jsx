import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../img/logo.png';
import { auth } from '../config/Config';
import { signOut } from '@firebase/auth';

const Navbar = ({ user,totalProducts }) => {
  const history = useHistory();

  const handleLogout = () => {
    signOut(auth).then(() => {
      history.push('/login');
    });
  };
  return (
    <div className='navbar'>
      <div className='leftside'>
        <div className='logo'>
          <img src={logo} alt='logo' className="img-fluid w-50" />
        </div>
      </div>
      <div className='rightside'>
        {!user && (
          <>
          <div>
              <Link className='navlink nav-hover' to='/'>
                Home
              </Link>
            </div>
            <div>
              <Link className='navlink nav-hover' to='/all'>
                All Products
              </Link>
            </div>
            <div>
              <Link className='navlink nav-hover' to='/sweets'>
                Sweets
              </Link>
            </div>
            <div>
              <Link className='navlink nav-hover' to='/namkeen'>
                Namkeen
              </Link>
            </div>
            <div>
              <Link className='navlink' to='signup'>
                SIGN UP
              </Link>
            </div>
            <div>
              <Link className='navlink' to='login'>
                LOGIN
              </Link>
            </div>
          </>
        )}
        {user && (
          <>
            <div>
              <Link className='navlink nav-hover' to='/'>
                {user}
              </Link>
            </div>
            <div>
              <Link className='navlink nav-hover' to='/'>
                Home
              </Link>
            </div>
            <div>
              <Link className='navlink nav-hover' to='/all'>
                All Products
              </Link>
            </div>
            <div>
              <Link className='navlink nav-hover' to='/sweets'>
                Sweets
              </Link>
            </div>
            <div>
              <Link className='navlink nav-hover' to='/namkeen'>
                Namkeen
              </Link>
            </div>
            <div>
              <Link className='navlink nav-hover' to='/about'>
                About Us
              </Link>
            </div>
            <div className=' cart-menu-btn btn btn-primary btn-md position-relative text-white'>
              <Link className='navlink text-white' to='/cart'>
                <i class='fas fa-shopping-cart' /> Cart <span class="badge bg-light text-dark">{totalProducts}</span>
              </Link>
            </div>
            <div className='btn btn-danger btn-md' onClick={handleLogout}>
              LOGOUT
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
