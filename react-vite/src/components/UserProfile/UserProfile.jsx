import { useDispatch, useSelector } from "react-redux";
import "./UserProfile.css";
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { deleteReview, getReviewsByUserIdThunk } from "../../redux/reviews";
import { getShopsByUserIdThunk } from "../../redux/shops";
import { deleteReview, getReviewsByUserId } from "../../redux/reviews";
import { deleteShopThunk, getShopsByUserIdThunk } from "../../redux/shops";
import { useNavigate } from "react-router-dom";

// use prop or context to get the shop information
// change headers to label or headers?

function UserProfile() {
  const sessionUser = useSelector((state) => state.session.user);
  const userReviews = useSelector((state) => state.reviews.userReviews);
  const userShops = useSelector((state) => state.shops.userShops || {});
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionUser) {
      dispatch(getReviewsByUserIdThunk(sessionUser.id)).then(() => { });
      dispatch(getShopsByUserIdThunk(sessionUser.id)).then(() => {
        setIsLoaded(true);
      });
    }
  }, [dispatch, sessionUser]);

  const handleReviewUpdate = async () => {
    console.log("update review");
  };

  const handleReviewDelete = async (id) => {
    dispatch(deleteReview(id))
  };

  const handleShopUpdate = async (id) => {
    navigate(`/shop/${id}/update`)
  };

  const handleShopDelete = async (id) => {
    dispatch(deleteShopThunk(id))
  };

  return (
    isLoaded && (
      <>
        <h1 id="user-page-title">Hi, {sessionUser.username}!</h1>
        <div id="profile-info">
          <h2 id="user-page-subtitle">User Info</h2>
          <FaUserCircle />
          <div>
            <h4>
              {sessionUser.first_name} {sessionUser.last_name}{" "}
            </h4>
            <a id="user-profile-edit">Edit Info</a>
            <p>
              {sessionUser.city}, {sessionUser.state}
            </p>
            <p>Email: {sessionUser.email}</p>
            <p>Phone: {sessionUser.phone_number || <a>Add a Number</a>}</p>
            <p>
              Total reviews:{" "}
              {Object.values(userReviews).length || <a>Add a Review!</a>}
            </p>
            <p>
              Number of Shops Listed:{" "}
              {Object.values(userShops).length || <a>Add a Shop!</a>}
            </p>
          </div>
        </div>
        {isLoaded && (
          <div className="profile-section">
            <h2 id="user-page-subtitle">Your Reviews</h2>
            {Object.values(userReviews).map((review) => (
              <>
                <a
                  className="profile-review-tile"
                  onClick={() => navigate("/shops/${review.shop_id}")}
                  key={review.id}
                >
                  <h4>{review.shop.name}</h4>
                  <p>{review.rating}/5 Coffee Beans</p>
                  <p>{review.review}</p>
                  <div className="user_review_img_block">
                    {review.images.map((image, index) => (
                      <img
                        key={index}
                        src={image.img_link}
                        alt={"Review Image"}
                      />
                    ))}
                  </div>
                  <p>{review.created_at}</p>
                </a>
                <button id="update" onClick={() => handleReviewUpdate(review.id)}>
                  Update Review
                </button>
                <button id="delete" onClick={() => handleReviewDelete(review.id)}>
                  Delete Review
                </button>
              </>
            ))}
          </div>
        )}

        {isLoaded && (
          <div className="profile-section">
            <div id="user-profile-header">
              <h2>Your Shops</h2>
              <button id='new-shop-button' onClick={() => navigate('/new-shop')}>+</button>
            </div>

            {Object.values(userShops).map((shop) => (
              <>
                <a
                  className="profile-shop-tile"
                  onClick={() => navigate("/shops/${shop.id}")}
                  key={shop.id}
                >
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
                </a>
                <button id="update" onClick={() => handleShopUpdate(shop.id)}>
                  Update Shop
                </button>
                <button id="delete" onClick={() => handleShopDelete(shop.id)}>
                  Delete Shop
                </button>
              </>
            ))}
          </div>
        )}
      </>
    )
  );
}

export default UserProfile;
