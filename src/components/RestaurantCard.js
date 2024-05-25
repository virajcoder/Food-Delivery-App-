import { useContext } from "react";
import { CON_URL } from "../utils/constants";
import UserContext from "../utils/UserContext";
import { AiFillStar } from "react-icons/ai";



//  const styleCard = {
//   backgroundColor: '#f0f0f0',
// };
// * Props :
// * prop -> is Just a JS Object
// * Note: When you have to dainamically pass in a data to a component, you pass in prop
// const RestaurantCard = (props) => {
// console.log(props);
// * Note We can also destructure props on the fly by wrapping them in between {}, this is like...
// * const { resName, cuisine } = props;
// const RestaurantCard = ({ resName, cuisine }) => {
//   console.log({ resName, cuisine });




const RestaurantCard = (props) => {
    const { resData } = props;

    const { loggedInuser } = useContext(UserContext)  ;
    const {
      cloudinaryImageId,
      name,
      cuisines,
      avgRating,
      costForTwo,
      deliveryTime,
    } = resData?.info;
  
    const rateColor = avgRating >= 4 ? "bg-green-500" : "bg-orange-500";

    return (
      <div 
          data-testid="resCard"
          className="card border-[1.5px] border-transparent hover:border-solid hover:border-black/10 hover:shadow-lg p-4 cursor-pointer"
      >
        <div className="res-card w-[16.2rem] min-h-[18rem] flex flex-col justify-start items-start gap-3 ">
          <img
             className="rounded-lg res-logo w-full "
             alt="res-logo"       
             src={CON_URL+cloudinaryImageId }
          />
           <div className="name-details  flex flex-col justify-between items-start gap-1">
          <h3 className="font-bold py-4 text-lg">{name}</h3>
          <h4>{cuisines.join(', ')}</h4>
          </div>
          <div className="flex flex-row gap-4 justify-between items-center w-full">
          <div className={`rating ${rateColor} px-[0.3rem] py-[0rem] flex flex-row items-center gap-1 font-open text-xs font-semibold text-white`}>
          <AiFillStar className='staricon ' /><span className="number text-[0.8rem]">{avgRating}</span>
          </div>
          
          <div className="deliveryTime font-open text-xs font-semibold text-gray-500">
            {deliveryTime} MINS
          </div>
          <div className="costOfTwo font-open text-xs  font-semibold text-gray-500">
            ₹{costForTwo } 
          </div>
          

      </div>
      <h4>User : {loggedInuser} </h4>
      </div>
      </div>
    );
  };

  // Higher Order Component

  // input - Restaurant => RestaurantCardPromoted

  export const withPromtedLabel = (RestaurantCard) => {
    return (props) => {
      return (
        <div>
          <label className="absolute bg-black text-white m-2 p-2 rounded-lg  ">
             Promoted
          </label>
             <RestaurantCard {...props} />
        </div>
      )
    }
  }
  export default RestaurantCard;