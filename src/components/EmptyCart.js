import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const EmptyCart = () => {
    const loginToken = useSelector(store => store?.login?.loginToken);
    const navigate = useNavigate();
    return (

        loginToken ?



            <div className="w-full flex flex-col justify-center items-center gap-2 h-[80%] pb-10 lg:pb-5   lg:h-full">
                <div className="img w-[33%] max-[700px]:w-[60%]">
                    <img src="https://i.postimg.cc/NFFrr6jc/cart.jpg" alt="" className="max-[700px]:w-full" />
                </div>
                <div className="rest flex flex-col justify-center items-center bottom-14 p-2 max-[660px]:mt-5 lg:relative">
                    <div className="head flex flex-col  items-center">
                        <div className="heading font-semibold lg:text-xl pt-2">
                            Your cart is empty
                        </div>
                        <div className="disc p-2 flex justify-center items-center  text-center pb-4">
                            You can go to home page to view more restaurants
                        </div>

                    </div>

                    <button className="bg-green-500 rounded-lg p-2 lg:text-xl font-semibold px-4" onClick={() => navigate('/')}>SEE RESTAURANTS NEAR YOU</button>
                </div>

            </div>

            :
            <div className=" flex justify-center items-center bg-black/10">
                <div className='login-main flex max-h-[400px]  justify-center items-center text-sociogram bg-black/20 lg:rounded-xl'>
                    <div className="div flex justify-around gap-4 items-center m-10 flex-col ">
                        <img src="https://i.postimg.cc/yNJKjHfB/ezgif-com-video-to-gif.gif" alt="" />
                        <button onClick={() => navigate('/login')} className="bg-green-500 rounded-lg p-2 lg:text-xl font-semibold px-4">LOGIN TO VIEW</button>

                    </div>
                </div>
            </div>


    )
}

export default EmptyCart