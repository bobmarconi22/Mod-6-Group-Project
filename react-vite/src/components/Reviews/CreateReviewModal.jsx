import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useModal } from '../../context/Modal'
import { useParams } from 'react-router-dom'
import { loadShopDetailsThunk } from '../../redux/shops'
import { BeanRating } from './BeanRating'
import { createReview } from '../../redux/reviews'


function CreateReviewModal() {

    const [review, setReview] = useState('')
    const [beans, setBeans] = useState(0)
    const [img1, setImg1] = useState('')
    const [img2, setImg2] = useState('')
    const [img3, setImg3] = useState('')

    const [errors, setEerrors] = useState({})

    const {closeModal} = useModal()

    const {id} = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadShopDetailsThunk(id))
    },[dispatch])

    const shop = useSelector((state) => state.shops.ShopDetails)
    console.log(shop)


  const handleSubmit = async (e) => {
    e.preventDefault()
    const reviewData = {
        user_id: current_user.id,
        shop_id: id,
        review,
        rating,
        ...(img1.length > 0 && img1),
        ...(img2.length > 0 && img2),
        ...(img3.length > 0 && img3)
    }

    return dispatch(createReview(reviewData, spotId)).then(() => closeModal())
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
                <button onSubmit={handleSubmit}>Create Review</button>


            </form>
        </>
    )
}

export default CreateReviewModal