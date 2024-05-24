import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useModal } from '../../context/Modal'
import { deleteReviewThunk } from '../../redux/reviews'

function DeleteReviewModal ({reviewToDelete, setReviewIsDeleted}) {

    const dispatch = useDispatch()
    const { closeModal } = useModal()

    console.log(reviewToDelete)

    const handleDelete = (e) => {
        e.preventDefault 
        dispatch(deleteReviewThunk(reviewToDelete.id)).then(() => setReviewIsDeleted(true)).then(() => closeModal())
    }

    return (
        <div className='delete-modal-container'>
            <h2>Confirm Delete</h2> 
            <p>Are you sure you want to delete this review?</p>
            <button className='confirm-delete' onClick={(e) => handleDelete(reviewToDelete.id)}>Delete Review</button>
            <button className='stop-delete' onClick={() => closeModal()}>Keep Review</button>
        </div>
    )


}

export { DeleteReviewModal }