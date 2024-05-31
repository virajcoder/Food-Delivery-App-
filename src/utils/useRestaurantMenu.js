import { useEffect, useState } from "react";
import { MENU_API } from "../utils/constants";
import axios from 'axios'

const useRestaurantMenu = (resId) => {
    const [resInfo, setResInfo] = useState(null)

     useEffect(() => {
        fetchMenu();
    }, []);

    const fetchMenu = async () => {
        try {
            const proxyUrl = 'https://api.allorigins.win/raw?url=';
            const menuApi = "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.65420&lng=77.23730&restaurantId=";
            const response = await axios.get(proxyUrl + encodeURIComponent(menuApi  + resId));
            const json = response.data;
            // console.log(json, "restaurent meanu");
            setResInfo(json.data);
        } catch (error) {
            console.log("Error fetching menu: ", error);
        }
    };
    return resInfo
};
export default useRestaurantMenu;