import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Login from "./Pages/Auth/Login.jsx";
import Home from "./Pages/Home/Home.jsx";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoute.js";
import User from "./Pages/Users/User.jsx";
import Transaction from "./Pages/Transactions/Transaction.jsx";
import Subscription from "./Pages/Subscription/Subscription.jsx";
import Toastify from "./utils/Toastify.js";
import AddUser from "./Pages/Users/AddUser.jsx";
import EditUser from "./Pages/Users/EditUser.jsx";
import AddSubscription from "./Pages/Subscription/AddSubscription.jsx";
import EditSubscription from "./Pages/Subscription/EditSubscription.jsx";
import Language from "./Pages/Language/Language.jsx";
import AddLanguage from "./Pages/Language/AddLanguage.jsx";
import EditLanguage from "./Pages/Language/EditLanguage.jsx";
import Genre from "./Pages/Genre/Genre.jsx";
import AddGenre from "./Pages/Genre/AddGenre.jsx";
import EditGenre from "./Pages/Genre/EditGenre.jsx";
import Video from "./Pages/Video/Video.jsx";
import AddVideo from "./Pages/Video/AddVideo.jsx";
import EditVideo from "./Pages/Video/EditVideo.jsx";
import Actor from "./Pages/Actor/Actor.jsx";
import AddActor from "./Pages/Actor/AddActor.jsx";
import EditActor from "./Pages/Actor/EditActor.jsx";
import Director from "./Pages/Director/Director.jsx";
import AddDirector from "./Pages/Director/AddDirector.jsx";
import EditDirector from "./Pages/Director/EditDirector.jsx";
import { toggle } from "./features/generalSlice.js";
import Category from "./Pages/Category/Category.jsx";
import AddCategory from "./Pages/Category/AddCategory.jsx";
import EditCategory from "./Pages/Category/EditCategory.jsx";
import Query from "./Pages/Query/Query.jsx";
import Profile from "./Pages/Profile/Profile.jsx";
import Coupon from "./Pages/Coupon/Coupon.jsx";
import AddCoupon from "./Pages/Coupon/AddCoupon.jsx";
import EditCoupon from "./Pages/Coupon/EditCoupon.jsx";
import ViewCategory from "./Pages/Category/ViewCategory.jsx";
import EditSequence from "./Pages/Category/EditSequence.jsx";
import Page from "./Pages/Page/Page.jsx";
import AddPage from "./Pages/Page/AddPage.jsx";
import EditPage from "./Pages/Page/EditPage.jsx";
import Gateway from "./Pages/Gateway/Gateway.js";
import ViewQuery from "./Pages/Query/ViewQuery.jsx";
import Faq from "./Pages/Faq/Faq.jsx";
import AddFaq from "./Pages/Faq/AddFaq.jsx";
import EditFaq from "./Pages/Faq/EditFaq.jsx";
import Email from "./Pages/Email/Email.jsx";
import ViewUser from "./Pages/Users/ViewUser.jsx";
import Trailer from "./Pages/Trailer/Trailer.jsx";
import Carousel from "./Pages/Carousel/Carousel.jsx";
import ViewAllVideo from "./Pages/Carousel/ViewAllVideo.jsx";
import Footer from "./components/Footer/Footer.js";
import TransactionAttempt from "./Pages/Transactions/TransactionAttempt.jsx";
import AddInnerCarousel from "./Pages/Carousel/AddInnerCarousel.jsx";
import AddOuterCarousel from "./Pages/Carousel/AddOuterCarousel.jsx";
import Contact from "./Pages/Contact/Contact.jsx";
import EditContact from "./Pages/Contact/EditContact.jsx";
import ForgotPassword from "./Pages/Auth/ForgotPassword.jsx";
import EditAbout from "./Pages/About/EditAbout.jsx";
import About from "./Pages/About/About.jsx";
import FreeVideo from "./Pages/Free/Video.jsx";
import AddFreeVideo from "./Pages/Free/AddVideo.jsx";
import EditFreeVideo from "./Pages/Free/EditVideo.jsx";

export default function Layout() {
  const { token } = useSelector((state) => state.auth);
  const { isOpen } = useSelector((state) => state.general);
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => {
        if (!isOpen && window.screen.width <= 767) {
          dispatch(toggle());
        }
      }}
      className={`${token ? "App" : ""}`}
    >
      {" "}
      {!isOpen && token && <div className="sidebar-overlay"></div>}
      {token && <Header />}
      <div style={{ overflowY: "hidden" }} className="d-flex  my-2">
        {token && <Sidebar />}
        <div
          className="mx-3 my-1 flex-1 card-container"
          style={{ overflowY: "scroll", width: "100%" }}
        >
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute>
                  <User />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/user/:id"
              element={
                <ProtectedRoute>
                  <ViewUser />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/transactions"
              element={
                <ProtectedRoute>
                  <Transaction />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/transaction-attempt"
              element={
                <ProtectedRoute>
                  <TransactionAttempt />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/contact"
              element={
                <ProtectedRoute>
                  <Contact />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/edit-contact/:id"
              element={
                <ProtectedRoute>
                  <EditContact />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/about"
              element={
                <ProtectedRoute>
                  <About />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/edit-about/:id"
              element={
                <ProtectedRoute>
                  <EditAbout />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/add-users"
              element={
                <ProtectedRoute>
                  <AddUser />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/edit-user/:id"
              element={
                <ProtectedRoute>
                  <EditUser />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/subscription"
              element={
                <ProtectedRoute>
                  <Subscription />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/add-subscription"
              element={
                <ProtectedRoute>
                  <AddSubscription />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/edit-subscription/:id"
              element={
                <ProtectedRoute>
                  <EditSubscription />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/languages"
              element={
                <ProtectedRoute>
                  <Language />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/add-language"
              element={
                <ProtectedRoute>
                  <AddLanguage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/edit-language/:id"
              element={
                <ProtectedRoute>
                  <EditLanguage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/coupons"
              element={
                <ProtectedRoute>
                  <Coupon />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/add-coupon"
              element={
                <ProtectedRoute>
                  <AddCoupon />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/edit-coupon/:id"
              element={
                <ProtectedRoute>
                  <EditCoupon />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/genres"
              element={
                <ProtectedRoute>
                  <Genre />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/add-genre"
              element={
                <ProtectedRoute>
                  <AddGenre />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/edit-genre/:id"
              element={
                <ProtectedRoute>
                  <EditGenre />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/videos"
              element={
                <ProtectedRoute>
                  <Video />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/add-video"
              element={
                <ProtectedRoute>
                  <AddVideo />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/edit-video/:id"
              element={
                <ProtectedRoute>
                  <EditVideo />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/free-videos"
              element={
                <ProtectedRoute>
                  <FreeVideo />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/add-free-video"
              element={
                <ProtectedRoute>
                  <AddFreeVideo />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/edit-free-video/:id"
              element={
                <ProtectedRoute>
                  <EditFreeVideo />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/actors"
              element={
                <ProtectedRoute>
                  <Actor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/add-actor"
              element={
                <ProtectedRoute>
                  <AddActor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/edit-actor/:id"
              element={
                <ProtectedRoute>
                  <EditActor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/directors"
              element={
                <ProtectedRoute>
                  <Director />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/add-director"
              element={
                <ProtectedRoute>
                  <AddDirector />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/edit-director/:id"
              element={
                <ProtectedRoute>
                  <EditDirector />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/categories"
              element={
                <ProtectedRoute>
                  <Category />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/view-category/:id"
              element={
                <ProtectedRoute>
                  <ViewCategory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/edit-sequence/:id"
              element={
                <ProtectedRoute>
                  <EditSequence />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/add-category"
              element={
                <ProtectedRoute>
                  <AddCategory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/edit-category/:id"
              element={
                <ProtectedRoute>
                  <EditCategory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/trailers"
              element={
                <ProtectedRoute>
                  <Trailer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/pages"
              element={
                <ProtectedRoute>
                  <Page />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/add-page"
              element={
                <ProtectedRoute>
                  <AddPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/edit-page/:id"
              element={
                <ProtectedRoute>
                  <EditPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/faqs"
              element={
                <ProtectedRoute>
                  <Faq />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/add-faq"
              element={
                <ProtectedRoute>
                  <AddFaq />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/edit-faq/:id"
              element={
                <ProtectedRoute>
                  <EditFaq />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/gateways"
              element={
                <ProtectedRoute>
                  <Gateway />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/emails"
              element={
                <ProtectedRoute>
                  <Email />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/queries"
              element={
                <ProtectedRoute>
                  <Query />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/query/:id"
              element={
                <ProtectedRoute>
                  <ViewQuery />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/carousels"
              element={
                <ProtectedRoute>
                  <Carousel />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/add-carousel"
              element={
                <ProtectedRoute>
                  <ViewAllVideo />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/add-inner-carousel/:id"
              element={
                <ProtectedRoute>
                  <AddInnerCarousel />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/add-outer-carousel"
              element={
                <ProtectedRoute>
                  <AddOuterCarousel />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>

          <>
            <Toastify />
            <Footer />
          </>
        </div>
      </div>
    </div>
  );
}
