import React from 'react'
import './Navbar.css'
import navlogo from '../../project/admin/src/assets/nav-logo.svg'
import navProfile from '../../project\admin\src\assets\nav-profile.svg'
const Navbar = () => {
    return (
        <div className = 'navbar'>
            <img src={navlogo} alt="" className='nav-logo' />
            <img src={navProfile} classname='nav-profile' alt="" />
            
        </div>
    )
}



export default Navbar