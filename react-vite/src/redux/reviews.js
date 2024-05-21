//action type constants

export const CREATE_REVIEW = 'reviews/CREATE_REVIEW'
export const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW'
export const DELETE_REVIEW = 'reviews/DELETE REVIEW'

// action creators

export const createReview = (review) => ({
    type: CREATE_REVIEW,
    review
})

export const deleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
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

// reducer

const reviewReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_REVIEW: {
            return {...state, ...action.review}
        }
        default:
        return state
    }

}

export default reviewReducer
