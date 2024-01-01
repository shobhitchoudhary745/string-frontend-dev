import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Sidebar.scss";
import { AiFillDashboard } from "react-icons/ai";
import { FiFilm } from "react-icons/fi";
import {
  FaVideo,
  FaSliders,
  FaDollarSign,
  FaImage,
  FaListUl,
  FaFile,
} from "react-icons/fa6";
import { LiaSlidersHSolid } from "react-icons/lia";
import { PiUsersThreeFill, PiListBulletsFill } from "react-icons/pi";
import { VscListUnordered } from "react-icons/vsc";
import { FaRegEdit, FaUser } from "react-icons/fa";
import { LuPlus } from "react-icons/lu";
import { LiaTreeSolid } from "react-icons/lia";
import { IoLanguage, IoGiftSharp } from "react-icons/io5";
import { HiMiniCreditCard, HiMiniCog6Tooth } from "react-icons/hi2";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
  MdPlayCircle,
} from "react-icons/md";
import { setCurrentPage } from "../../features/generalSlice";

export default function Sidebar() {
  const dispatch = useDispatch();
  const [current, setCurrent] = useState("");
  const screenWidth = window.screen.width;
  const { isOpen, currentPage } = useSelector((state) => state.general);

  return isOpen || screenWidth >= 768 ? (
    <nav className="nav-bar">
      <ul>
        <li
          onClick={() => {
            dispatch(setCurrentPage({ currentPage: "Dashboard" }));
            setCurrent("");
          }}
          className={`${currentPage === "Dashboard" ? "active" : ""}`}
        >
          <AiFillDashboard className="mx-2" size={18} /> DashBoard
        </li>
        <li
          onClick={() => {
            dispatch(setCurrentPage({ currentPage: "Big Expose" }));
            setCurrent("");
          }}
          className={`${currentPage === "Big Expose" ? "active" : ""}`}
        >
          <FaVideo size={18} className="mx-2" /> Big Expose
        </li>
        <li
          onClick={() => {
            dispatch(setCurrentPage({ currentPage: "Truth" }));
            setCurrent("");
          }}
          className={`${currentPage === "Truth" ? "active" : ""}`}
        >
          <FaVideo size={18} className="mx-2" /> Truth
        </li>
        <li
          onClick={() => {
            dispatch(setCurrentPage({ currentPage: "Sanatan Dharma" }));
            setCurrent("");
          }}
          className={`${currentPage === "Sanatan Dharma" ? "active" : ""}`}
        >
          <FaVideo size={18} className="mx-2" /> Sanatan Dharma
        </li>
        <li
          onClick={() => {
            dispatch(setCurrentPage({ currentPage: "Podcasts" }));
            setCurrent("");
          }}
          className={`${currentPage === "Podcasts" ? "active" : ""}`}
        >
          <FaVideo size={18} className="mx-2" /> Podcast
        </li>
        <li
          onClick={() => {
            dispatch(setCurrentPage({ currentPage: "Movies" }));
            setCurrent("");
          }}
          className={`${currentPage === "Movies" ? "active" : ""}`}
        >
          <FaVideo size={18} className="mx-2" /> Movies
        </li>
        <li
          onClick={() => {
            dispatch(setCurrentPage({ currentPage: "Series" }));
            setCurrent((p) => (p === "Series" ? "" : "Series"));
          }}
          className={`my-0 ${currentPage === "Series" ? "active" : ""}`}
        >
          <div className="d-flex justify-content-between">
            <div>
              <FiFilm size={18} className="mx-2" /> Series
            </div>
            <div>
              {current === "Series" ? (
                <MdKeyboardArrowDown size={18} />
              ) : (
                <MdKeyboardArrowRight size={18} />
              )}
            </div>
          </div>
        </li>

        <div
          className={`${
            current === "Series" ? "sidebar_list_show" : "sidebar_list_hide"
          }`}
        >
          <div className="d-flex hidden-list align-items-center gap-3  my-2">
            <FaImage size={18} /> Shows
          </div>
          <div className="d-flex hidden-list align-items-center gap-3  my-2">
            <LiaTreeSolid size={18} /> Seasons
          </div>
          <div className="d-flex hidden-list align-items-center gap-3  my-2">
            <VscListUnordered size={18} /> Episodes
          </div>
        </div>

        <li
          onClick={() => {
            dispatch(setCurrentPage({ currentPage: "Homes" }));
            setCurrent((p) => (p === "Home" ? "" : "Home"));
          }}
          className={`${currentPage === "Homes" ? "active" : ""}`}
        >
          <div className="d-flex justify-content-between">
            <div>
              <FaSliders size={18} className="mx-2" /> Home
            </div>
            <div>
              {current === "Home" ? (
                <MdKeyboardArrowDown size={18} />
              ) : (
                <MdKeyboardArrowRight size={18} />
              )}
            </div>
          </div>
        </li>

        <div
          className={`${
            current === "Home" ? "sidebar_list_show" : "sidebar_list_hide"
          }`}
        >
          <div className="d-flex hidden-list align-items-center gap-3  my-2">
            <PiListBulletsFill size={18} /> Home Video
          </div>
          <div className="d-flex hidden-list align-items-center gap-3  my-2">
            <LiaSlidersHSolid size={18} /> Testimonials
          </div>
          <div className="d-flex hidden-list align-items-center gap-3  my-2">
            <PiListBulletsFill size={18} /> Home Section
          </div>
          <div className="d-flex hidden-list align-items-center gap-3  my-2">
            <PiListBulletsFill size={18} /> FAQ
          </div>
        </div>

        <li
          onClick={() => {
            dispatch(setCurrentPage({ currentPage: "Users" }));
            setCurrent((p) => (p === "Users" ? "" : "Users"));
          }}
          className={`my-0 ${currentPage === "Users" ? "active" : ""}`}
        >
          <div className="d-flex justify-content-between">
            <div>
              <PiUsersThreeFill size={18} className="mx-2" /> Users
            </div>
            <div>
              {current === "Users" ? (
                <MdKeyboardArrowDown size={18} />
              ) : (
                <MdKeyboardArrowRight size={18} />
              )}
            </div>
          </div>
        </li>

        <div
          className={`${
            current === "Users" ? "sidebar_list_show" : "sidebar_list_hide"
          }`}
        >
          <div className="d-flex hidden-list align-items-center gap-3  my-2">
            <PiUsersThreeFill size={18} /> Users
          </div>
          <div className="d-flex hidden-list align-items-center gap-3  my-2">
            <PiUsersThreeFill size={18} /> Sub Admin
          </div>
        </div>

        <li
          onClick={() => {
            dispatch(setCurrentPage({ currentPage: "Subscription Plans" }));
            setCurrent("");
          }}
          className={`${currentPage === "Subscription Plans" ? "active" : ""}`}
        >
          <FaDollarSign size={18} className="mx-2" />
          Subscription Plans
        </li>
        <li
          onClick={() => {
            dispatch(setCurrentPage({ currentPage: "Transactions" }));
            setCurrent((p) => (p === "Transactions" ? "" : "Transactions"));
          }}
          className={`my-0 ${currentPage === "Transactions" ? "active" : ""}`}
        >
          <div className="d-flex justify-content-between">
            <div>
              <VscListUnordered size={18} className="mx-2" /> Transactions
            </div>
            <div>
              {current === "Transactions" ? (
                <MdKeyboardArrowDown size={18} />
              ) : (
                <MdKeyboardArrowRight size={18} />
              )}
            </div>
          </div>
        </li>

        <div
          className={`${
            current === "Transactions"
              ? "sidebar_list_show"
              : "sidebar_list_hide"
          }`}
        >
          <div className="d-flex hidden-list align-items-center gap-3  my-2">
            <VscListUnordered size={18} /> Transactions
          </div>
          <div className="d-flex hidden-list align-items-center gap-3  my-2">
            <FaListUl size={18} /> Attempt History
          </div>
        </div>

        <li
          onClick={() => {
            dispatch(setCurrentPage({ currentPage: "Pages" }));
            setCurrent((p) => (p === "Pages" ? "" : "Pages"));
          }}
          className={`mb-0 ${currentPage === "Pages" ? "active" : ""}`}
        >
          <div className="d-flex justify-content-between">
            <div>
              <FaRegEdit size={18} className="mx-2" /> Pages
            </div>
            <div>
              {current === "Pages" ? (
                <MdKeyboardArrowDown size={18} />
              ) : (
                <MdKeyboardArrowRight size={18} />
              )}
            </div>
          </div>
        </li>

        <div
          className={`${
            current === "Pages" ? "sidebar_list_show" : "sidebar_list_hide"
          }`}
        >
          <div className="d-flex hidden-list align-items-center gap-3  my-2">
            <FaFile size={18} /> Pages
          </div>
          <div className="d-flex hidden-list align-items-center gap-3  my-2">
            <LuPlus size={18} /> Add Page
          </div>
        </div>

        <li
          onClick={() => {
            dispatch(setCurrentPage({ currentPage: "Languages" }));
            setCurrent("");
          }}
          className={`${currentPage === "Languages" ? "active" : ""}`}
        >
          <IoLanguage size={18} className="mx-2" /> Languages
        </li>
        <li
          onClick={() => {
            dispatch(setCurrentPage({ currentPage: "Genres" }));
            setCurrent("");
          }}
          className={`${currentPage === "Genres" ? "active" : ""}`}
        >
          <VscListUnordered size={18} className="mx-2" /> Genres
        </li>
        <li
          onClick={() => {
            dispatch(setCurrentPage({ currentPage: "Coupons" }));
            setCurrent("");
          }}
          className={`${currentPage === "Coupons" ? "active" : ""}`}
        >
          <IoGiftSharp size={18} className="mx-2" /> Coupons
        </li>
        <li
          onClick={() => {
            dispatch(setCurrentPage({ currentPage: "Actors" }));
            setCurrent("");
          }}
          className={`${currentPage === "Actors" ? "active" : ""}`}
        >
          <FaUser size={18} className="mx-2" /> Actors
        </li>
        <li
          onClick={() => {
            dispatch(setCurrentPage({ currentPage: "Directors" }));
            setCurrent("");
          }}
          className={`${currentPage === "Directors" ? "active" : ""}`}
        >
          <FaUser size={18} className="mx-2" /> Directors
        </li>
        <li
          onClick={() => {
            dispatch(setCurrentPage({ currentPage: "Payment Gateways" }));
            setCurrent("");
          }}
          className={`${currentPage === "Payment Gateways" ? "active" : ""}`}
        >
          <HiMiniCreditCard size={18} className="mx-2" /> Payment Gateways
        </li>
        <li
          onClick={() => {
            dispatch(setCurrentPage({ currentPage: "Settings" }));
            setCurrent((p) => (p === "Settings" ? "" : "Settings"));
          }}
          className={`${currentPage === "Settings" ? "active" : ""}`}
        >
          <div className="d-flex justify-content-between">
            <div>
              <HiMiniCog6Tooth size={18} className="mx-2" /> Settings
            </div>
            <div>
              {current === "Settings" ? (
                <MdKeyboardArrowDown size={18} />
              ) : (
                <MdKeyboardArrowRight size={18} />
              )}
            </div>
          </div>
        </li>

        <div
          className={`${
            current === "Settings" ? "sidebar_list_show" : "sidebar_list_hide"
          }`}
        >
          {/* <div className={`${current==="Settings"?'sidebar_list_show':"sidebar_list_hide"}`}> */}
          <div className={` d-flex hidden-list align-items-center gap-3  my-2`}>
            <HiMiniCog6Tooth size={18} /> General
          </div>
          <div className={` d-flex hidden-list align-items-center gap-3  my-2`}>
            <MdPlayCircle size={18} /> Player Settings
          </div>
          <div className={` d-flex hidden-list align-items-center gap-3  my-2`}>
            <VscListUnordered size={18} /> CDN Settings
          </div>
          {/* </div> */}
        </div>
      </ul>
    </nav>
  ) : (
    <></>
  );
}
