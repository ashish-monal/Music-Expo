const activesongsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_ACTIVE_SONG":
      return action.payload;
    default:
      return state;
  }
};

const isplayingReducer = (state = false, action) => {
  switch (action.type) {
    case "SET_IS_PLAYING":
      return action.payload;
    default:
      return state;
  }
};

export { activesongsReducer, isplayingReducer };
