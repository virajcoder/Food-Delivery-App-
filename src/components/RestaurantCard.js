import { CON_URL } from "../utils/constants";

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
  
    const {
      cloudinaryImageId,
      name,
      cuisines,
      avgRating,
      costForTwo,
      deliveryTime,
    } = resData?.info;
  
    return (
      <div
        className="res-card"
        style={{
          backgroundColor: '#f0f0f0',
        }}
      >
        <img
          className="res-logo"
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
        <h3>{name}</h3>
        <h4>{cuisines.join(', ')}</h4>
        <h4>{avgRating} stars</h4>
        <h4>₹{costForTwo / 100} FOR TWO</h4>
        <h4>{deliveryTime} minutes</h4>
      </div>
    );
  };
  export default RestaurantCard;