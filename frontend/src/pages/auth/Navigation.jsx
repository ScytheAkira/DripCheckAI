// import React from 'react'

import { useState } from "react";
import {AiOutlineHome,
        AiOutlineShopping,
        AiOutlineShoppingCart,
        AiOutlineLogin,
        AiOutlineUserAdd,
        AiOutlineUser
} from 'react-icons/ai';
import {FaHeart} from 'react-icons/fa';
import {Link, useNavigate} from "react-router-dom";
import "./Navigation.css"
import { useSelector, useDispatch} from "react-redux";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";



const navigation = () => {
  
  const {userInfo} = useSelector(state => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [ShowSidebar, setShowSidebar ] = useState(false);

  const toggleDropdown = () => {
      setDropdownOpen(!dropdownOpen);
  }
  const toggleSidebar = () => {
      setShowSidebar(!ShowSidebar);
  }
  const closeSidebar = () => {
      setShowSidebar(false);
  }
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {logoutApiCall} = useLoginMutation();
  const logoutHandle = async() =>{
    try{
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");

    }catch(error){
      console.error(error);
    }
  }
  return (
   
    <div style={{zIndex: 999}} 
    className={`${ShowSidebar ? "hidden" : "flex"} xl:flex lg:flex md: hiddem sm:hidden flex-col justify-between text-primary-content bg-primary w-[4%] hover:w-[15%] pl-3 h-[100vh] fixed
    `} id= "navigation-container">
      
      <div className="flex flex-col justify-center space-y-4">
        {/* home */}
        <Link to='/' className="flex items-center transition-transform  transform hover:translate-x-2">
          <AiOutlineHome className="mr-2 mt-[3rem] text-accent" size={26}/>
          <span className="hidden nav-item-name mt-[3rem] ml-3">HOME</span> {" "}
        </Link>

        {/* shop */}
        <Link to='/shop' className="flex items-center transition-transform  transform hover:translate-x-2">
          <AiOutlineShopping className="mr-2 mt-[3rem] text-accent" size={26}/>
          <span className="hidden nav-item-name mt-[3rem] ml-3">SHOP</span> {" "}
        </Link>
        
        {/* fav */}
        <Link to='/favourite' className="flex items-center transition-transform  transform hover:translate-x-2">
          <FaHeart className="mr-2 mt-[3rem] text-accent" size={26}/>
          <span className="hidden nav-item-name mt-[3rem] ml-3">FAVOURITES</span> {" "}
        </Link>

        
      </div>

      <div className="relative">

        <button onClick = {toggleDropdown} className="flex items-center text-primary-content focus:outline-none">
          {userInfo ? (<span className = "text-primary-content">{userInfo.username}</span>): (<></>)}
        </button>

      </div>
        {/* login,signup */}
        <ul className="mb-4">
            {/* login */}
            <li>
                <Link to='/login' className="flex items-center transition-transform  transform hover:translate-x-2">
                <AiOutlineLogin className="mr-2 mt-[3rem] text-accent" size={26}/>
                <span className="hidden nav-item-name mt-[3rem] ml-3">LOGIN</span> {" "}
                </Link>
            </li>
            {/* signin */}
            <li>
                <Link to='/register' className="flex items-center transition-transform  transform hover:translate-x-2">
                <AiOutlineUserAdd className="mr-2 mt-[3rem] text-accent" size={26}/>
                <span className="hidden nav-item-name mt-[3rem] ml-3">SIGNUP</span> {" "}
                </Link>
            </li>

          </ul>
    
    
    </div>
  )
}

export default navigation