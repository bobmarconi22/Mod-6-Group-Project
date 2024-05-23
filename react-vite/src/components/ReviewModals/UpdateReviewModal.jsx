import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useModal } from '../../context/Modal'
import { useParams } from 'react-router-dom'
import { BeanRating } from './BeanRating'
import { updateReviewThunk } from '../../redux/reviews'



function UpdateReviewModal({ reviewToEdit, setIsSubmitted }) {

    const shop = useSelector((state) => state.shops.userShops)
    

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

        return dispatch(updateReviewThunk(updatedReview)).then(() => setIsSubmitted(true)).then(() => closeModal()).catch(async (res) => {
            const data = await res.json();
            if (data?.errors) {
                setErrors(data.errors)
            }
        })

    }

    return (
        <>
            <h1>{shop && shop[1].name}</h1>
            <form onSubmit={handleSubmit}>
                <div><span>{errors.review}</span><span>{errors.rating}</span> </div>
                <BeanRating setBeans={setBeans} filledBeans={beans} />
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
