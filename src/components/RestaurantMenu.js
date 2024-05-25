
import{ useState } from 'react'
import ShimmerMenu from './ShimmerMenu';
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCatagory";
import { CON_URL } from "../../src/utils/constants";
import { AiFillStar } from "react-icons/ai";
import { MdOutlineTimelapse } from "react-icons/md";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { FaLeaf } from "react-icons/fa";


const RestaurantMenu = () =>{ 
    const {resId } = useParams();
   
    const resInfo = useRestaurantMenu(resId);
    const dummy = "Dummy Data";


    const [showIndex, setShowIndex] = useState(null);

    
      if (resInfo == null) return <ShimmerMenu />;


    const {cloudinaryImageId, name, cuisines, costForTwoMessage, areaName, avgRatingString, totalRatingsString} = resInfo?.cards[2]?.card?.card?.info;
    const { lastMileTravelString, deliveryTime } = resInfo?.cards[2]?.card?.card?.info ?? resInfo?.cards[2]?.card?.card?.info.sla;
    

    const{ itemCards } = resInfo?.cards[4]?.groupedCard.cardGroupMap?.REGULAR?.cards[1]?.card?.card;
          
          console.log(resInfo?.cards[4]?.groupedCard.cardGroupMap?.REGULAR?.cards);

    const categories = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
                       (c) =>c.card?.card?.["@type"] ===
                             "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
                             );

                 console.log(categories);

                 
               
    return( 
      
        <div className="mainBodyRestaurantMenu flex flex-col items-center  w-[100%] max-[800px]:w-full max-[800px]:px-3">
            <div className='firstresNameDetails flex justify-between w-[50%] p-2'>
        
            <div className='left max-[800px]:w-[70%]'> 
           <h1 className="name text-lg font-bold font-open max-[800px]:w-full">{name}</h1>
              <p>{cuisines.join(", ")}</p>
              <p>{areaName + " " + lastMileTravelString}</p>
              </div>
              <div className=" pt-2 mr-5">
              <img  className="rounded-lg w-32 h-[90px] mb-3 "
                src={CON_URL + cloudinaryImageId}
                alt={cloudinaryImageId}
              />
            </div>
              <div className="right max-[700px]:max-h-24 flex flex-col justify-around p-1 items-center border-[1px] border-gray-300 rounded-xl max-[800px]:w-[20%]">
                            <div className="rating font-bold text-green-700 flex justify-center items-center gap-[2px]">
                                <AiFillStar /> <span>{avgRatingString}</span>
                            </div>
                            <div className="krating font-open text-[0.65rem] font-semibold text-gray-500 ">
                                <p>{totalRatingsString}</p>
                            </div>
                        </div>
              </div>
              <div className="secondTimeAndOffers flex flex-col  w-[50%]">
                        <div className="timeandprice w-full flex justify-start gap-5 p-3 max-[800px]:justify-around">
                            <div className="time flex items-center gap-2 font-open text-black/80 font-bold">
                                <MdOutlineTimelapse className="timeicon text-2xl" />  <span className="dtime font-[750]">{deliveryTime} MINS</span>
                            </div>
                            <div className="price flex items-center gap-2 font-open text-black/80 ">
                                <HiOutlineCurrencyRupee className="rupeeicon text-2xl font-thin" />  <span className="costmsg font-bold">{costForTwoMessage}</span>
                            </div>
                        </div>
                        
                        </div>
                        <div className="items w-full flex flex-col gap-5">
               {/* categories accordions */}
              {categories.map((category, index) =>(
              <RestaurantCategory 
               key ={category?.card?.card.titl}
               data={category?.card?.card}
               showItems={index == showIndex ? true : false}
               setShowIndex={() => setShowIndex(showIndex === index ? null : index)}
               dummy={dummy}
              />))}
                </div>
            

        </div>
        
      );
};

export default RestaurantMenu;