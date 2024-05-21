const CREATE_SHOP = "CREATE_SHOP";

const addShop = (shop) => ({
  type: CREATE_SHOP,
  payload: shop,
});

export const createShop = (newShop) => async (dispatch) => {
  const res = await fetch("/api/shop", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newShop),
  });
  const data = await res.json();
  dispatch(addShop(data));
};

const initialState = { shops: {} };

const shopsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_SHOP: {
            const newState = { ...state };
            newState.shops = { ...state.shops, [action.payload.id]: action.payload };
            return newState;
        }
        default:
            return state;
    }
}


export default shopsReducer
