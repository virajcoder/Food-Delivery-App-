import { useSelector } from "react-redux";
import { useRef, useEffect } from "react";
import { incrQuantity, decrQuantity, removeItem, emptyItems } from "../utils/cartSlice";
import { useDispatch } from "react-redux";
import EmptyCart from "./EmptyCart";
import { BsArrowRightSquareFill } from "react-icons/bs"
import { useNavigate } from "react-router-dom";




const Cart = () => {
  const navigate = useNavigate();
  let totalAmount = useRef(0);
  const items = useSelector((store) => store.cart.items);

  totalAmount.current = 0;
    const totalHandler = (price, quantity) => {
        totalAmount.current = Number(totalAmount.current) + (price * quantity);
    }

    // console.log(totalAmount.current)

    const handlePaymentSuccess = (payment) => {
        // console.log("Payment Successful:", payment);
        dispatch(emptyItems());
        navigate("/success");
    };

    const handlePaymentError = (error) => {
        // console.log("Payment Error:", error);
        // Handle payment errors
    };

    const makePayment = async (price) => {

        // payment
        const options = {
            key: "rzp_test_QFCXIGewjw1Y8K",
            amount: price * 100,
            currency: "INR",
            name: "Singh Food Delivery",
            description: "Thank you for your test purchase",
            image: '',
            handler: handlePaymentSuccess,
            prefill: {
                name: '',
                email: '',
                contact: ''
            },
            notes: {
                address: ''
            },
            theme: {
                color: "#0e5db3"
            }
        };
        // window.RazorpayCheckout.open(options);
        const razorpayInstance = new window.Razorpay(options);
        razorpayInstance.on('payment.failed', handlePaymentError);
        razorpayInstance.open();
    };

useEffect(() => {

    // if (!loginToken) {
    //     navigate("/login")
    // }


    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
        document.body.removeChild(script);
     };
    }, []);

  const dispatch = useDispatch();
  // const dispatch = useDispatch();
//   const checkToken = () => {
//     const token = localStorage.getItem('token');
//     if (token === null) 
//       navigate("/login");
//   }

//   useEffect(()=>{
//     checkToken();
//   },[])

    


  return (
    items.length !== 0
        ?
        (
            <div className="parent w-full flex justify-center items-center bg-black/10 pb-36 mt-5 ">
                <div className="childParent w-3/4 flex  justify-between  mt-4 max-[800px]:flex-col max-[800px]:w-full max-[800px]:justify-center max-[800px]:items-center">
                    <div className="left w-2/3  flex flex-col justify-center items-center max-[800px]:w-[90%] ">
                        <div className="topSticky bg-gray-200 w-full z-10 max-[700px]:rounded-lg lg:mb-4">
                            <div className="firstresNameDetails flex justify-between w-full p-2">
                                <div className="left">
                                    {/* <h1 className="name text-lg font-bold font-open">{items.cards[2]?.card?.card?.info.name}</h1> */}
                                    {/* <p>{items[0]?.cuisines.join(", ")}</p> */}

                                    {/* <p>{items[0]?.areaName + " " + items[0]?.deliveryDistance}</p> */}
                                </div>
                                {/* <div className="res-img  w-20 items-center rounded-xl">

                                    <img src={import.meta.env.VITE_rzp_Id_MENU_IMG_API + items[0].image} alt="" className="rounded-xl" />

                                </div> */}
                            </div>
                        </div>
                        <div className="middle w-full ">
                            {
                                items.map((item) => {

                                    totalHandler( item?.card?.info?.price
                                      ? item?.card?.info?.price / 100
                                      : item?.card?.info?.defaultPrice / 100, item.quantity)

                                    // console.log(item?.quantity,'ll')
                                    return (
                                        <div key={item?.card?.info?.id} className="flex items-center justify-between w-full  gap-2 my-2 ">
                                            {/* <div className="py-1">
                                             {item.veg === "VEG" ? <img width="20" height="20" src="https://img.icons8.com/color/48/vegetarian-food-symbol.png" alt="vegetarian-food-symbol" /> 
                                             : (item.veg) === "NONVEG" ? <img width="20" height="20" src="https://img.icons8.com/color/48/non-vegetarian-food-symbol.png" alt="non-vegetarian-food-symbol" /> : ""}
                                             </div> */}
                                            <div className="namePrice flex justify-between items-center  w-full px-4">
                                                <div className="name w-[40%]">
                                                    {item?.card?.info?.name}
                                                </div>
                                                <div className="btn flex justify-between items-center gap-3 py-1 px-3 ">
                                                    <button onClick={() => item?.quantity >= 2 ? dispatch(decrQuantity(item?.card?.info?.id)) : dispatch(removeItem(item?.card?.info?.id))}>-</button>
                                                    <div className="w-2 flex justify-center items-center">{item?.quantity}</div>
                                                    <button onClick={() => dispatch(incrQuantity(item?.card?.info?.id))}>+</button>
                                                </div>
                                                <div className="price w-20 ">
                                                    ₹ {(item?.card?.info?.price
                  ? item?.card?.info?.price / 100
                  : item?.card?.info?.defaultPrice / 100).toFixed(2)*item?.quantity}
                                                </div>

                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="mt-1 sticky bottom-0  w-full lg:mt-4">
                            <button className="flex bg-[rgb(249,196,89)] w-full p-3 justify-between items-center text-white text-sm font-bold px-12" >
                                <div className="rate flex justify-start items-center w-2/4">
                                    SUB-TOTAL
                                </div>
                                <div className="flex justify-end items-center w-2/4"> ₹ {totalAmount?.current?.toFixed(2)}</div>
                            </button>
                        </div>
                    </div>
                    <div className="right p-5 w-1/3  items-center max-[800px]:w-full">

                        <div className="payment bg-white  w-full p-4 flex flex-col gap-2">
                            <div className="bill"> Bill Details</div>
                            <div className="price-det  px-2 flex flex-col gap-3 my-2">
                                <div className="item total flex justify-between items-center">
                                    <div className="head">
                                        Item Total
                                    </div>
                                    <div className="price w-20">
                                        ₹ {totalAmount?.current?.toFixed(2)}
                                    </div>
                                </div>
                                <div className="delivery flex justify-between items-center">
                                    <div className="head">
                                        Delivery Fee | {items?.card?.info?.deliveryDistance}
                                    </div>
                                    <div className="price w-20">
                                        ₹ 40
                                    </div>
                                </div>
                            </div>
                            <div className="tax flex justify-between items-center my-2">
                                <div className="head">
                                    GST and Restaurant Charges
                                </div>
                                <div className="price w-24 px-2">
                                    ₹ 10
                                </div>
                            </div>
                        </div>
                        <div className="mt-2 sticky bottom-0  w-full max-[800px]:bottom-14" >
                            <button className="flex bg-[rgb(249,196,89)] w-full p-3 justify-between items-center text-white text-sm font-bold rounded-md" onClick={() => makePayment(totalAmount.current + 50)}>
                                <div className="rate flex gap-2 items-center">PROCEED TO PAY <BsArrowRightSquareFill /></div>
                                <div className="w-28 p-1 ">₹ {(totalAmount?.current + 50)?.toFixed(2)}</div>
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        )
        :
        (
            <div className="empty">
            <EmptyCart />
        </div>

        )
)
};


export default Cart;