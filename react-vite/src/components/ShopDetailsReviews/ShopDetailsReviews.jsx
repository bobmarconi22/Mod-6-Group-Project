import { loadReviewsByShopIdThunk } from '../../redux/reviews'
import OpenModalButton from "../OpenModalButton";
import CreateReviewModal from '../ReviewModals/CreateReviewModal'
import BeanRating from './BeanRating'
import './ShopDetailsReviews.css'

import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

function ShopDetailsReviews({ rating }) {

    const dispatch = useDispatch()
    const { id } = useParams()
    // console.log(id)
    console.log(rating)

    const [isLoaded, setIsLoaded] = useState(false);
    const [isNewReview, setIsNewReview] = useState(false)

    let reviews = Object.values(useSelector((state) => state.reviews))
    console.log('reviews', reviews)

    useEffect(() => {
        dispatch(loadReviewsByShopIdThunk(id))
        setIsLoaded(true)
    }, [dispatch, isNewReview])

    const reviewImagesMapper = (review) => {
        return review.images?.map((image, id) => {
            // console.log(image)
            return (
                <img key={id} className='shop-details-review-image' src={image.img_link} />
            )
        })
    }

    const reviewMapper =
        isLoaded && reviews.map((review, id) => {
            let rating = review?.rating
            let monthsOfYear = ["January", "February", 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December']
            let month = monthsOfYear[new Date(review?.created_at).getMonth()]
            let year = new Date(review?.created_at).getFullYear()

            return (
                review.id &&
                <div key={id}>
                    <div>{review?.reviewer?.first_name || ''}</div>
                    <div>{review?.reviewer?.city + ', ' + review?.reviewer?.state || ''}</div>
                    <div>{BeanRating({ rating }) || ''}</div>
                    <div>{`${month} ${year}` || ''}</div>
                    <div>{review?.review || ''}</div>
                    <div>{reviewImagesMapper(review) || ''}</div>
                    <div>{review?.images.length} Photo{review?.images.length === 1 ? '' : 's'} in this Review</div>
                    <hr></hr>
                </div>
            )
        })

    return (
        <>
            <div>Overall Rating</div>
            <div>{BeanRating({ rating })}</div>
            <div>Amount of rating with coffee beans here</div>
            {/* <div>Total # of reviews: {reviews.length()}</div> */}
            <OpenModalButton
                buttonText="Write a Review"
                modalComponent={<CreateReviewModal setIsNewReview={setIsNewReview} />}
            />
            <> {reviewMapper}</>

        </>
    )
}


export default ShopDetailsReviews
