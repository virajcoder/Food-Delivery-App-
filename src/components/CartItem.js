


// import { useDispatch } from "react-redux";
// import { addItem } from "../utils/cartSlice";
// import { CON_URL } from "../../src/utils/constants";
// const  CartItem = ({items, dummy}) => {
//     // console.log(dummy)

//     const dispatch = useDispatch();

//     const handleAddItem = (item) => {
//       // Dispatch an action
//       dispatch(addItem(item));
//     };

//     // const totalPrice = items.reduce((acc, item) => {
//     //   const price = item.card.info.price ? item.card.info.price / 100 : item.card.info.defaultPrice / 100;
//     //   return acc + price;
//     // }, 0);

//     return (
//       <div>
//       {items.map((item) => (
//        <div key={(item.card.info.id)} className="p-3">
                
//        <div className="flex justify-between items-center ">
//              <img src={CON_URL + item.card.info.imageId } className="p-2" height={100} width={100}/>
                          
//                   <span>{item.card.info.name}</span>

//                   <button className = "p-2  rounded-lg bg-black text-white shadow-lg "
//              onClick={() => handleAddItem(item)}>
//                  Add </button>


//                   <span className="text-xl ">₹{item.card.info.price 
                  // ? item.card.info.price / 100
//                   : item.card.info.defaultPrice / 100}   
//              </span>
                  
//        </div>           
         
//      </div>

//       ))}
//       {/* <div className="text-xl">Total Price: ₹{totalPrice.toFixed(2)}</div> */}
//     </div>
// )};

// export default CartItem;
                  