const GET_CATEGORIES = "GET_CATEGORIES";

const fetchCategories = (categories) => ({
  type: GET_CATEGORIES,
  payload: categories,
});

export const getAllCategories = () => async (dispatch) => {
  const res = await fetch("/api/categories")
  if(!res.ok){
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  const data = await res.json();
  dispatch(fetchCategories(data));
};

const initialState = {
    categories: {}
  };

  const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_CATEGORIES: {
        const newState = { ...state, categories: {} };
        action.payload.forEach((category) => {
          newState.categories[category.id] = category;
        });
        return newState;
      }
      default:
        return state;
    }
  };


export default categoriesReducer
