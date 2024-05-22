import './ShopDetails.css'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadShopDetailsThunk } from '../../redux/shops'
import { useEffect } from 'react'

// use prop or context to get the shop information
// change headers to label or headers?
function ShopDetails() {
    const { id } = useParams()

    const dispatch = useDispatch()

    const shopDetails = useSelector((state) => state.shops.ShopDetails)
    // console.log(shopDetails)

    useEffect(() => {
        dispatch(loadShopDetailsThunk(id))
    }, [id, dispatch])

    return (
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
                <div className='see-all-photos-button'>See all #(total photos) photos</div>
            </div>

            <div>Menu</div>
            <div>
                <div>
                    <img src='img.png'></img>
                    insert menu items here
                </div>
            </div>
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
                    <div>insert hours here</div>
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
        </>
    )

}

export default ShopDetails
