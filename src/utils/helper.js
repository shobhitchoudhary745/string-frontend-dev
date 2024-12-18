import { AiFillDashboard } from "react-icons/ai";
// import { FaVideo } from "react-icons/fa6";
import { IoLanguage } from "react-icons/io5";
import { HiMiniCreditCard } from "react-icons/hi2";
import { FaUser, FaWhatsapp } from "react-icons/fa";
import { VscListUnordered } from "react-icons/vsc";
import { TfiVideoClapper } from "react-icons/tfi";
import { BiCategory } from "react-icons/bi";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
// import { useSearchParams } from "react-router-dom";
// import { useSelector } from "react-redux";


export const firstArray = [
  {
    icon: <AiFillDashboard className="mx-2" size={18} />,
    content: "Dashboard",
    link: "/",
    arr: ["Dashboard"]
  },
  {
    icon: <TfiVideoClapper className="mx-2" size={18} />,
    content: "Videos",
    link: "/admin/videos",
    arr: ["Videos","Add Video","Edit Video"]
  },
  {
    icon: <TfiVideoClapper className="mx-2" size={18} />,
    content: "Free Videos",
    link: "/admin/free-videos",
    arr: ["Free Videos","Add Free Video","Edit Free Video"]
  },
  {
    icon: <MdEmail className="mx-2" size={18} />,
    content: "Send Email",
    link: "/admin/emails",
    arr: ["Send Email"]
  },
  {
    icon: <FaWhatsapp  className="mx-2" size={18} />,
    content: "Whatsapp",
    link: "/admin/whatsapp",
    arr: ["Whatsapp"]
  },
  // {
  //   icon: <FaVideo className="mx-2" size={18} />,
  //   content: "Sanatan Dharma",
  // },
  // {
  //   icon: <FaVideo className="mx-2" size={18} />,
  //   content: "Podcasts",
  // },
  // {
  //   icon: <FaVideo className="mx-2" size={18} />,
  //   content: "Movies",
  // },
];

export const secondArray = [
  {
    icon: <IoLanguage size={18} className="mx-2" />,
    content: "Languages",
    link: "/admin/languages",
    arr: ["Languages","Add Language","Edit Language"]
  },
  {
    icon: <VscListUnordered size={18} className="mx-2" />,
    content: "Genres",
    link: "/admin/genres",
    arr: ["Genres","Add Genre","Edit Genre"]
  },
  {
    icon: <BiCategory size={18} className="mx-2" />,
    content: "Categories",
    link: "/admin/categories",
    arr: ["Categories","Add Category","Edit Category"]
  },
  {
    icon: <AiOutlineQuestionCircle size={18} className="mx-2" />,
    content: "Queries",
    link: "/admin/queries",
    arr: ["Queries","View Query"]
  },
  {
    icon: <BiCategory size={18} className="mx-2" />,
    content: "Carousel",
    link: "/admin/carousels",
    arr: ["Carousel","Add Carousel"]
  },
  {
    icon: <BiCategory size={18} className="mx-2" />,
    content: "Trailer",
    link: "/admin/trailers",
    arr: ["Trailer"]
  },
  // {
  //   icon: <IoGiftSharp size={18} className="mx-2" />,
  //   content: "Coupons",
  //   link: "/admin/coupons",
  // },
  {
    icon: <FaUser size={18} className="mx-2" />,
    content: "Actors",
    link: "/admin/actors",
    arr: ["Actors","Add Actor","Edit Actor"]
  },
  {
    icon: <FaUser size={18} className="mx-2" />,
    content: "Directors",
    link: "/admin/directors",
    arr: ["Directors","Add Director","Edit Director"]
  },
  {
    icon: <HiMiniCreditCard size={18} className="mx-2" />,
    content: "Payment Gateways",
    link: "/admin/gateways",
    arr: ["Payment Gateways"]
  },
  {
    icon: <FaUser size={18} className="mx-2" />,
    content: "Deleted User",
    link: "/admin/deleted-user",
    arr: ["Deleted User"]
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
  {
    key: "Genres",
    value: 5,
    color: "#ff8acc",
    path: "/admin/genres",
    content: "",
  },
  {
    key: "Videos",
    value: 1,
    color: "#f9c851",
    path: "/admin/videos",
    content: "",
  },
  {
    key: "Category",
    value: 7,
    color: "#797979",
    path: "/admin/categories",
    content: "",
  },
  {
    key: "Users",
    value: 15965,
    color: "#5b69bc",
    path: "/admin/users",
    content: "Users",
  },
  {
    key: "Transaction",
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
    content: "Dashboard",
  },
  {
    key: "Weekly Revenue",
    value: 26102,
    color: "#ff8acc",
    path: "/",
    content: "Dashboard",
  },
  {
    key: "Monthly Revenue",
    value: 26102,
    color: "#f9c851",
    path: "/",
    content: "Dashboard",
  },
  {
    key: "Yearly Revenue",
    value: 26102,
    color: "#10c469",
    path: "/",
    content: "Dashboard",
  },
];

export const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    ["link", "image", "video"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "code-block"],
    [{ color: [] }, { background: [] }],
    ["clean"],
    ["paragraph"],
    [{ align: [] }],
    [{ font: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
  ],
};

export const formats = [
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code-block",
  "list",
  "bullet",
  "link",
  "image",
  "video",
  "font",
  "align",
  "color",
  "background",
  "header",
  "indent",
  "size",
  "script",
  "clean",
  "code",
  "direction",
];
