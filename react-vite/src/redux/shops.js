const LOAD_SHOPS = "LOAD_SHOPS";
const LOAD_SHOP_DETAIL = "LOAD_SHOP_DETAIL";
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

export const loadShopDetail = (shop) => ({
  type: LOAD_SHOP_DETAIL,
  payload: shop,
});

export const userShops = (shops) => ({
  type: USER_SHOPS,
  payload: shops,
});

// Thunk action creators
export const loadShopsThunk = () => async (dispatch) => {
  const response = await fetch("/api/shops");
  if (response.ok) {
    const shops = await response.json();
    dispatch(loadShops(shops));
    return shops;
  }
};

export const createShop = (newShop) => async (dispatch) => {
  const res = await fetch("/api/shops/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newShop),
  });
  console.log(res)
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
  switch (action.type) {
    case LOAD_SHOPS:
      const allShops = {};
      action.shops.forEach((shop) => {
        allShops[shop.id] = shop;
      });
      return { ...state, ...allShops };
    case CREATE_SHOP:
      return { ...state, [action.payload.id]: action.payload };
    case LOAD_SHOP_DETAIL:
      return { ...state, ShopDetail: action.payload };
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
