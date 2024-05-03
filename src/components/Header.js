import { useContext, useState } from "react";
import { LOGO_URL } from "../utils/constants";
import {Link } from "react-router-dom";
import useOnlinestatus from "../utils/UseOnlineStatus";
import UserContext from "../utils/UserContext";

const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState("Login");
  

  const onlineStatus = useOnlinestatus();

  const {loggedInuser} = useContext(UserContext);
  console.log(loggedInuser);

  // if no dependency array => useEffect is called on every render
  // if dependency array is empty = [] => useEffect is called on initial render(just once)
  // if dependency array is [btnNameReact] => called everytime btnNameReact is updated
    return (
      <div className="flex justify-between bg-pink-100 shadow-lg sm:bg-yellow-50 lg:bg-green-50">
        <div className="logo-container">
          <img
            className="w-40"
            src={LOGO_URL}
            alt="App Logo"
          />
        </div>
        <div className="flex items-center">
          <ul className="flex p-4 m-4">
            <li className="px-4">
              Online Status: {onlineStatus ? "✅" : "🔴"}
            </li>
            <li className="px-4"> 
              <Link to="/">Home</Link>
            </li>
            <li className="px-4">
              <Link to="/about">About Us</Link>
            </li>
            <li className="px-4">
            <Link to="/contact">Contact Us</Link>
            </li>
            <li className="px-4">
            <Link to="/grocery">Grocery</Link>
            </li>
            <li className="px-4 font-bold text-xl">Cart</li>
            <button className="login" onClick={() => {
              btnNameReact ==="Login"? setBtnNameReact("Logout") : setBtnNameReact("Login");
              }}>
              {btnNameReact}
             </button>
             <li className="px-4 ">{loggedInuser}</li>
          </ul>
        </div>
      </div>
    );
  };
  export default Header;