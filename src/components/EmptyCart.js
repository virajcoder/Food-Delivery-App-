import Typography from '@material-ui/core/Typography'
import { Grid, Button } from '@mui/material'; 
import { useNavigate } from "react-router-dom";
import emptycart from '../assets/emptycart.gif'
const EmptyCart = () => {
    const navigate = useNavigate();
    return (

      



        <div id='empty-cart-gif' className="flex flex-col gap-5 justify-center items-center h-full" >
        <img src={emptycart} alt="cart-gif" width='25%' />
        <div className="head flex flex-col  items-center">
                        <div className="heading font-semibold lg:text-xl pt-2">
                            Your cart is empty
                        </div>
                        <div className="disc p-2 flex justify-center items-center  text-center pb-4">
                            You can go to home page to view more restaurants
                        </div>

                    </div>
        
        <Button color="primary" variant="contained" onClick={() => navigate('/')}>SEE RESTAURANTS NEAR YOU</Button>
       
      </div>

           

          

    )
}

export default EmptyCart