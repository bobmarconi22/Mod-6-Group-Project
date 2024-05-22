//action type constants

export const CREATE_REVIEW = 'reviews/CREATE_REVIEW'
export const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW'
export const DELETE_REVIEW = 'reviews/DELETE REVIEW'
export const USER_REVIEW = 'reviews/USER REVIEW'

// action creators

export const createReview = (review) => ({
    type: CREATE_REVIEW,
    review
})

export const deleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
})

export const userReviews = (reviews) => ({
    type: USER_REVIEW,
    reviews
})

// thunk action creators

export const createAReview = (newReviewData, shopId) => async (dispatch) => {
    const res = await fetch(`/api/shops/${shopId}/reviews`, {
        method: 'POST',
        headers: {
            'Concent-Type': 'application/json'
        },
        body: JSON.stringify(newReviewData)
    })
    if (res.ok) {
        const newReview = await res.json()
        dispatch(createReview(newReview))
        return newReview
    } else {
        const errors = await res.json()
        return errors
    }
}

export const getReviewsByUserId = (userId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/current`)
    if (res.ok) {
        const reviews = await res.json()
        dispatch(userReviews(reviews))
        return reviews
    } else {
        const errors = await res.json()
        return errors
    }
}
// reducer

const reviewReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_REVIEW: {
            return {...state, ...action.review}
        }
        case USER_REVIEW: {
            const newState = { ...state }
            newState.userReviews = {}
            action.reviews.forEach(review => {
                newState.userReviews[review.id] = review
            });
            return newState
        }
        default:
        return state
    }

}

export default reviewReducer
