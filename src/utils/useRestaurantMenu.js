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
            const apiUrl = 'https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.61450&lng=77.30630&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING';
            const response = await axios.get(proxyUrl + encodeURIComponent(apiUrl + resId));
            const json = response.data;
            // console.log(json);
            setResInfo(json.data);
        } catch (error) {
            console.log("Error fetching menu: ", error);
        }
    };
    return resInfo
};
export default useRestaurantMenu;