import { useDispatch} from 'react-redux'
// import { useEffect, useState } from 'react'
import { useModal } from '../../context/Modal'
import { deleteShopThunk } from '../../redux/shops'

function DeleteShopModal ({shopToDelete, setIsSubmitted}) {

    const dispatch = useDispatch()
    const { closeModal } = useModal()

    console.log(shopToDelete)

    const handleDelete = (e) => {
        e.preventDefault
        dispatch(deleteShopThunk(shopToDelete.id)).then(() => setIsSubmitted(true)).then(() => closeModal())
    }

    return (
        <div className='delete-modal-container'>
              <h1>NO TAKEBACKSIES</h1>
            <p>Are you sure you want to delete this shop?</p>
            <i>This cannot be undone</i>
            <button className='confirm-delete' onClick={() => handleDelete(shopToDelete.id)}>Delete it</button>
            <button className='cancel-delete' onClick={() => closeModal()}>No, Keep it!</button>
        </div>
    )


}

export { DeleteShopModal }
