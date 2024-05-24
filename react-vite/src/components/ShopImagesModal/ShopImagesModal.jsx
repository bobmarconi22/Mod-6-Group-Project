import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { loadShopDetailsThunk } from '../../redux/shops';



function ShopImagesModal({user_id, shop_id, shop_name}) {
    const [imgLink, setImageLink] = useState('');
    const [errors, setErrors] = useState('');
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log("SUBMIT HAPPENING")
        if(!imgLink.toLowerCase().endsWith('.png') && !imgLink.toLowerCase().endsWith('.jpg') && !imgLink.toLowerCase().endsWith('.jpeg')) {
            return setErrors("Image url must be of type: png, jpg, or jpeg")
        }


        const addImageAndFetchDetails = async() => {
        let response = await fetch(`/api/shops/${shop_id}/images`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({img_link: imgLink}),
        })
        // console.log("RESPONSE===>", response)
        if(response.ok){
             await dispatch(loadShopDetailsThunk(shop_id))
            closeModal()
        } else {
            alert("Sorry Internal Server Error!")
            closeModal()
        }
        }

        addImageAndFetchDetails()

    }


    return (
        <div className="image-form-modal">
            <h1>Add photo to {shop_name}</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>Image Url</label>
                <input value={imgLink} onChange={(e) => setImageLink(e.target.value)}></input>
                <button type="submit">Add a photo</button>
            </form>
            {errors.length > 0 && <div><p style={{color: "#FF253F", fontSize: "12px"}}>{errors}</p></div>}
        </div>
    )
}

export default ShopImagesModal
