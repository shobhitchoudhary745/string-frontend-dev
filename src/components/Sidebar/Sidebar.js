import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Sidebar.scss";
import { FiFilm } from "react-icons/fi";
import {
  FaSliders,
  FaDollarSign,
  FaImage,
  FaListUl,
  FaFile,
} from "react-icons/fa6";
import { LiaSlidersHSolid } from "react-icons/lia";
import { PiUsersThreeFill, PiListBulletsFill } from "react-icons/pi";
import { VscListUnordered } from "react-icons/vsc";
import { FaRegEdit } from "react-icons/fa";
import { LuPlus } from "react-icons/lu";
import { LiaTreeSolid } from "react-icons/lia";
import { HiMiniCog6Tooth } from "react-icons/hi2";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
  MdPlayCircle,
} from "react-icons/md";
import { setCurrentPage } from "../../features/generalSlice";
import { firstArray,secondArray } from "../../utils/helper";

export default function Sidebar() {
  const dispatch = useDispatch();
  const [current, setCurrent] = useState("");
  const screenWidth = window.screen.width;
  const { isOpen, currentPage } = useSelector((state) => state.general);
  
  return isOpen || screenWidth >= 768 ? (
    <nav className="nav-bar">
      <ul>
        {firstArray.map((data, index) => {
          return (
            <li
              key={index}
              onClick={() => {
                dispatch(setCurrentPage({ currentPage: data.content }));
                setCurrent("");
              }}
              className={`${currentPage === data.content ? "active" : ""}`}
            >
              {data.icon} {data.content}
            </li>
          );
        })}
      </ul>
      <ul>
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
      </ul>
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
      <ul>
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
      </ul>
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
      <ul>
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
      </ul>
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
      <ul>
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
      </ul>
      <ul>
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
      </ul>
      <div
        className={`${
          current === "Transactions" ? "sidebar_list_show" : "sidebar_list_hide"
        }`}
      >
        <div className="d-flex hidden-list align-items-center gap-3  my-2">
          <VscListUnordered size={18} /> Transactions
        </div>
        <div className="d-flex hidden-list align-items-center gap-3  my-2">
          <FaListUl size={18} /> Attempt History
        </div>
      </div>
      <ul>
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
      </ul>
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
      <ul>
        {
          secondArray.map((data, index) => {
            return (
              <li
                key={index+"keys"}
                onClick={() => {
                  dispatch(setCurrentPage({ currentPage: data.content }));
                  setCurrent("");
                }}
                className={`${currentPage === data.content ? "active" : ""}`}
              >
                {data.icon} {data.content}
              </li>
            );
          })
        }
      </ul>
      <ul>
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
      </ul>
      <div
        className={`${
          current === "Settings" ? "sidebar_list_show" : "sidebar_list_hide"
        }`}
      >
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
    </nav>
  ) : (
    <></>
  );
}
