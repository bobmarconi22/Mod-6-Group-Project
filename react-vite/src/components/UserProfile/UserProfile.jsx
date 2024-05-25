import { useDispatch, useSelector } from "react-redux";
import "./UserProfile.css";
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import {
  deleteReviewThunk,
  getReviewsByUserIdThunk,
} from "../../redux/reviews";
import {
  deleteShopThunk,
  getShopsByUserIdThunk,
  loadShopsThunk,
} from "../../redux/shops";
import { useNavigate } from "react-router-dom";
import { UpdateReviewModal } from "../ReviewModals";
import OpenModalButton from "../OpenModalButton";
import { BeanRating } from "./BeanRatingModal";
import { FaTrashAlt } from "react-icons/fa";
import NotListItemModal from "../NotListItemModal";
import DeleteImagesModal from "../ShopImagesPage/DeleteImageModal";
import { DeleteReviewModal } from "../ReviewModals";
import { DeleteShopModal } from "../ShopFormPage/DeleteShopModal";

// use prop or context to get the shop information
// change headers to label or headers?

function UserProfile() {
  const sessionUser = useSelector((state) => state.session.user);
  const userReviews = useSelector((state) => state.reviews.userReviews);
  const userShops = useSelector((state) => state.shops.userShops || {});

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [reviewIsDeleted, setReviewIsDeleted] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // if (isLoaded) console.log("userReview", userReviews)

  useEffect(() => {
    if (sessionUser) {
      dispatch(getReviewsByUserIdThunk(sessionUser.id)).then(() => {});
      dispatch(getShopsByUserIdThunk(sessionUser.id)).then(() => {
        setIsLoaded(true);

        setIsSubmitted(false);
        setReviewIsDeleted(false);
      });
    }
  }, [dispatch, sessionUser, isSubmitted, reviewIsDeleted]);

  const handleReviewDelete = async (id) => {
    dispatch(deleteReviewThunk(id));
  };

  const handleShopUpdate = async (id) => {
    navigate(`/shop/${id}/update`);
  };

  const handleShopDelete = (id) => {
    // console.log('===>', id)
    dispatch(deleteShopThunk(id.toString()));
    dispatch(getShopsByUserIdThunk(sessionUser.id));
    dispatch(loadShopsThunk());
  };

  return (
    isLoaded && (
      <>
        <h1 id="user-page-title">Hi, {sessionUser.username}!</h1>
        <div id="profile-info">
          <h2 className="user-page-subtitle">User Info</h2>
          <FaUserCircle />
          <div>
            <h4>
              {sessionUser.first_name} {sessionUser.last_name}{" "}
            </h4>
            <button id="user-profile-edit" onClick={() => alert('Feature Coming Soon!')}>Edit Info</button>
            <p>
              {sessionUser.city}, {sessionUser.state}
            </p>
            <p>Email: {sessionUser.email}</p>
            <p>Phone: {sessionUser.phone_number || <a>Add a Number</a>}</p>
            <p>
              Total reviews:{" "}
              {(userReviews && Object.values(userReviews).length) || (
                <a>Add a Review!</a>
              )}
            </p>
            <p>
              Number of Shops Listed:{" "}
              {(userShops && Object.values(userShops).length) || (
                <a>Add a Shop!</a>
              )}
            </p>
          </div>
        </div>
        {isLoaded && (
          <div className="profile-section">
            <h2 id="user-page-subtitle">Your Reviews</h2>
            {userReviews &&
              Object.values(userReviews).map((review) => (
                <>
                <div onClick={() => navigate(`/shops/${review.shop_id}`)}>
                  <div className="profile-review-tile">
                    <h4>{review.shop.name}</h4>
                    <div className="beans">
                      <BeanRating beanRating={review.rating} />
                    </div>
                    <p>{review.review}</p>
                    <div className="gallery">
                      {review.images.map((imageObj) => {
                        // console.log("REVIEW IN MAP", imageObj.id)
                        // console.log("revew shop id", review.shop_id)
                        return (
                          <div key={imageObj.img_link} className="container">
                            <div
                              className="shop-image"
                              alt={review.shop.name}
                              style={{
                                backgroundImage: `url(${imageObj.img_link})`,
                              }}
                            ></div>
                            <div className="overlay-div2">
                              <button onClick={(e) => e.stopPropagation()}>
                                <NotListItemModal
                                  itemText={<FaTrashAlt className="trashcan" />}
                                  modalComponent={
                                    <DeleteImagesModal
                                      shop_id={review.shop_id}
                                      img_id={imageObj.id}
                                    />
                                  }
                                ></NotListItemModal>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <p>{review.created_at}</p>
                  </div>
                  </div>
                  <OpenModalButton
                    buttonText="Edit Review"
                    className='cancel-delete'
                    modalComponent={
                      <UpdateReviewModal
                        reviewToEdit={review}
                        setIsSubmitted={setIsSubmitted}                    reviewShopName={review.shop.name}
                      />
                    }
                  />
                  <OpenModalButton
                    buttonText="Delete Review"
                    className='confirm-delete'
                    modalComponent={
                      <DeleteReviewModal
                        reviewToDelete={review}
                        setReviewIsDeleted={setReviewIsDeleted}
                      />
                    }
                  />

                </>
              ))}
          <div className="profile-spacer"></div>
          </div>
        )}

        {isLoaded && (
          <div className="profile-section">
            <div id="user-profile-header" className="user-page-subtitle">
              <h2>Your Shops</h2>
              <button
                id="new-shop-button"
                onClick={() => navigate("/new-shop")}
              >
                Create a Shop
              </button>
            </div>

            {userShops &&
              Object.values(userShops).map((shop) => (
                <>
                  <div className='profile-shop-tile' onClick={() => navigate(`/shops/${shop.id}`)}>
                    <img src="img.png"></img>
                    <div className="user-shop-text">{shop.name}</div>
                    <p>
                      {shop.address.address_line1} {shop.address.address_line2}{" "}
                      {shop.address.city}, {shop.address.state},{" "}
                      {shop.address.postal_code}
                    </p>
                    <div className="user-shop-text">
                      {"Rating: " +
                        shop.avg_rating +
                        " Number of Reviews: " +
                        shop.num_reviews}
                    </div>
                    <div className="user-shop-text">
                      {"Price Range: " + shop.price_range}
                      <div>{"categories: " + shop.categories}</div>
                    </div>
                  </div>
                  <button
                    className="cancel-delete"
                    onClick={() => navigate(`/shops/${shop.id}/update`)}
                  >
                    Update Shop
                  </button>
                  <OpenModalButton
                    buttonText="Delete Shop"
                    className='confirm-delete'
                    modalComponent={
                      <DeleteShopModal
                        shopToDelete={shop}
                        setIsSubmitted={setIsSubmitted}
                      />
                    }
                  />
                <div className="profile-spacer"></div>
                </>
              ))}
          </div>
        )}
      </>
    )
  );
}

export default UserProfile;
