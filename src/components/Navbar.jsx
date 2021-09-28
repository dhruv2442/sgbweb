import React from 'react'
import { Link,useHistory } from 'react-router-dom'
import logo from "../img/logo.png"
import { auth } from '../config/Config'
import { signOut } from '@firebase/auth'

const Navbar = ({user}) => {
    const history = useHistory();

    const handleLogout = () =>{
        signOut(auth).then(()=>{
            history.push("/login");
        })
    }
    return (
        <div className='navbar'>
            <div className='leftside'>
                <div className='logo'>
                    <img src={logo} alt="logo"/>
                </div>
            </div>
            <div className='rightside'>
            {!user && <>
                <div><Link className='navlink' to="signup">SIGN UP</Link></div>
                    <div><Link className='navlink' to="login">LOGIN</Link></div> 
            </>}
            {user&&<>
                    <div><Link className='navlink' to="/">{user}</Link></div>
                    <div><Link className='navlink' to="/">Home</Link></div>
                    <div><Link className='navlink' to="/all">All Products</Link></div>
                    <div><Link className='navlink' to="/sweets">Sweets</Link></div>
                    <div><Link className='navlink' to="/namkeen">Namkeen</Link></div>
                    <div className='cart-menu-btn'>
                        <Link className='navlink' to="/cart">
                        <i class="fas fa-shopping-cart"/>
                        </Link>
                        {/* <span className='cart-indicator'>{totalQty}</span> */}
                    </div>
                    <div className='btn btn-danger btn-md'
                    onClick={handleLogout}>LOGOUT</div>
                </>}                              
            </div>
        </div>
    )
}

export default Navbar
