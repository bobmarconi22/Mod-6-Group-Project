import { loadReviewsByShopIdThunk } from '../../redux/reviews'
import OpenModalButton from "../OpenModalButton";
import CreateReviewModal from '../ReviewModals/CreateReviewModal'
import BeanRating from './BeanRating'
import './ShopDetailsReviews.css'

import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

function ShopDetailsReviews({ rating, shop }) {

    const dispatch = useDispatch()
    const { id } = useParams()
    // console.log(id)
    // console.log(rating)

    const [isLoaded, setIsLoaded] = useState(false);
    const [isNewReview, setIsNewReview] = useState(false)

    const sessionUser = useSelector((state) => state.session.user);
    let reviews = Object.values(useSelector((state) => state.reviews)).filter((review) => review.shop_id === parseInt(id))
    // console.log('reviews', reviews[3].user_id)
    // console.log('sessionUser', sessionUser.id)

    // console.log('from user', reviews.find((review) => review.user_id == sessionUser.id) ? 'false' : 'true')

    useEffect(() => {
        dispatch(loadReviewsByShopIdThunk(id))
        setIsLoaded(true)
    }, [dispatch, isNewReview, shop, id])

    const reviewImagesMapper = (review) => {
        return review.images?.map((image, id) => {
            // console.log(image)
            return (
                <img key={id} className='shop-details-review-image' src={image.img_link} />
            )
        })
    }
    let reversedReviews = reviews.reverse()
    const reviewMapper =
        isLoaded && reversedReviews.map((review, id) => {
            let rating = review?.rating
            let monthsOfYear = ["January", "February", 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December']
            let month = monthsOfYear[new Date(review?.created_at).getMonth()]
            let year = new Date(review?.created_at).getFullYear()

            return (
                review.id &&
                <div key={id}>
                    <div className='first-name'>{review?.reviewer?.first_name || ''}</div>
                    <div>{review?.reviewer?.city + ', ' + review?.reviewer?.state || ''}</div>
                    <div className='rating-date'>
                        <div>{BeanRating({ rating }) || ''}</div>
                        <div className='date'>{`${month} ${year}` || ''}</div>
                    </div>
                    <div>{review?.images?.length} Photo{review?.images?.length === 1 ? '' : 's'} in this Review</div>
                    <div>{review?.review || ''}</div>
                    <div>{reviewImagesMapper(review) || ''}</div>

                    <hr></hr>
                </div>
            )
        })

    return (
        <div className='shop-reviews'>
            <div className='review-title'>Overall Rating</div>
            <div>{BeanRating({ rating })}</div>
            <div>
                {shop?.review !== null ? `${Object.values(reviews).length} review${Object.values(reviews).length === 1 ? '' : 's'}` : 'No reviews'}
            </div>
            {(!sessionUser || shop?.owner_id === sessionUser?.id || reviews.some(review => review.user_id === sessionUser.id)) ? null : (
                <OpenModalButton
                    buttonText="Write a Review"
                    className='add-review-button'
                    modalComponent={<CreateReviewModal setIsNewReview={setIsNewReview} />}
                />
            )}
            <hr />
            {shop?.review && <>{reviewMapper}</>}
        </div>
    );
}


export default ShopDetailsReviews
