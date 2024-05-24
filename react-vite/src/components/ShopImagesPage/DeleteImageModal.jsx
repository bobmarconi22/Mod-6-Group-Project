import { useModal } from '../../context/Modal';
import { loadShopDetailsThunk } from '../../redux/shops';
import { useDispatch } from "react-redux";

function DeleteImagesModal({shop_id, img_id}){
    const { closeModal } = useModal();
    const dispatch = useDispatch()

    const deleteImage = () => {
        const deleteAndUpdateState = async () => {

                let response = await fetch(`/api/shops/${shop_id}/images/${img_id}`, {
                    method: 'DELETE',
                });
                // console.log("response=======.", response.ok)

                if (response.ok) {
                    await dispatch(loadShopDetailsThunk(shop_id));
                    closeModal();
                } else {
                    // console.log("ENTERING ERROR")
                    const errorData = await response.json();
                    alert(errorData.message);  // Display the error message in an alert
                }

        };

        deleteAndUpdateState()

    }

    return (
        <div>
            <h1>NO TAKEBACKSIES</h1>
           <p>Are you sure you want to delete this photo?</p>
           <div>
           <button id="delete-button" onClick={deleteImage}>Delete it</button>
           <button onClick={closeModal}>No, keep it</button>
           </div>
        </div>
    )
}

export default DeleteImagesModal
