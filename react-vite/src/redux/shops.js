const LOAD_SHOPS = "/shops/LOAD_SPOTS";
const CREATE_SHOP = "CREATE_SHOP";

// action creator
export const loadShops = (shops) => ({
  type: LOAD_SHOPS,
  shops,
});

export const addShop = (shop) => ({
  type: CREATE_SHOP,
  payload: shop,
});

// thunk action creators
export const loadShopsThunk = () => async (dispatch) => {
  const response = await fetch("/api/shops");

  if (response.ok) {
    const shops = await response.json();
    shops.forEach(shop => console.log(shop))

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
  if (res.ok){
    const data = await res.json();
    dispatch(addShop(data));
    return data;
  }
};

// shops reducer
const shopsReducer = (state = {}, action) => {
  const allShops = {};
  switch (action.type) {
    case LOAD_SHOPS:{
      // flattening shops data into object
      action.shops.forEach((shop) => {
        allShops[shop.id] = shop;
      });
      return allShops;
    }
    case CREATE_SHOP:{
      const newState = { ...state };
      newState.shops = { ...state.shops, [action.payload.id]: action.payload };
      return newState;
    }
    default:
      return state;
  }
};

export default shopsReducer;
