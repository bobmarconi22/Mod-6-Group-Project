const LOAD_SHOPS = "LOAD_SHOPS";
const LOAD_SHOP_DETAILS = "LOAD_SHOP_DETAILS";
const CREATE_SHOP = "CREATE_SHOP";
const USER_SHOPS = "USER_SHOPS";

// Action creators
export const loadShops = (shops) => ({
  type: LOAD_SHOPS,
  shops,
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

// Thunk action creators
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

  if (res.ok) {
    const data = await res.json();
    dispatch(addShop(data));
    return data;
  }
};

export const loadShopDetailsThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/shops/${id}`);
  console.log("this is the response", response);

  if (response.ok) {
    const shop = await response.json();
    dispatch(loadShopDetails(shop));
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
  switch (action.type) {
    case LOAD_SHOPS:
      const allShops = {};
      action.shops.forEach((shop) => {
        allShops[shop.id] = shop;
      });
      return { ...state, ...allShops };
    case CREATE_SHOP:
      return { ...state, [action.payload.id]: action.payload };
    case LOAD_SHOP_DETAILS:
      return { ...state, ShopDetails: action.payload };
    case USER_SHOPS:
      const newState = { ...state, userShops: {} };
      action.payload.forEach((shop) => {
        newState.userShops[shop.id] = shop;
      });
      return newState;
    default:
      return state;
  }
};

export default shopsReducer;
