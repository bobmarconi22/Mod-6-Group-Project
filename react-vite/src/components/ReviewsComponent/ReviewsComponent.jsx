import { loadReviewsByShopId } from '../../redux/reviews'
import './ReviewsComponent.css'

import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

function ReviewsComponent({ review }) {

    // const dispatch = useDispatch()

    // const { id } = useParams()
    // console.log(id)

    // const reviews = useSelector((state) => state.reviews)
    // console.log('===>', reviews)

    // useEffect(() => dispatch(loadReviewsByShopId(id)), [dispatch])
    // useEffect(() => {
    //     dispatch(loadReviewsByShopId(id))
    // }, [dispatch])
    let reviews = review
    // console.log('reviews', reviews)
    const reviewMapper = () => {
        reviews.map((review) => {
            return (
                <div>{review.name}</div>
            )
        })
    }

    return (
        <>
            <div>Overall Rating</div>
            <div>Amount of rating with coffee beans here</div>
            <div>Total # of reviews</div>
            <button>Write a Review</button>
        </>
    )
}


export default ReviewsComponent
