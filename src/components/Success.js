import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import success from '../assets/success.jpg'


const Success = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate('/')
        }, 3000);
    }, [])
    return (
        <div className="inset-0 w-full flex justify-center items-center my-10 lg:mb-10">
            <img className="lg:w-1/3" src={success}alt="" />
        </div>
    )
}

export default Success