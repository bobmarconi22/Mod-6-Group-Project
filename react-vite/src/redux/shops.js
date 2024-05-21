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
            action.shops.Shops.forEach(shop => {
                allShops[shop.id] = shop
            });
            return { ...state, allShops }
        default:
            return state
    }
}

export default shopsReducer
