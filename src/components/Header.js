import { useContext, useState , useEffect} from "react";
import * as React from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {Link } from "react-router-dom";
import useOnlinestatus from "../utils/UseOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";
import logo from '../assets/logo.png'
import Sidebar from "../components/Sidebar";
import PercentIcon from '@mui/icons-material/Percent';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';



const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));



const Header = () => {
  const [location, setLocation] = useState([]);
console.log(location, "fgregew")
   
   const onlineStatus = useOnlinestatus();
   const {loggedInuser} = useContext(UserContext);
    // console.log(loggedInuser);

   // Subscribing to the store using a Selector
   const cartItems = useSelector((store) => store.cart.items);
   let token=JSON.parse(localStorage.getItem('token'));
  //  console.log(cartItems);

   const getLocation = async () => {
    const END_POINT = `https://ipapi.co/json`;
    try {
        let locationData = await fetch(END_POINT);
        let finalLocData = await locationData.json();
        setLocation(finalLocData);

       
        
    }
    catch (err) {
        console.log(err);
    }
};

 useEffect(() => {

  getLocation()
  
 }, [])


    return (
        <div className="parent flex justify-center bg-pink-100 shadow-lg sm:bg-yellow-50 lg:bg-green-50   w-full">
        
            <div className="navbar flex ml-20  w-full  max-[800px]:justify-between">
             <div className="left  flex  justify-center items-center   lg:gap-3 max-[1000px]:w-[60%] max-[660px]:w-full">
               <Link to="/" className="flex justify-center items-center">
                <div className="logo-container  lg:p-1 max-[1000px]:w-full ">
                <img
                  className="logo w-20 h-16 lg:w-28 lg:h-20"
                  src={logo}
                  alt="App Logo"
                />
                </div>
              </Link>
                    <div className="workplace flex  gap-2 items-center justify-start font-semibold p-2 m-2 max-[1000px]:w-[40%]">
                        <LocationOnOutlinedIcon className="location " />
                        <p className="text-xs lg:text-lg"> {(location !== null ? (location?.city + ", " + location?.region + ", " + location?.country_name) : " ")}</p>
                    </div>
            </div>
            

            <div className="  nav-items flex  justify-center items-center pr-6 max-[660px]:hidden">

                <ul className="items flex  justify-center items-center gap-8 m-2 px-10 ml-15">

                  <li className="help-btn flex  gap-[5px] justify-center items-center cursor-pointer p-2  max-[1000px]:hidden  " > 
                    <Link to="/">Home</Link>
                  </li>
                  <li className="help-btn flex  gap-[5px] justify-center items-center cursor-pointer p-2  max-[1000px]:hidden  ">
                    <Link to="/Offers"> <PercentIcon />Offers</Link>
                  </li>
                  <li className="help-btn flex  gap-[5px] justify-center items-center cursor-pointer p-2  max-[1000px]:hidden  ">
                    <Link to="/about">About Me</Link>
                  </li>
            
                  {/* <li className="px-4">
                    <Link to="/grocery">Grocery</Link>
                  </li> */}
                  <li className="cart-btn flex  gap-[5px] justify-center items-center cursor-pointer p-2">
                     <Link to="/cart">  
                       <IconButton aria-label="cart">
                       <StyledBadge badgeContent={cartItems.length} color="primary" >
                       <ShoppingCartIcon /> 
                       </StyledBadge>
                       </IconButton>
                     </Link>
                  </li>
    
                  <button className=" px-4 login text-3xl ">
                      <Sidebar /> 
                  </button>

                  <li className="px-4 mt-2">
                    {token?.username} 
                    {onlineStatus ? "✅" : "🔴"}
                  </li>

                </ul>

            </div>
            </div>
        </div>
    );
  };
  export default Header;