// const LOAD_SHOPS = "LOAD_SHOPS'
const LOAD_SHOPS = "LOAD_SHOPS";
const LOAD_SHOP_DETAIL = "LOAD_SHOP_DETAIL";
const CREATE_SHOP = "CREATE_SHOP";
const USER_SHOPS = "USER_SHOPS";

// action creator
export const loadShops = (shops) => ({
  type: LOAD_SHOPS,
  shops,
});

export const addShop = (shop) => ({
  type: CREATE_SHOP,
  payload: shop,
});

export const loadShopDetail = (shop) => ({
  type: LOAD_SHOP_DETAIL,
  payload: shop,
});

export const userShops = (shop) => ({
  type: USER_SHOPS,
  payload: shop,
});

// thunk action creators
export const loadShopsThunk = () => async (dispatch) => {
  const response = await fetch("/api/shops");
  console.log("this is the response", response);

  if (response.ok) {
    const shops = await response.json();
    dispatch(loadShops(shops));
    return shops;
  }
};

export const createShop = (newShop) => async (dispatch) => {
  const res = await fetch("/api/shops", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newShop),
  });
  const data = await res.json();
  dispatch(addShop(data));
  return data;
};

export const loadShopDetailsThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/shops/${id}`);
  console.log("this is the response", response);

  if (response.ok) {
    const shop = await response.json();
    dispatch(loadShopDetail(shop));
    return shop;
  }
};

export const getShopsByUserId = (id) => async (dispatch) => {
  const response = await fetch(`/api/shops/current`);
  if (response.ok) {
    const shops = await response.json();
    dispatch(userShops(shops));
    return shops;
  }
};

const shopsReducer = (state = {}, action) => {
  let allShops = {};
  let newState = {};

  switch (action.type) {
    case LOAD_SHOPS:
      action.shops.forEach((shop) => {
        allShops[shop.id] = shop;
      });
      return allShops;
    case CREATE_SHOP: {
      return { ...state, [action.payload.id]: action.payload };
    }
    case LOAD_SHOP_DETAIL: {
      const newState = { ...state };
      newState = { ...state, ShopDetail: action };
    }
    case USER_SHOPS: {
      const newState = { ...state };
      newState.userShops = {};
      action.payload.forEach((shop) => {
        newState.userShops[shop.id] = shop;
      });
      return newState;
    }
    default:
      return state;
  }
};

export default shopsReducer;
