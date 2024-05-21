// const LOAD_SHOPS = "LOAD_SHOPS'
const CREATE_SHOP = "CREATE_SHOP";
const LOAD_SHOP_DETAIL = 'LOAD_SHOP_DETAIL";
const CREATE_SHOP = "CREATE_SHOP";
const LOAD_SHOP_DETAILS = 'LOAD_SHOP_DETAIL'

// action creator
export const loadShops = (shops) => ({
  type: LOAD_SHOPS,
  shops
})

export const addShop = (shop) => ({
  type: CREATE_SHOP,
  payload: shop,
});

export const loadShopDetails = (shop) => ({
  type: LOAD_SHOP_DETAILS,
  payload: shop,
})

// thunk action creators
export const loadShopsThunk = () => async (dispatch) => {
  const response = await fetch('/api/shops')
  console.log('this is the response', response)

  if (response.ok) {
    const shops = await response.json()
    dispatch(loadShops(shops))
    return shops
  }
}

export const createShop = (newShop) => async (dispatch) => {
  const res = await fetch("/api/shops", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newShop),
  });
  const data = await res.json();
  dispatch(addShop(data));
  return data
};

export const loadShopDetailsThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/shops/${id}`)
  console.log('this is the response', response)

  if (response.ok) {
    const shop = await response.json()
    dispatch(loadShopDetails(shop))
    return shop
  }
}

const shopsReducer = (state = {}, action) => {
  let allShops = {};
  let newState = {};

  switch (action.type) {
    case LOAD_SHOPS:
      action.shops.forEach(shop => {
        allShops[shop.id] = shop
      });
      return allShops
    case CREATE_SHOP: {
      newState = { ...state };
      newState = { ...state, [action.payload.id]: action.payload };
      return newState;
    }
    case LOAD_SHOP_DETAILS: {
      newState = { ...state, 'ShopDetails': action.payload }
      return newState;
    }
    default:
      return state;
  }
}


export default shopsReducer;
