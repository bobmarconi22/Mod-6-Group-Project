import { csrfFetch } from "./csrf";

const LOAD_SHOPS = '/shops/LOAD_SPOTS'

// action creator
export const loadShops = (shops) => ({
    type: LOAD_SHOPS,
    shops
})

// thunk action creators
export const loadShopsThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/shops')
    console.log('this is the response', response)

    if (response.ok) {
        const shops = await response.json()
        dispatch(loadShops(shops))
        return shops
    }
}


// shops reducer
const shopsReducer = (state = {}, action) => {
    const allShops = {};
    let newState = {};

    switch (action.type) {
        case LOAD_SHOPS:
            // flattening shops data into object
            action.shops.forEach(shop => {
                allShops[shop.id] = shop
            });
            return allShops
        default:
            return state
    }
}

export default shopsReducer
