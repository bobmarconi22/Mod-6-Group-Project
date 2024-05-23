import { loadReviewsByShopIdThunk } from '../../redux/reviews'
import './ShopDetailsReviews.css'

import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

function ShopDetailsReviews() {

    const dispatch = useDispatch()
    const { id } = useParams()
    // console.log(id)

    const reviews = useSelector((state) => state.reviews)
    // console.log('reviews', reviews)

    useEffect(() => {
        dispatch(loadReviewsByShopIdThunk(id))
    }, [dispatch])

    function reviewImagesMapper(images) {
        // console.log(images)
        images?.map((image, id) => {
            return (
                <div key={id}>{image?.img_link}</div>
            )
        })

    }

    // const reviewMapper =
    //     reviews?.map((review, id) => {
    //         return (
    //             <div key={id}>
    //                 <div>{review.reviewer.first_name}</div>
    //                 <div>{review.reviewer.city + ', ' + review.reviewer.state}</div>
    //                 <div>{review.created_at}</div>
    //                 <div>{review.review}</div>
    //                 <div>{reviewImagesMapper(review.image)}</div>
    //                 <hr></hr>
    //             </div>
    //         )
    //     })



    // useEffect(() => { }, [review])



    return (
        <>
            <div>Overall Rating</div>
            <div>Amount of rating with coffee beans here</div>
            <div>Total # of reviews</div>
            <button>Write a Review NOT WORKING</button>
            {/* <>hallo</> */}
            {/* <>{reviewMapper}</> */}
        </>
    )
}


export default ShopDetailsReviews
