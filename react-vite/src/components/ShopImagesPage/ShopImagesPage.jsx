import { loadShopDetailsThunk } from '../../redux/shops'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";

function ShopImagesPage() {
    const { id } = useParams()
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();
    const shopDetails = useSelector((state) => state.shops.ShopDetails)

    useEffect( () => {
        const fetchShopDetails = async() => {
        await dispatch(loadShopDetailsThunk(id))
        setIsLoaded(true);
        }

        fetchShopDetails()

    }, [id, dispatch])
        if( isLoaded) console.log(shopDetails)
    return (
        isLoaded && (
        <div>
            <h1>image loaded</h1>
        </div>
        )
    )
}

export default ShopImagesPage
