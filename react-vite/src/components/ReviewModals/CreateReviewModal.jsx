import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useModal } from '../../context/Modal'
import { useParams } from 'react-router-dom'
import { loadShopDetailsThunk } from '../../redux/shops'
import { BeanRating } from './BeanRating'
import { createReviewThunk } from '../../redux/reviews'
import './CreateReviewModal.css'

function CreateReviewModal({setIsNewReview}) {

    const [review, setReview] = useState('')
    const [beans, setBeans] = useState(0)
    const [img1, setImg1] = useState('')
    const [img2, setImg2] = useState('')
    const [img3, setImg3] = useState('')
    const [errors, setErrors] = useState({})

    // const [errors, setErrors] = useState({})

    const { closeModal } = useModal()

    const { id } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadShopDetailsThunk(id))
    }, [id, dispatch])

    const shop = useSelector((state) => state.shops.shopDetails)
    // console.log(shop)

    const err = {}
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (beans < 1) {
            err.beans = "Please choose between 1 and 5 beans." 
            setErrors(err)

        } else {

            const reviewData = {
                review,
                rating: beans,
                img_url1: (img1.length > 0 && img1),
                img_url2: (img2.length > 0 && img2),
                img_url3: (img3.length > 0 && img3)
            }

            dispatch(createReviewThunk(reviewData, id)).then(() => setIsNewReview(true)).then(() => closeModal())
        }

    }


    return (
        <div className='whole-form'>
            <h1>{shop && shop.name}</h1>
            <div className='errors'>{errors.beans}</div>
            <form onSubmit={handleSubmit} className='form'>
                <BeanRating setBeans={setBeans} filledBeans={beans} />
                <input className='review'
                    type='text'
                    placeholder='Leave your review here...'
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    required
                />
                <input className='img'
                    type='text'
                    placeholder='img url here'
                    value={img1}
                    onChange={(e) => setImg1(e.target.value)}

                />
                <input className='img'
                    type='text'
                    placeholder='img url here'
                    value={img2}
                    onChange={(e) => setImg2(e.target.value)}

                />
                <input className='img'
                    type='text'
                    placeholder='img url here'
                    value={img3}
                    onChange={(e) => setImg3(e.target.value)}

                />
                <button className='create-review-button' onSubmit={handleSubmit}>Create Review</button>


            </form>
        </div>
    )
}

export default CreateReviewModal
