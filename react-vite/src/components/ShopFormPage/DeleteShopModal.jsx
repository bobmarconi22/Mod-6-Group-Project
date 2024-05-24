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
            <div>
              <h1>NO TAKEBACKSIES</h1>
            </div>
            <p>Are you sure you want to delete this shop?</p>
            <button className='confirm-delete' onClick={() => handleDelete(shopToDelete.id)}>Delete Shop</button>
            <button className='stop-delete' onClick={() => closeModal()}>Keep Shop</button>
        </div>
    )


}

export { DeleteShopModal }
