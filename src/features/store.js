import { configureStore } from "@reduxjs/toolkit";
import generalReducer from "./generalSlice";
import authSlice from "./authSlice";
import userSlice from "./userSlice";
import transactionSlice from "./transactionSlice";
import planSlice from "./planSlice";
import languageSlice from "./languageSlice";
import genreSlice from "./genreSlice";
import getURLSlice from "./getURLSlice";
import videoSlice from "./videoSlice";
import actorSlice from "./actorSlice";
import directorSlice from "./directorSlice";

export default configureStore({
  reducer: {
    general: generalReducer,
    auth: authSlice,
    user: userSlice,
    transaction: transactionSlice,
    plan: planSlice,
    language: languageSlice,
    genre: genreSlice,
    url: getURLSlice,
    video: videoSlice,
    actor: actorSlice,
    director: directorSlice,
  },
});
