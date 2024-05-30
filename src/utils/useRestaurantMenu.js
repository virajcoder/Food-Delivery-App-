import { useEffect, useState } from "react";
import { MENU_API } from "../utils/constants";

const useRestaurantMenu = (resId) => {
    const [resInfo, setResInfo] = useState(null)

     useEffect(() => {
        fetchMenu();
    }, []);

    const fetchMenu = async () => {
        try {
            const proxyUrl = 'https://api.allorigins.win/raw?url=';
            const response = await axios.get(proxyUrl + encodeURIComponent(MENU_API + resId));
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