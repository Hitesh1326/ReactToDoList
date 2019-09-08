import axios from "axios";

//TO MAKE WORK async WE NEED TO IMPLEMENT thunk MIDDLEWARE
export const fetchItems = () => dispatch => {
  dispatch(setItemsLoading());
  axios
    .get("/api/items")
    .then(res => dispatch({ type: "FETCH_ITEMS", payload: res.data }));
};

export const setItemsLoading = () => {
  return {
    type: "ITEMS_LOADING"
  };
};

export const deleteItem = (id) => dispatch => {
  axios.delete("/delete/" + id)
  .then(res => dispatch({ type: "DELETE_ITEM" , payload: id}))
}

export const addItem = (item) => dispatch => {
  axios.post("/add", item)
  .then(res => dispatch({ type: "ADD_ITEM", payload: res.data}));
};