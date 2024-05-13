import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
import { CON_URL } from "../../src/utils/constants";
const ItemList = ({items, dummy}) => {
    // console.log(dummy)

    const dispatch = useDispatch();

    const handleAddItem = (item) => {
      // Dispatch an action
      console.log(item,"kkk")
      dispatch(addItem(item));
    };

    return (
      <div>
      {items.map((item) => (
        <div
          key={item.card.info.id}
          className="flex justify-between p-2 m-2 text-left border-b-2"
        >
          <div className="w-9/12">
            <div className="py-2">
              <span>{item.card.info.name}</span>
              <span>
                - ₹
                {item.card.info.price
                  ? item.card.info.price / 100
                  : item.card.info.defaultPrice / 100}
              </span>
            </div>
            <p className="text-xs">{item.card.info.description}</p>
          </div>
          <div className="w-3/12 p-4">
            <div className="absolute">
              <button
                className="p-2 ml-8 mt-[75px] rounded-lg bg-black text-white shadow-lg hover:bg-white  hover:text-black transition-all duration-[.3s]"
                onClick={() =>handleAddItem(item)}
              >
                Add +
              </button>
            </div>
            <div>
            <img
              src={CON_URL + item.card.info.imageId}
              alt={item.card.info.name}
              className="w-full rounded-md"
            />
            </div>
          </div>
        </div>
      ))}
    </div>
)};

export default ItemList;
                  