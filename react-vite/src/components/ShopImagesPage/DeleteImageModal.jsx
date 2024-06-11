import { useModal } from "../../context/Modal";
import { loadShopDetailsThunk } from "../../redux/shops";
import { useDispatch, useSelector } from "react-redux";
import { getReviewsByUserIdThunk } from "../../redux/reviews";
import { useState } from "react";

// "../../redux/reviews";

function DeleteImagesModal({ shop_id, img_id, preview_img }) {
  const [errors, setErrors] = useState("");
  const [imgLink, setImageLink] = useState("");
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  console.log("imgobj", preview_img);

  const handleSubmitNewPreview = (e) => {
    e.preventDefault();
    // console.log("SUBMIT HAPPENING")
    if (
      !imgLink.toLowerCase().endsWith(".png") &&
      !imgLink.toLowerCase().endsWith(".jpg") &&
      !imgLink.toLowerCase().endsWith(".jpeg")
    ) {
      return setErrors("Image url must be of type: png, jpg, or jpeg");
    }

    const addImageAndFetchDetails = async () => {
      let delResponse = await fetch(`/api/shops/${shop_id}/images/${img_id}`, {
        method: "DELETE",
      });
      // console.log("response=======.", response)

      if (delResponse.ok) {
        // console.log("THUNKS ARE ABOUT TO GO!")
        let response = await fetch(`/api/shops/${shop_id}/images`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ img_link: imgLink, preview_image: true }),
        });
        // console.log("RESPONSE===>", response)
        if (response.ok) {
          await dispatch(loadShopDetailsThunk(shop_id));
          await dispatch(getReviewsByUserIdThunk(sessionUser.id));
          closeModal();
        } else {
          alert("Sorry Internal Server Error!");
          closeModal();
        }
      } else {
        // console.log("ENTERING ERROR")
        const errorData = await delResponse.json();
        alert(errorData.message); // Display the error message in an alert
      }
    };

    addImageAndFetchDetails();
  };

  const deleteImage = () => {
    const deleteAndUpdateState = async () => {
      let response = await fetch(`/api/shops/${shop_id}/images/${img_id}`, {
        method: "DELETE",
      });
      // console.log("response=======.", response)

      if (response.ok) {
        // console.log("THUNKS ARE ABOUT TO GO!")
        await dispatch(loadShopDetailsThunk(shop_id));
        await dispatch(getReviewsByUserIdThunk(sessionUser.id));
        closeModal();
      } else {
        // console.log("ENTERING ERROR")
        const errorData = await response.json();
        alert(errorData.message); // Display the error message in an alert
      }
    };

    deleteAndUpdateState();
  };

  return preview_img ? (
    <div  className="delete-modal-container">
      <h1>This is a Preview Image</h1>
      <p>Would you like to replace it?</p>
      <form onSubmit={(e) => handleSubmitNewPreview(e)}>
        <label>Image Url</label>
        <input
          value={imgLink}
          onChange={(e) => setImageLink(e.target.value)}
        ></input>
        {errors.length > 0 && (
          <div>
            <p style={{ color: "#FF253F", fontSize: "12px" }}>{errors}</p>
          </div>
        )}
        <div className="delete-buttons">
          <button className="confirm-delete" type="submit">
            Replace Preview Image
          </button>
          <button
            className="cancel-delete"
            type="button"
            onClick={() => closeModal()}
          >
            No, keep it
          </button>
        </div>
      </form>
    </div>
  ) : (
    <div className="delete-modal-container">
      <h1>NO TAKEBACKSIES</h1>
      <p>Are you sure you want to delete this photo?</p>
      <i>This cannot be undone</i>
        <button className="confirm-delete" onClick={deleteImage}>
          Delete it
        </button>
        <button onClick={() => closeModal()} className="cancel-delete">
          No, Keep it!
        </button>
    </div>
  );
}

export default DeleteImagesModal;
