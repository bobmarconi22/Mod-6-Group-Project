import './ShopDetails.css'
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadShopDetailsThunk } from '../../redux/shops'
import { useEffect, useState } from 'react'
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import ShopImagesModal from '../ShopImagesModal';
import ShopDetailsReviews from '../ShopDetailsReviews';

// use prop or context to get the shop information
// change headers to label or headers?
function ShopDetails() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false);
    const sessionUser = useSelector((state) => state.session.user);

    const shopDetails = useSelector((state) => state.shops.ShopDetails)
    // if (isLoaded) console.log(shopDetails)
    useEffect(() => {
        dispatch(loadShopDetailsThunk(id))
        setIsLoaded(true);
    }, [id, dispatch])

    return (
        isLoaded && (
            <>
                <div id='shop-detail-cover-container'>

                    <img src='img.png' />
                    <div className='shop-detail-heading-container'>
                        <div>{shopDetails?.name}</div>
                        <div>{'Avg Rating: ' + shopDetails?.avg_rating} {' Num Reviews: ' + shopDetails?.num_reviews}</div>
                        <div>{shopDetails?.price_range}</div>
                        <div>{shopDetails?.categories}</div>
                        {/* hours not working because how it is formatted */}
                        {/* <div>see hours</div> */}
                    </div>
                    <Link to={`images`}>
                        <button className='see-all-photos-button'>See all #{shopDetails?.image.length} photos</button>
                    </Link>
                    {/* shop details is checked before it gets the information, must check if shopdetails exists */}
                    {sessionUser && shopDetails && sessionUser.id === shopDetails.owner_id ? (<button>
                        <OpenModalMenuItem
                            itemText="Add an Image"
                            modalComponent={<ShopImagesModal shop_id={shopDetails.id} user_id={sessionUser.id} shop_name={shopDetails.name} />}
                        />
                    </button>) : null}

                </div>
                {/* <div>Menu</div>
            <div>
                <div>
                    <img src='img.png'></img>
                    insert menu items here
                </div>
            </div> */}
                <div id='shop-detail-additional-info-container'>
                    <a href={shopDetails?.website}>{shopDetails?.website}</a>
                    {/* shop details address not finished, spread it out/break down values */}
                    {/* <div>{(shopDetails?.address)}</div> */}
                    {/* reformat phone number to be in (###)###-#### */}
                    <div>{shopDetails?.phone_number}</div>
                </div>

                <div id='hours-address-container'>
                    <div>
                        {/* hours not working because how it is formatted */}
                        All hours
                        <div>
                        <p>Monday: {shopDetails?.hours?.Monday}</p>
                        <p>Tuesday: {shopDetails?.hours?.Tuesday}</p>
                        <p>Wednesday: {shopDetails?.hours?.Wednesday}</p>
                        <p>Thursday: {shopDetails?.hours?.Thursday}</p>
                        <p>Friday: {shopDetails?.hours?.Friday}</p>
                        <p>Saturday: {shopDetails?.hours?.Saturday}</p>
                        <p>Sunday: {shopDetails?.hours?.Sunday}</p>

                        </div>
                    </div>
                    <div>
                        Address
                        <img src='img.png' />
                        <button>Get Directions</button>
                    </div>
                </div>

                <div>
                    About {shopDetails?.name}
                    <div>
                        {shopDetails?.description}
                    </div>
                </div>
                <ShopDetailsReviews rating={shopDetails?.avg_rating} />
            </>
        )
    )
}

export default ShopDetails
