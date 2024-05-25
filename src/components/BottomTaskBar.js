
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Badge from '@mui/material/Badge';
import { logoutHandler } from "../utils/loginSlice";
import { useDispatch } from "react-redux";

const BottomTaskBar = () => {

    const items = useSelector(store => store?.cart?.items)
    const loginToken = useSelector(store => store?.login?.loginToken)
    const navigate = useNavigate();

    const dispatch = useDispatch();
    return (
        <div className="w-full shadow-lg bg-white fixed bottom-0 md:hidden">

            <ul className="items flex w-full justify-around items-center m-2 ">
                <div className="loginout  flex  gap-[5px] justify-center items-center cursor-pointer p-2  w-24"><PermIdentityIcon />

                    {
                        loginToken ?
                            <button className="btnname  cursor-pointer " onClick={() => dispatch(logoutHandler())}> LOGOUT </button>
                            :
                            <button className="btnname  cursor-pointer " onClick={() => navigate('/login')}> LOGIN </button>
                    }


                </div>


                <Link to="/about">
                    <div className="slogo w-10 rounded-lg">
                        <img className='rounded-lg' src="https://i.postimg.cc/gjCkWqQr/V-logo.jpg" alt="" />
                    </div>
                </Link>




                <Link to="/cart"><div className="cart-btn flex  gap-[5px] justify-center items-center cursor-pointer p-2 ">
                    <Badge badgeContent={items.length} color="primary">
                        <ShoppingCartOutlinedIcon />

                    </Badge><div className="cart">CART</div>
                </div></Link>
            </ul>

        </div>
    )
}

export default BottomTaskBar