import { combineReducers } from "redux";
import { allsongsReducer } from "./allSongsReducer";
import { activesongsReducer, isplayingReducer } from "./activeSongReducer";

const reducers = combineReducers({
  allsongs: allsongsReducer,
  activesong_global: activesongsReducer,
  isplaying_global: isplayingReducer,
});

export default reducers;
