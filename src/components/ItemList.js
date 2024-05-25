import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
import { CON_URL } from "../../src/utils/constants";
import toast from 'react-hot-toast';
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const ItemList = ({ items }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const cartItems = useSelector((store) => store.cart.items);

  const handleAddItem = (item) => {
    dispatch(addItem(item));
    toast.success('Item added successfully');
  };

  return (
    <div>
      {items.map((item) => (
        <div key={item.card.info.id} className=" w-full py-4 flex flex-col justify-center bg-white my-[2px] pb-12  max-[800px]:p-2">
          <div className="parent flex justify-between items-start ">
          <div className="data w-[95%] flex flex-col gap-1 max-[800px]:w-[90%]">
            <div className=" flex flex-col justify-between ">
             <div className="pricing flex w-2/3 font-semibold items-center"> {item.card.info.name}</div>
              <div className="flex gap-16 font-semibold">
                <span>
                - ₹
                {item.card.info.price
                  ? item.card.info.price / 100
                  : item.card.info.defaultPrice / 100}
                  </span>
              </div>
            </div>
            <div className="text-[13px] text-slate-500 max-[800px]:text-[10px] max-[800px]:w-[95%]">
            <p className="text-sm">{item.card.info.description}</p>
          </div>
          </div>
          <div className=" img-btn-parent  ">
            <div className=" relative pt-2">
              <img  className="rounded-lg w-32 h-[90px] mb-3"
                src={CON_URL + item.card.info.imageId}
                alt={item.card.info.name}
               
              />
            </div>
            <div className="btn flex justify-center mb-[-20%]">
              {cartItems.find(it => it?.id === item.card.info.id) ?
                <Link className=" p-2  rounded-lg bg-black text-white shadow-lg hover:bg-white  hover:text-black transition-all duration-[.3s]" to='/Cart'>
                  Go to Cart
                </Link>
                :
                <button
                  className="p-2  rounded-lg bg-black text-white shadow-lg hover:bg-white  hover:text-black transition-all duration-[.3s]"
                  onClick={() => token ? handleAddItem(item) : navigate('/login')}
                >
                  Add to Cart
                </button>
              }
            </div>
          </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
