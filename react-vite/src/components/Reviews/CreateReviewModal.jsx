import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useModal } from '../../context/Modal'
import { useParams } from 'react-router-dom'
import { loadShopDetailsThunk } from '../../redux/shops'


function CreateReviewModal() {

    const [review, setReview] = useState('')
    const [beans, setBeans] = useState(0)
    const [errors, setEerrors] = useState({})

    const {closeModal} = useModal()

    const {id} = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadShopDetailsThunk(id))
    },[dispatch])

    const shop = useSelector((state) => state.shops.ShopDetails)
    console.log(shop)

    

    return (
        <>
            <h1>{shop.name}</h1>
        </>
    )
}

export default CreateReviewModal