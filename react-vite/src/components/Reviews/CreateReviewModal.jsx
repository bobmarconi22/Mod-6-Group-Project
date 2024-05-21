import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { useModal } from '../../context/Modal'
import { useParams } from 'react-router>-dom'


function CreateReviewModal() {

    const [review, setReview] = useState('')
    const [beans, setBeans] = useState(0)
    const [errors, setEerrors] = useState({})

    const {closeModal} = useModal()



    //const shop = useSelector((state => state.shop.)


    const dispatch = useDispatch()

    return (
        <>
            <h1>{shop.name}</h1>
        </>
    )
}

export default CreateReviewModal