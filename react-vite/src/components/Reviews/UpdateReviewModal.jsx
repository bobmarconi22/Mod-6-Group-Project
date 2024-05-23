import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useModal } from '../../context/Modal'
import { useParams } from 'react-router-dom'
import { BeanRating } from './BeanRating'
import { updateReviewThunk } from '../../redux/reviews'



function UpdateReviewModal ({reviewToEdit}){

    const shop = useSelector((state) => state.shops.ShopDetails)

    const [beans, setBeans] = useState(reviewToEdit?.rating)
    const [review, setReview] = useState(reviewToEdit?.review)
    const [errors, setErrors] = useState({})

    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const handleSubmit = async (e) => {
        e.preventDefault()
        let updatedReview = {
            id: reviewToEdit.id,
            rating: beans,
            review
        }

        await dispatch(updateReviewThunk(updatedReview))

        closeModal()
    }


    return (
        <>
            <h1>{shop && shop.name}</h1>
            <form onSubmit={handleSubmit}>
                <BeanRating setBeans={setBeans} filledBeans={beans}/>
                <input className='review'
                    type='text'
                    placeholder='Leave your review here...'
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                />
                <button onSubmit={handleSubmit}>Update Review</button>
            </form>
            
        </>
    )
}

export { UpdateReviewModal }