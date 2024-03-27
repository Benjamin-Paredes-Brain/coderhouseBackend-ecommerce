import { useEffect, useState } from "react";
import axios from 'axios';

export const withItemData = (Component) => {
    const WithItemData = (props) => {
        const [loading, setLoading] = useState(true);
        const [itemData, setItemData] = useState([]);
        const [prevLink, setPrevLink] = useState(null);
        const [nextLink, setNextLink] = useState(null);

        const fetchData = async (url = "https://coderhousebackend-ecommerce-api-production.up.railway.app/api/products") => {
            try {
                const response = await axios.get(url);

                if (response.status === 200) {
                    setItemData(response.data.payload.docs);
                    setPrevLink(response.data.prevLink);
                    setNextLink(response.data.nextLink);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        useEffect(() => {
            fetchData();
        }, []);

        return <Component {...props} loading={loading} itemData={itemData} prevLink={prevLink} nextLink={nextLink} fetchData={fetchData} />;
    };

    return WithItemData;
};