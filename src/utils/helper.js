import { AiFillDashboard } from "react-icons/ai";
import { FaVideo } from "react-icons/fa6";
import { IoLanguage, IoGiftSharp } from "react-icons/io5";
import { HiMiniCreditCard } from "react-icons/hi2";
import { FaUser } from "react-icons/fa";
import { VscListUnordered } from "react-icons/vsc";
import { TfiVideoClapper } from "react-icons/tfi";
import { BiCategory } from "react-icons/bi";
import { AiOutlineQuestionCircle } from "react-icons/ai";

export const firstArray = [
  {
    icon: <AiFillDashboard className="mx-2" size={18} />,
    content: "Dashboard",
    link: "/",
  },
  {
    icon: <TfiVideoClapper className="mx-2" size={18} />,
    content: "Videos",
    link: "/admin/videos",
  },
  {
    icon: <FaVideo className="mx-2" size={18} />,
    content: "Big Expose",
  },
  {
    icon: <FaVideo className="mx-2" size={18} />,
    content: "Truth",
  },
  {
    icon: <FaVideo className="mx-2" size={18} />,
    content: "Sanatan Dharma",
  },
  {
    icon: <FaVideo className="mx-2" size={18} />,
    content: "Podcasts",
  },
  {
    icon: <FaVideo className="mx-2" size={18} />,
    content: "Movies",
  },
];

export const secondArray = [
  {
    icon: <IoLanguage size={18} className="mx-2" />,
    content: "Languages",
    link: "/admin/languages",
  },
  {
    icon: <VscListUnordered size={18} className="mx-2" />,
    content: "Genres",
    link: "/admin/genres",
  },
  {
    icon: <BiCategory size={18} className="mx-2" />,
    content: "Categories",
    link: "/admin/categories",
  },
  {
    icon: <AiOutlineQuestionCircle size={18} className="mx-2" />,
    content: "Queries",
    link: "/admin/queries",
  },
  {
    icon: <IoGiftSharp size={18} className="mx-2" />,
    content: "Coupons",
  },
  {
    icon: <FaUser size={18} className="mx-2" />,
    content: "Actors",
    link: "/admin/actors",
  },
  {
    icon: <FaUser size={18} className="mx-2" />,
    content: "Directors",
    link: "/admin/directors",
  },
  {
    icon: <HiMiniCreditCard size={18} className="mx-2" />,
    content: "Payment Gateways",
  },
];

export const dashBoardArray = [
  {
    key: "Language",
    value: 4,
    color: "#caa257",
    path: "/admin/languages",
    content: "",
  },
  { key: "Genres", value: 5, color: "#ff8acc", path: "/admin/genres", content: "" },
  { key: "Movies", value: 1, color: "#f9c851", path: "/", content: "" },
  { key: "Shows", value: 7, color: "#797979", path: "/", content: "" },
  {
    key: "Users",
    value: 15965,
    color: "#5b69bc",
    path: "/admin/users",
    content: "Users",
  },
  {
    key: "Transactions",
    value: 2873,
    color: "#caa257",
    path: "/admin/transactions",
    content: "Transactions",
  },
  {
    key: "Daily Revenue",
    value: 5923,
    color: "#caa257",
    path: "/",
    content: "",
  },
  {
    key: "Weekly Revenue",
    value: 26102,
    color: "#ff8acc",
    path: "/",
    content: "",
  },
  {
    key: "Monthly Revenue",
    value: 26102,
    color: "#f9c851",
    path: "/",
    content: "",
  },
  {
    key: "Yearly Revenue",
    value: 26102,
    color: "#10c469",
    path: "/",
    content: "",
  },
];
