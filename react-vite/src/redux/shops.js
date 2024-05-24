import { loadReviewsByShopIdThunk } from "./reviews";

const LOAD_SHOPS = "LOAD_SHOPS";
const LOAD_SHOP_DETAILS = "LOAD_SHOP_DETAILS";
const CREATE_SHOP = "CREATE_SHOP";
const UPDATE_SHOP = "UPDATE_SHOP"
const DELETE_SHOP = 'DELETE_SHOP'
const USER_SHOPS = "USER_SHOPS";

// Action creators
export const loadShops = (shops) => ({
  type: LOAD_SHOPS,
  payload: shops,
});

export const addShop = (shop) => ({
  type: CREATE_SHOP,
  payload: shop,
});

export const loadShopDetails = (shop) => ({
  type: LOAD_SHOP_DETAILS,
  payload: shop,
});

export const userShops = (shops) => ({
  type: USER_SHOPS,
  payload: shops,
});

export const updateShop = (shop) => ({
  type: UPDATE_SHOP,
  payload: shop
})

export const deleteShop = (shopId) => ({
  type: DELETE_SHOP,
  payload: shopId
})

// Thunk action creators
export const loadShopsThunk = () => async (dispatch) => {
  const response = await fetch("/api/shops");
  if (response.ok) {
    const shops = await response.json();
    dispatch(loadShops(shops));
    return shops;
  } else {
    const errors = await response.json()
    return errors
  }
};

export const createShopThunk = (newShop) => async (dispatch) => {
  const res = await fetch("/api/shops/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newShop),
  });
  if (res.ok) {
    const shop = await res.json()
    dispatch(addShop(shop))
    dispatch(loadReviewsByShopIdThunk(shop.id))
    return shop
  } else {
    const errors = await res.json()
    return errors
  }
};

export const loadShopDetailsThunk = (id) => async (dispatch) => {

  const response = await fetch(`/api/shops/${id}`);
  if (response.ok) {
    const shop = await response.json();
    // console.log("SHOP IN THUNK", shop)
    dispatch(loadShopDetails(shop));
    return shop;
  } else {
    const errors = await response.json()
    return errors
  }
};

export const getShopsByUserIdThunk = () => async (dispatch) => {
  const response = await fetch(`/api/shops/current`);
  if (response.ok) {
    const shops = await response.json();
    dispatch(userShops(shops));
    return shops;
  } else {
    const errors = await res.json()
    return errors
  }
};

export const updateShopThunk = (shop, id) => async (dispatch) => {
  const response = await fetch(`/api/shops/${id}/update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(shop),
  });
  if (response.ok) {
    const shop = await response.json();
    dispatch(updateShop(shop));
    dispatch(loadReviewsByShopIdThunk(shop.id))
    return shop
  } else {
    const errors = await response.json()
    return errors
  }
}

export const deleteShopThunk = (shopId) => async (dispatch) => {
  const response = await fetch(`/api/shops/${shopId}/delete`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    const message = await response.json();
    console.log('this is the shopId', shopId)
    dispatch(deleteShop(shopId));
    return message
  } else {
    const errors = await response.json()
    return errors
  }
};
// Shops Reducer
const shopsReducer = (state = { allShops: {}, userShops: {}, shopDetails: null}, action) => {
  let newState = {}
  switch (action.type) {
    case LOAD_SHOPS: {
      // flattening
      const allShops = {};
      action.payload.forEach((shop) => {
        allShops[shop.id] = shop;
      });
      return { ...state, allShops };
    }
    case CREATE_SHOP:
      const newAllShops = {
        ...state.allShops,
        [action.payload.id]: action.payload
      }
      const newUserShops = {
        ...state.userShops,
        [action.payload.id]: action.payload
      }
      return { ...state, allShops: newAllShops, userShops: newUserShops };

    case LOAD_SHOP_DETAILS:

      return { ...state, shopDetails: action.payload };

    case USER_SHOPS:
      newState = { ...state, userShops: {} };
      action.payload.forEach((shop) => {
        newState.userShops[shop.id] = shop;
      });
      return newState;
    case UPDATE_SHOP: {

      const newAllShops = {
        ...state.allShops,
        [action.payload.id]: action.payload
      }
      const newUserShops = {
        ...state.userShops,
        [action.payload.id]: action.payload
      }
      return { ...state, allShops: newAllShops, userShops: newUserShops };
    }
    case DELETE_SHOP: {
       const newAllShops = {
        ...state.allShops,
      }
      const newUserShops = {
        ...state.userShops,
      }

      delete newAllShops[action.payload]
      delete newUserShops[action.payload]
      let newShopDetails = state.shopDetails
      if(state.shopDetails !== null && state.shopDetails.id === action.payload) {
        newShopDetails = null
      }
      return { allShops: newAllShops, userShops: newUserShops, shopDetails: newShopDetails };
    }
    default:
      return state;
  }
};

export default shopsReducer;
