import RestaurantCard from "./RestaurantCard"
import  resList from "../utils/mockData"
import { useState } from "react";

    
    // * What is Config-driven-UI -> A "config-driven UI" is a user interface that is built and configured using a declarative configuration file or data structure, rather than being hardcoded.
    
    // * Every company now-a-days follows these approach, because our Appications need to be Dynamic These Days
    
    // * Note: A Good Senior Frontend engineer is - who is a good UI Layer Engineer and a good Data Layer Engineer
    






    
    
    
    // * not using keys (not acceptable) <<<< index as a key <<<<<<<<<< unique id (is the best  practice)
const Body = () => {
  // Local state Variable - Super Powerful variable
  const [listOfRestaurants, setListOfRestraunt] = useState(resList)

  // normal js Variable
  // let listOfRestaurants =[
  // {
  //     info: {
  //       id: "718473",
  //       name: "Chinese Wok",
  //       cloudinaryImageId: "e0839ff574213e6f35b3899ebf1fc597",
  //       deliveryTime: 36,
  //       costForTwo: "₹250 for two",
  //       cuisines: [
  //         "Chinese",
  //         "Asian",
  //         "Tibetan",
  //         "Desserts"
  //       ],
  //       avgRating: "3.8",
  //   }
  // },
  // {
  //   info: {
  //     id: "53747",
  //     name: "Pizza Hut",
  //     cloudinaryImageId: "2b4f62d606d1b2bfba9ba9e5386fabb7",
  //     costForTwo: "₹350 for two",
  //     cuisines: [
  //       "Pizzas"
  //     ],
  //     avgRating:"3.7",
  // }
  // },
  // {
  // info: {
  //   id: "38925",
  //   name: "Domino's Pizza",
  //   cloudinaryImageId: "d0450ce1a6ba19ea60cd724471ed54a8",
  //   locality: "Netaji Subhash Marg",
  //   areaName: "Daryaganj",
  //   costForTwo: "₹400 for two",
  //   cuisines: [
  //     "Pizzas",
  //     "Italian",
  //     "Pastas",
  //     "Desserts"
  //   ],
  //   avgRating: "4.1",
  // }
  // },
  // {
  // info: {
  //   id: "79716",
  //   name: "Burger King",
  //   cloudinaryImageId: "e33e1d3ba7d6b2bb0d45e1001b731fcf",
  //   locality: "Aditya Mega Mall",
  //   areaName: "Shahdara",
  //   costForTwo: "₹350 for two",
  //   cuisines: [
  //     "Burgers",
  //     "American"
  //   ],
  //   avgRating: "4.1",
  // }
  // }
  // ]
    return (
      <div className="body">
        <div className="filter">
          
          <button className="filter-btn" onClick={() =>{
            const filteredList = listOfRestaurants.filter(
              (res) => res.info.avgRating > "4"
            );
            setListOfRestraunt(filteredList)
          }}>
            Top Rated Restaurants</button>
        </div>
        <div className="res-container">
         
           {/* <RestaurantCard resData={resList[0]} />
          <RestaurantCard resData={resList[1]} />
          <RestaurantCard resData={resList[2]} />
          <RestaurantCard resData={resList[3]} />
          <RestaurantCard resData={resList[4]} />
          <RestaurantCard resData={resList[5]} />
          <RestaurantCard resData={resList[6]} />
          <RestaurantCard resData={resList[7]} />
          <RestaurantCard resData={resList[8]} />
          <RestaurantCard resData={resList[9]} />
          <RestaurantCard resData={resList[10]} />
          <RestaurantCard resData={resList[11]} />
          <RestaurantCard resData={resList[12]} /> */}
  
          {/* // * looping through the <RestaurentCard /> components Using Array.map() method */}
  
          {listOfRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.info.id} resData={restaurant} />
          ))}
  
          {/* // * or */}
  
          {/* // * We can also use index as the key to the JSX child elemnt - which is the 2nd parameter of the map() method, but is not a recommended practice - react official Docs declared this/}
  
          {resList.map((restaurant, index) => (
            <RestaurantCard key={index} resData={restaurant} />
          ))}
  
          {/* // * Why should we provide key property to the child elements - When creating a list in the UI from an array with JSX, you should add a key prop to each child and to any of its' children. React uses the key prop create a relationship between the component and the DOM element. The library uses this relationship to determine whether or not the component should be re-rendered.
           */}
        </div>
      </div>
    );
  };

  export default Body;