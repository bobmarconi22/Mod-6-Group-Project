import { loadShopDetailsThunk } from '../../redux/shops'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import './shop-images.css'
import { Link } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import { FaTrashAlt } from "react-icons/fa";
import ShopImagesModal from '../ShopImagesModal';
import NotListItemModal from '../NotListItemModal';
import DeleteImagesModal from './DeleteImageModal';


function ShopImagesPage() {
    const { id } = useParams()
    const [isLoaded, setIsLoaded] = useState(false);
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const shopDetails = useSelector((state) => state.shops.shopDetails)

    useEffect(() => {
        const fetchShopDetails = async () => {
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
                    {sessionUser && sessionUser.id === shopDetails.owner_id && (
                        <button>
                            <NotListItemModal itemText="Add an Image"
                                modalComponent={<ShopImagesModal shop_id={shopDetails.id} user_id={sessionUser.id} shop_name={shopDetails.name} />}></NotListItemModal>
                        </button>)}
                    <div className='gallery'>
                        {shopDetails.image.map(imageObj => {
                            return (
                                <div key={imageObj.id} className='container'>

                                    <div className="shop-image" style={{ backgroundImage: `url("${imageObj.img_link}")` }}></div>
                                    {sessionUser && sessionUser.id === imageObj['user_id'] && (
                                        <>
                                            <div className='overlay-div'>
                                                <GoDotFill id='user-dot' />
                                            </div>
                                            <div className='overlay-div2'>
                                                <button>
                                                    <NotListItemModal itemText={<FaTrashAlt className='trashcan' />}
                                                        modalComponent={<DeleteImagesModal shop_id={shopDetails.id} img_id={imageObj.id} preview_img={imageObj.preview_image}/>}></NotListItemModal>
                                                </button>
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
