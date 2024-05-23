import { loadShopDetailsThunk } from '../../redux/shops'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import './shop-images.css'
import { Link} from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import { FaTrashAlt } from "react-icons/fa";


function ShopImagesPage() {
    const { id } = useParams()
    const [isLoaded, setIsLoaded] = useState(false);
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const shopDetails = useSelector((state) => state.shops.ShopDetails)

    useEffect( () => {
        const fetchShopDetails = async() => {
        await dispatch(loadShopDetailsThunk(id))
        setIsLoaded(true);
        }

        fetchShopDetails()

    }, [id, dispatch])
        if(isLoaded) console.log(shopDetails.image)
    return (
        isLoaded && (
        <div className='shop-images-page'>
            <div className='gallery-div'>
            <h1>Photos for <Link to={`/shops/${shopDetails.id}`}>{shopDetails.name}</Link></h1>
            <div className='gallery'>
                {shopDetails.image.map(imageObj => {
                    return (
                        <div className='container'>
                    <div className="shop-image" key={imageObj.id} style={{ backgroundImage: `url(${imageObj.img_link})` }}></div>
                         {sessionUser && sessionUser.id === imageObj['user_id'] && (
                            <>
                                <div className='overlay-div'>
                                    <GoDotFill className='user-dot' />
                                </div>
                                <div className='overlay-div2'>

                                    <FaTrashAlt className='trashcan' />
                                </div>
                            </>
                         )
                    }

                    </div>
                )
                })}
            </div>
        </div>
        </div>
        )
    )
}

export default ShopImagesPage
