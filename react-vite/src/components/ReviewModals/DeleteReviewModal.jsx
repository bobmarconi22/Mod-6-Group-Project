import { useDispatch} from 'react-redux'
// import { useEffect, useState } from 'react'
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
              <h1>NO TAKEBACKSIES</h1>
            <p>Are you sure you want to delete this review?</p>
            <i>This cannot be undone</i>
            <button className='confirm-delete' onClick={() => handleDelete(reviewToDelete.id)}>Delete it</button>
            <button className='cancel-delete' onClick={() => closeModal()}>No, Keep it!</button>
        </div>
    )


}

export { DeleteReviewModal }
