import './ShopDetails.css'
import { Link, useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadShopDetailsThunk } from '../../redux/shops'
import { useEffect, useState } from 'react'
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import ShopImagesModal from '../ShopImagesModal';
import ShopDetailsReviews from '../ShopDetailsReviews';
import BeanRating from '../ShopCardMaker/BeanRating';

// use prop or context to get the shop information
// change headers to label or headers?
function ShopDetails() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false);
    const [showHours, setShowHours] = useState(false);
    const sessionUser = useSelector((state) => state.session.user);
    const navigate = useNavigate()

    const shopDetails = useSelector((state) => state.shops.shopDetails)
    // if (isLoaded) console.log(shopDetails)

    const addressFormatter = (shopDetails) => {
        return (
            <div className='address-text'>
                <p>{shopDetails.address.address_line1 ? shopDetails.address.address_line1 : ''} {shopDetails.address.address_line2 ? shopDetails.address.address_line2 : ''}
                {shopDetails.address.city ? shopDetails.address.city : ''}, {shopDetails.address.state ? shopDetails.address.state : ''} {shopDetails.address.postal_code ? shopDetails.address.postal_code : ''} {shopDetails.address.country ? shopDetails.address.country : ''}</p>
            </div>
        )
    }

    useEffect(() => {

        dispatch(loadShopDetailsThunk(id)).then(() => setIsLoaded(true))
        // setIsLoaded(true);
    }, [id, dispatch])

    let avg_rating = shopDetails?.avg_rating
    return ( !isLoaded && <></> ||
        parseInt(id) === shopDetails?.id && (
            <>
                <div id='shop-detail-cover-container'>
                    <img src={shopDetails?.image.find((img) => img.preview_image === true)?.img_link} id='prev-img' />
                    <div className='shop-detail-heading-container'>
                        <div id='title'>{shopDetails?.name}</div>
                        <div id='rating-container'>
                            <div>{BeanRating({ avg_rating })}</div>
                            <div>{`(${shopDetails?.num_reviews} reviews)`}</div>
                            <div id='shop-details-address'>{(shopDetails?.address &&
                            addressFormatter(shopDetails)
                        )}</div>
                        </div>
                        <div id='price-categories-container'>
                            <div>{'$'.repeat(shopDetails?.price_range)}</div>
                            <div className='separator'>○</div>
                            <div id='categories'>{shopDetails?.categories?.map((category, i) => {
                                return (<div key={i} className="category-tag" onClick={() => navigate(`/search?category=${category.split(' ').join('+')}`)}>{category}</div>)

                            })}</div>
                        </div>
                    </div>
                    <Link to={`images`}>
                        <button className='see-all-photos-button'>See all #{shopDetails?.image?.length} photos</button>
                    </Link>
                    {/* shop details is checked before it gets the information, must check if shopdetails exists */}
                    {sessionUser && shopDetails && sessionUser.id === shopDetails.owner_id ? (
                        <button id='add-image-button'>
                            <OpenModalMenuItem
                                itemText="Add an Image"
                                className='add-image-button'
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

                <div id='about-section'>
                    About {shopDetails?.name}:
                    <div>
                        {shopDetails?.description}
                    </div>
                </div>

                <div className='additional-info-flexbox-container'>
                    <div>

                            {shopDetails?.hours?.monday === 'Closed' && shopDetails?.hours?.tuesday === 'Closed' && shopDetails?.hours?.wednesday === 'Closed' && shopDetails?.hours?.thursday === 'Closed' && shopDetails?.hours?.friday === 'Closed' && shopDetails?.hours?.saturday === 'Closed' && shopDetails?.hours?.sunday === 'Closed' ? <>No Hours Specified For this Café</> :
                            <div className={showHours ? 'hours-container' : 'hours-container-hidden'}>
                                <p>All Hours</p>
                                <p>Monday: {shopDetails?.hours?.monday}</p>
                                <p>Tuesday: {shopDetails?.hours?.tuesday}</p>
                                <p>Wednesday: {shopDetails?.hours?.wednesday}</p>
                                <p>Thursday: {shopDetails?.hours?.thursday}</p>
                                <p>Friday: {shopDetails?.hours?.friday}</p>
                                <p>Saturday: {shopDetails?.hours?.saturday}</p>
                                <p>Sunday: {shopDetails?.hours?.sunday}</p>
                                <button onClick={()=> setShowHours(prevShow => !prevShow)}>Hours</button>
                            </div>
                            }
                    </div>
                    <div id='shop-detail-additional-info-container'>
                        <a target="_blank" href={shopDetails?.website}>{shopDetails?.website}</a>
                        {/* shop details address not finished, spread it out/break down values */}
                        {/* reformat phone number to be in (###)###-#### */}
                        <div>{shopDetails?.phone_number}</div>
                    </div>
                </div>
                <ShopDetailsReviews rating={shopDetails?.avg_rating} shop={shopDetails} />
            </>
        )
    )
}

export default ShopDetails
