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
import categorySlice from "./categorySlice";
import querySlice from "./querySlice";
import couponSlice from "./couponSlice";
import pageSlice from "./pageSlice";
import homeSlice from "./homeSlice";
import faqSlice from "./faqSlice";
import trailerSlice from "./trailerSlice";
import carouselSlice from "./carouselSlice";
import contactSlice from "./contactSlice";
import aboutSlice from "./aboutSlice";
import freeVideoSlice from "./freeVideoSlice";
import deletedUserSlice from "./deletedUserSlice";

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
    category: categorySlice,
    query: querySlice,
    coupon: couponSlice,
    page: pageSlice,
    home: homeSlice,
    faq: faqSlice,
    trailer: trailerSlice,
    carousel: carouselSlice,
    contact: contactSlice,
    about: aboutSlice,
    free_video: freeVideoSlice,
    deleted_user: deletedUserSlice,
  },
});
