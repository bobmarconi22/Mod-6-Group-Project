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
    return shop
  } else {
    const errors = await response.json()
    return errors
  }
}

export const deleteShopThunk = (shopId) => async (dispatch) => {
  await fetch(`/api/shops/${shopId}/delete`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    const message = await response.json();
    dispatch(deleteShop(shopId));
    return message
  } else {
    const errors = await response.json()
    return errors
  }
};
// Shops Reducer
const shopsReducer = (state = {}, action) => {
  let newState = {}
  switch (action.type) {
    case LOAD_SHOPS: {
      // flattening
      const allShops = {};
      action.payload.forEach((shop) => {
        allShops[shop.id] = shop;
      });
      return { ...state, ...allShops };
    }
    case CREATE_SHOP:
      return { ...state, [action.payload.id]: action.payload };

    case LOAD_SHOP_DETAILS:

      return { ...state, ShopDetails: action.payload };

    case USER_SHOPS:
      newState = { ...state, userShops: {} };
      action.payload.forEach((shop) => {
        newState.userShops[shop.id] = shop;
      });
      return newState;
    case UPDATE_SHOP: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload
      return newState
    }
    case DELETE_SHOP: {
      newState = { ...state }
      delete newState[action.payload]
      return newState
    }
    default:
      return state;
  }
};

export default shopsReducer;
