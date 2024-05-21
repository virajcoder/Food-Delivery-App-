import { useContext, useState,useEffect } from "react";
import * as React from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { LOGO_URL } from "../utils/constants";
import {Link } from "react-router-dom";
import useOnlinestatus from "../utils/UseOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";
import logo from '../assets/logo.png'
import Sidebar from "../components/Sidebar";


const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState("Login");
  

 
  const onlineStatus = useOnlinestatus();

  const {loggedInuser} = useContext(UserContext);
  console.log(loggedInuser);

   // Subscribing to the store using a Selector
   const cartItems = useSelector((store) => store.cart.items);
   let token=JSON.parse(localStorage.getItem('token'));

 
  

   //console.log(cartItems);

  // if no dependency array => useEffect is called on every render
  // if dependency array is empty = [] => useEffect is called on initial render(just once)
  // if dependency array is [btnNameReact] => called everytime btnNameReact is updated
    return (
      <div className="flex justify-between bg-pink-100 shadow-lg sm:bg-yellow-50 lg:bg-green-50  min-h-20">
        <div className="logo-container">
        <Link to="/">
          <img
            className="w-28"
            src={logo}
            alt="App Logo"
          />
          </Link>
        </div>
        <div className="flex items-center">
          <ul className="flex p-4 m-4  ">
            {/* <li className="px-4">
              Online Status: {onlineStatus ? "🟢" : "🔴"}
            </li> */}
            <li className="px-4 mt-2" > 
              <Link to="/">Home</Link>
            </li>
            <li className="px-4 mt-2">
            <Link to="/about">About Us</Link>
            </li>
            {/* <li className="px-4">
            <Link to="/contact">Contact Us</Link>
            </li> */}
            {/* <li className="px-4">
            <Link to="/grocery">Grocery</Link>
            </li> */}
            <li className="px-4  font-bold text-xl">
            <Link to="/cart">  <IconButton aria-label="cart" >
      <StyledBadge badgeContent={cartItems.length} color="primary" >
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
    </Link>
          </li>
          
            <button className="login text-3xl"
            //  onClick={() => {
            //   btnNameReact ==="Login"? setBtnNameReact("Logout") : setBtnNameReact("Login");
            //   }}
            // onClick={()openDrawerHandler}
              >
              {/* {btnNameReact} */}
               <Sidebar /> 

             </button>

             <li className="px-4 mt-2">{token?.username} {onlineStatus ? "✅" : "🔴"}</li>
          </ul>
        </div>
      </div>
    );
  };
  export default Header;