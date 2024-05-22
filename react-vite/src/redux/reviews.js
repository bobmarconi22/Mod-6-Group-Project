//action type constants

export const CREATE_REVIEW = 'reviews/CREATE_REVIEW'
export const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW'
export const DELETE_REVIEW = 'reviews/DELETE REVIEW'
export const USER_REVIEW = 'reviews/USER REVIEW'

// action creators

export const createReview = (review) => ({
    type: CREATE_REVIEW,
    payload: review
})

export const updateReview = (review) => ({
    type: UPDATE_REVIEW,
    payload: review
})

export const deleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    payload: reviewId
})

export const userReviews = (reviews) => ({
    type: USER_REVIEW,
    payload: reviews
})

// thunk action creators
export const createReviewThunk = (newReviewData, shopId) => async (dispatch) => {
    const res = await fetch(`/api/shops/${shopId}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
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

export const updateReviewThunk = (review) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${review.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    })
    if (res.ok) {
        const review = await res.json()
        dispatch(updateReview(review))
        return review
    } else {
        const errors = await res.json()
        return errors
    }
}

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    if (res.ok) {
        const message = await res.json()
        dispatch(deleteReview(reviewId))
        return message
    } else {
        const errors = await res.json()
        return errors
    }
}

export const getReviewsByUserIdThunk = () => async (dispatch) => {
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
    newState = {}
    switch (action.type) {
        case CREATE_REVIEW: {
            return { ...state, ...action.payload }
        }
        case USER_REVIEW: {
            newState = { ...state }
            newState.userReviews = {}
            action.payload.forEach(review => {
                newState.userReviews[review.id] = review
            });
            return newState
        }
        case UPDATE_REVIEW: {
            newState = { ...state }
            newState[action.payload.id] = action.payload
            return newState
        }
        case DELETE_REVIEW: {
            newState = { ...state }
            delete newState[action.payload]
            return newState
        }
        default:
            return state
    }

}

export default reviewReducer
