import React, { useState } from 'react';
import { AiOutlineHome, AiOutlineShopping, AiOutlineShoppingCart, AiOutlineLogin, AiOutlineUserAdd } from 'react-icons/ai';
import { FaHeart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../../redux/api/usersApiSlice';
import { logout } from '../../redux/features/auth/authSlice';
import FavoritesCount from '../Products/FavoritesCount';
import "./Navigation.css";

const Navigation = () => {
  const { userInfo } = useSelector(state => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const closeSidebar = () => {
    setShowSidebar(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ zIndex: 999 }} className={`${showSidebar ? "hidden" : "hidden md:flex"} xl:flex lg:flex md:hidden sm:hidden flex-col justify-between text-primary-content bg-[#171718] w-[4%] hover:w-[15%] pl-3 h-[100vh] fixed shadow-accent-glow`} id="navigation-container">
      <div className="flex flex-col justify-center space-y-4">
        {/* Logo */}
        <Link to='/' className="flex transition-transform transform hover:translate-x-2 mt-2">
          <span className="mr-2 mt-[3rem] text-3xl text-secondary font-bold">
            💧
          </span>
          <span className="hidden nav-item-name mt-[3rem] ml-3">DRIPCHECK</span>
        </Link>
        {/* Home */}
        <Link to='/' className="flex items-center transition-transform transform hover:translate-x-2">
          <AiOutlineHome className="mr-2 mt-[3rem] text-secondary hover:text-accent" size={26} />
          <span className="hidden nav-item-name mt-[3rem] ml-3">HOME</span>
        </Link>

        {/* Shop */}
        <Link to='/shop' className="flex items-center transition-transform transform hover:translate-x-2">
          <AiOutlineShopping className="mr-2 mt-[3rem] text-secondary hover:text-accent" size={26} />
          <span className="hidden nav-item-name mt-[3rem] ml-3">SHOP</span>
        </Link>

        {/* Favorites */}
        <Link to='/favourite' className="flex items-center transition-transform transform hover:translate-x-2">
          <FaHeart className="mr-2 mt-[3rem] text-secondary hover:text-accent" size={26} />
          <span className="hidden nav-item-name mt-[3rem] ml-3">FAVOURITES</span>
          <FavoritesCount />
        </Link>
      </div>

      <div className="relative">
        <button onClick={toggleDropdown} className="flex items-center text-primary-content focus:outline-none">
          {userInfo ? (<span className="text-primary-content mb-4">{userInfo.username}</span>) : (<></>)}
          {userInfo && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1 ${dropdownOpen ? "transform rotate-180" : ""} mb-4`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="#94F3E4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          )}
        </button>
        {dropdownOpen && userInfo && (
          <ul className={`absolute right-0 mt-2 mr-14 space-y-2 bg-neutral text-primary-content rounded ${!userInfo.isAdmin ? "-top-20" : "-top-80"}`}>
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link to="/admin/blog" className="block px-4 py-2 hover:bg-secondary">
                    Admin Blog
                  </Link>
                </li>
                <li>
                  <Link to="/admin/productlist" className="block px-4 py-2 hover:bg-secondary">
                    Products
                  </Link>
                </li>
                <li>
                  <Link to="/admin/categorylist" className="block px-4 py-2 hover:bg-secondary">
                    Category
                  </Link>
                </li>
                <li>
                  <Link to="/admin/orderlist" className="block px-4 py-2 hover:bg-secondary">
                    Orders
                  </Link>
                </li>
                <li>
                  <Link to="/admin/userlist" className="block px-4 py-2 hover:bg-secondary">
                    Users
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link to="/profile" className="block px-4 py-2 hover:bg-secondary text-primary-content">
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={logoutHandler}
                className="block w-full px-4 py-2 text-left hover:bg-secondary text-primary-content"
              >
                Logout
              </button>
            </li>
          </ul>
        )}

        {/* Login and Signup */}
        {!userInfo && (
          <ul className="mb-4">
            <li>
              <Link to='/login' className="flex items-center transition-transform transform hover:translate-x-2">
                <AiOutlineLogin className="mr-2 mt-[3rem] text-secondary hover:text-accent" size={26} />
                <span className="hidden nav-item-name mt-[3rem] ml-3">LOGIN</span>
              </Link>
            </li>
            <li>
              <Link to='/register' className="flex items-center transition-transform transform hover:translate-x-2">
                <AiOutlineUserAdd className="mr-2 mt-[3rem] text-secondary hover:text-accent" size={26} />
                <span className="hidden nav-item-name mt-[3rem] ml-3">SIGNUP</span>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navigation;
