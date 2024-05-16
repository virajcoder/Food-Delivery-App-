import { useContext } from "react";
import { CON_URL } from "../utils/constants";
import UserContext from "../utils/UserContext";

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
  
    
    return (
      <div data-testid="resCard"
      className="m-4 p-4 w-[250px] h-[95%] rounded-lg bg-red-100 hover:bg-gray-200 "
      >
        <img
          className="rounded-lg h-[50%]"
          alt="res-logo"
          // src={
          //   'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/' +
          //   resData.info.cloudinaryImageId
          // }
src={CON_URL+cloudinaryImageId }/>

        {/* <h3>{props.resName}</h3>
          <h4>{props.cuisine}</h4> */}
        {/* <h3>{resData.info.name}</h3>
        <h4>{resData.info.cuisines.join(', ')}</h4>
        <h4>{resData.info.avgRating} stars</h4>
        <h4>₹{resData.info.costForTwo / 100} FOR TWO</h4>
        <h4>{resData.info.deliveryTime} minutes</h4> */}
        <h3 className="font-bold py-4 text-lg">{name}</h3>
        <h4>{cuisines.join(', ')}</h4>
        <h4>{avgRating} stars</h4>
        <h4>{costForTwo} </h4>
        <h4>{deliveryTime} minutes</h4>
        <h4>User : {loggedInuser} </h4>
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