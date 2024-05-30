import 'swiper/swiper-bundle.css';
import RestaurantCard, { withPromtedLabel } from "./RestaurantCard"
import { useContext, useEffect, useState } from "react"
import Shimmer from "./Shimmer"
import {Link } from "react-router-dom";
import useOnlineStatus from "../utils/UseOnlineStatus";
import UserContext from '../utils/UserContext.js';
import SearchIcon from '@mui/icons-material/Search';
import { config } from 'process';
import axios from 'axios'

    

const Body = () => {
  const [noOfItems, setNoOfItems] = useState(4);
  const [carousel, setCarousel] = useState(null);
  
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
              const proxyUrl = 'https://api.allorigins.win/raw?url='; // CORS proxy URL
              const apiUrl = 'https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.61450&lng=77.30630&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING';
      
              const response = await axios.get(proxyUrl + encodeURIComponent(apiUrl));
              const json = response.data;
      
              setListOfRestraunt(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
              setFilteredRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
          } catch (error) {
              console.log("Error calling API: ", error);
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


 useEffect(() => {
  let deviceWidth = window.innerWidth;
  if (deviceWidth < 660 && deviceWidth > 300) {
      setNoOfItems(2);
  }
}, [])

    return listOfRestaurants && listOfRestaurants.length === 0 ?(
      <Shimmer />
    ):
    (
      <div className="parent w-full lg:mb-5"> 
      {carousel &&
        <div className="carousel  w-full flex justify-center bg-black p-[22px] ">
            <div className="swiper w-[82%] m-4 p-5 bg-black max-[760px]:w-full max-[760px]:m-0  ">

                <Swiper
                    slidesPerView={noOfItems}
                    spaceBetween={55}
                    slidesPerGroup={1}
                    loop={false}

                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                >


                    {
                        carousel &&
                        carousel?.map((cc) => {
                            return (
                                <SwiperSlide key={cc?.data?.bannerId} className="py-10">
                                    <div className="">
                                        <img src={import.meta.env.MENU_API + cc.data.creativeId} alt="" className="hover:scale-110 transition-all duration-[0.6s] ease-in-out z-[99999]" />
                                    </div>
                                </SwiperSlide>
                            )
                        })

                    }
                </Swiper>

            </div>
        </div>
    }
      <div className=" body w-full flex flex-col justify-center items-center gap-8 ">
        

          <div className="filters  flex justify-center items-center mt-4 gap-20 pr-5 p-2 max-[760px]:flex-col max-[760px]:w-full max-[760px]:gap-4 max-[760px]:pr-2 ">
            
            
            <div className="Search w-[30%]  flex justify-center">
                <input 
                   type="text" 
                  placeholder="Search"   
                  className="border border-solid rounded-lg border-gray-300 bg-gray-200 hover:bg-gray-300 h-[38px] mt-4" 
                  value={searchText}
                  onChange={(e) => {
                  setSearchText(e.target.value);
                  }}
                />
              <button 
                    className=" search-button flex justify-center items-center gap-2 p-2 px-3 m-4  bg-gray-200 hover:bg-gray-300 text-sm font-semibold  rounded-lg"
                   onClick={() => {
                   console.log(searchText)
                   const filteredRestaurant = listOfRestaurants.filter(
                   (res) => res.info.name.toLowerCase().includes(searchText.toLowerCase())
                   );
                   setFilteredRestaurant(filteredRestaurant);
                   }}>
                    <SearchIcon />
                   Search
              </button>
           </div>


                <div className="filter w-[60%] flex justify-between items-center gap-3 rounded-lg  max-[760px]:w-full max-[760px]:bg-gray-200 max-[760px]:font-bold px-1">
                   <button className="px-4 py-2 bg-gray-200 hover:bg-gray-400 rounded-lg" 
                           onClick={() =>{
                           const filteredList = listOfRestaurants.filter(
                          (res) => parseFloat(res.info.avgRating) > "4.1"
                          );
                           setFilteredRestaurant(filteredList)
                         
                          }}>
                          Top Rated Restaurants
                   </button>
                   <button className="filter-btn  bg-gray-200 p-2 rounded-lg hover:bg-gray-400 max-[760px]:text-sm max-[560px]:text-[10px] " onClick={() => {
                                   let filteredList1 = [...listOfRestaurants];
                                   filteredList1.sort((a , b) => a.info.costForTwo.match(/\d+/) - b.info.costForTwo.match(/\d+/));
                                setFilteredRestaurant(filteredList1);
                                  console.log(filteredList1, "LOW to HIGH")
                            }}>
                                 Low To High
                            </button>
                            <button className="filter-btn  bg-gray-200 p-2 rounded-lg hover:bg-gray-400 max-[760px]:text-sm max-[560px]:text-[10px] " onClick={() => {
                                let filteredList2 = [...listOfRestaurants];
                                filteredList2.sort((a, b) => b.info.costForTwo.match(/\d+/) - a.info.costForTwo.match(/\d+/));
                                console.log(filteredList2 , " HIGH TO LOW ")
                                setFilteredRestaurant(filteredList2);
                            }}>
                                High To Low
                            </button>
                   
                </div>
          
                <div className="Search w-[30%]  justify-center gap-5  flex items-center ">
                      <label >UserName  </label>
                      <input className="border border-black p-2 bg-gray-200"
                        value={loggedInUser}
                        onChange={(e) => setUserName(e.target.value)}
                      />
                </div>
        </div>


           <div className=" flex flex-wrap justify-between items-start w-[81%] gap-y-20 max-[800px]:gap-y-0 max-[730px]:w-full max-[660px]:justify-center">
               {filteredRestaurant.map((restaurant) => (
               <Link key={restaurant.info.id}
                 to={"/restaurants/" + restaurant.info.id}>

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
      </div>
    );
  };

  export default Body;