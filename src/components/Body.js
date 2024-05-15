
import RestaurantCard, { withPromtedLabel } from "./RestaurantCard"
import { useContext, useEffect, useState } from "react"
import Shimmer from "./Shimmer"
import {Link } from "react-router-dom";
import useOnlineStatus from "../utils/UseOnlineStatus";
import UserContext from '../utils/UserContext.js';


  import Cors from 'cors';
   

const Body = () => {
  
  const [listOfRestaurants, setListOfRestraunt] = useState([]);
  
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);

  const [searchText, setSearchText] = useState("");

  const RestaurantCardPromoted = withPromtedLabel(RestaurantCard);

      console.log("body Rendered", listOfRestaurants);
  


     useEffect(() => {
    fetchData();
        }, []);



  const fetchData = async () => {

    try {       
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.61450&lng=77.30630&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      const json = await data.json();
      console.log(json);
      
      setListOfRestraunt(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants) 
      setFilteredRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)



    } catch (error) {
      
        console.log("error call api ",error);
    }  
  }



  const onLineStatus = useOnlineStatus();
  if(onLineStatus === false)
     return(
    <h>
      Looks like you are offline !! please check your internet connection;
    </h>
    );
  
 const {loggedInUser, setUserName} = useContext(UserContext)


    return listOfRestaurants.length === 0 ?(
      <Shimmer />
    ):
    (
      <div className="body">
        <div className="filter flex">
          <div className="search m-4 p-4">

            <input type="text" className="border border-solid border-black" value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}/>


            <button className="px-4 py-2 bg-green-100 m-4 rounded-lg"
              onClick={() => {
                console.log(searchText)
              const filteredRestaurant = listOfRestaurants.filter(
                (res) => res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredRestaurant(filteredRestaurant);
              }}>
              Search
            </button>

          </div>


          <div className="search m-4 p-4 flex items-center">
             <button className="px-4 py-2 bg-gray-100 rounded-lg" onClick={() =>{
               const filteredList = listOfRestaurants.filter(
               (res) => parseFloat(res.info.avgRating) > "4.1"
               );
               setFilteredRestaurant(filteredList)
                console.log(filteredList)
               }}>
               Top Rated Restaurants
             </button>
          </div>
          <div className="search m-4 p-4 flex items-center">
             <label>UserName : </label>
             <input
               className="border border-black p-2"
               value={loggedInUser}
               onChange={(e) => setUserName(e.target.value)}
             />
           </div>
        </div>


           <div className="flex flex-wrap">
               {filteredRestaurant.map((restaurant) => (
               <Link key={restaurant.info.id}
                 to={"/restaurants/" + restaurant.info.id}>

                {/* if the restaurant is Promoted then add a promoted label to it */}
                {restaurant.info.promoted ? (<RestaurantCardPromoted resData={restaurant} />
                ) : (
                  <RestaurantCard  resData={restaurant} />
                )}
                
               </Link>
              ))}
  
               {/* // * Why should we provide key property to the child elements
                - When creating a list in the UI from an array with JSX, 
                you should add a key prop to each child and to any of its' children.
                React uses the key prop create a relationship between the component and the DOM element.
                The library uses this relationship to determine whether or not the component should be re-rendered.
               */}
           </div>
      </div>
    );
  };

  export default Body;