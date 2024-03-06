import { toast } from "react-toastify";
import axios from "../utils/axiosUtil";
import { setPlan, setPlans } from "./planSlice";
import { setTransactions } from "./transactionSlice";
import { setUser, setUsers } from "./userSlice";
import { setLanguage, setLanguages } from "./languageSlice";
import { setGenre, setGenres } from "./genreSlice";
import { setURL } from "./getURLSlice";
import { setCategoryVideos, setVideo, setVideos } from "./videoSlice";
import { setActor, setActors } from "./actorSlice";
import { setDirector, setDirectors } from "./directorSlice";
import {
  setCategories,
  setCategory,
  setCategory_videos,
} from "./categorySlice";
import { setQueries, setQuery } from "./querySlice";
import { setCoupon, setCoupons } from "./couponSlice";
import { setPage, setPages } from "./pageSlice";
import { setHomeData } from "./homeSlice";
import { setFaq, setFaqs } from "./faqSlice";
import { setLoading } from "./generalSlice";
import * as XLSX from "xlsx";
import { setTrailers } from "./trailerSlice";
import { setCarousels } from "./carouselSlice";
import { setContacts } from "./contactSlice";

export const getAllUsers = async (
  dispatch,
  token,
  curPage,
  resultPerPage,
  query,
  plan_name,
  plan_type
) => {
  try {
    dispatch(setLoading());
    const { data } = await axios.get(
      `/api/admin/get-all-users?keyword=${query}&resultPerPage=${resultPerPage}&currentPage=${curPage}&plan_name=${plan_name}&plan_type=${plan_type}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (data.success) {
      dispatch(setLoading());
      dispatch(
        setUsers({
          users: data.users,
          userCount: data.userCount,
          filteredUsers: data.filteredUsers,
        })
      );
    }
  } catch (error) {
    dispatch(setLoading());
    toast.error(error.message);
    console.log(error);
  }
};

export const getAllTransactions = async (
  dispatch,
  token,
  curPage,
  resultPerPage,
  gateway,
  date,
  query,
  status
) => {
  try {
    let input_date = null;
    if (date) input_date = new Date(date);
    dispatch(setLoading());
    const { data } = await axios.get(
      `/api/transaction/get-all-transaction?gateway=${gateway}&status=${status}&from=${input_date}&keyword=${query}&resultPerPage=${resultPerPage}&currentPage=${curPage}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (data.success) {
      dispatch(setLoading());
      dispatch(
        setTransactions({
          transactions: data.transactions,
          transactionCount: data.transactionCount,
          filteredTransactions: data.filteredTransactions,
        })
      );
    }
  } catch (error) {
    dispatch(setLoading());
    toast.error(error.message);
    console.log(error);
  }
};

export const getAllPlans = async (dispatch, token) => {
  try {
    dispatch(setLoading());
    const { data } = await axios.get(`/api/plan/get-plans`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (data.success) {
      dispatch(setLoading());
      dispatch(setPlans({ plans: data.plans }));
    }
  } catch (error) {
    dispatch(setLoading());
    toast.error(error.message);
    console.log(error);
  }
};

export const getAllLanguages = async (dispatch, token) => {
  try {
    const { data } = await axios.get(`/api/language/get-languages`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (data.success) {
      // console.log(data)
      dispatch(setLanguages({ languages: data.languages }));
    }
  } catch (error) {
    toast.error(error.message);
    console.log(error);
  }
};

export const getAllGenres = async (dispatch, token) => {
  try {
    const { data } = await axios.get(`/api/genre/get-genres`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (data.success) {
      // console.log(data)
      dispatch(setGenres({ genres: data.genres }));
    }
  } catch (error) {
    toast.error(error.message);
    console.log(error);
  }
};

export const getUser = async (dispatch, token, id) => {
  try {
    const { data } = await axios.get(`/api/admin/get-user/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (data.success) {
      dispatch(
        setUser({ user: data.user, user_transactions: data.user_transactions })
      );
    }
  } catch (error) {
    toast.error(error.message);
    console.log(error);
  }
};

export const getPlan = async (dispatch, token, id) => {
  try {
    const { data } = await axios.get(`/api/plan/get-plan/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (data.success) {
      dispatch(setPlan({ plan: data.plan }));
    }
  } catch (error) {
    toast.error(error.message);
    console.log(error);
  }
};

export const getLanguage = async (dispatch, token, id) => {
  try {
    const { data } = await axios.get(`/api/language/get-language/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (data.success) {
      dispatch(setLanguage({ language: data.language }));
    }
  } catch (error) {
    toast.error(error.message);
    console.log(error);
  }
};

export const getGenre = async (dispatch, token, id) => {
  try {
    const { data } = await axios.get(`/api/genre/get-genre/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (data.success) {
      dispatch(setGenre({ genre: data.genre }));
    }
  } catch (error) {
    toast.error(error.message);
    console.log(error);
  }
};

export const getURL = async (dispatch, token) => {
  try {
    const { data } = await axios.post(
      `/api/admin/get-url`,
      {},
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(data);
    if (data.success) {
      dispatch(
        setURL({ url: data.data.uploadURL, imageName: data.data.imageName })
      );
    }
  } catch (error) {
    toast.error(error.message);
    console.log(error);
  }
};

// export const downloadAsCsv = async (Model, Filename = "data", token) => {
//   try {
//     const { data } = await axios.get(
//       `/api/admin/download-as-csv?Model=${Model}&Filename=${Filename}`,
//       {
//         headers: {
//           authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     const blob = new Blob([data], { type: "text/xlsx" });
//     const link = document.createElement("a");
//     link.href = window.URL.createObjectURL(blob);
//     link.setAttribute("download", Filename + ".xlsx");
//     link.style.display = "none";
//     document.body.appendChild(link);
//     link.click();
//     toast.success("File Downloaded Successfully");
//     setTimeout(() => {
//       document.body.removeChild(link);
//     }, 1000);
//     console.log(blob);
//   } catch (error) {
//     toast.error(error.response.data.message);
//     console.log(error);
//   }
// };

export const downloadAsCsv = async (Model, Filename = "data", token) => {
  try {
    const { data } = await axios.get(
      `/api/admin/download-as-csv?Model=${Model}&Filename=${Filename}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
        responseType: "arraybuffer", // Important for binary data
      }
    );

    const workbook = XLSX.read(data, { type: "array" });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const xlsxData = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

    const blob = new Blob([xlsxData], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", `${Filename}.xlsx`);

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(link.href);

    toast.success("File Downloaded Successfully");
  } catch (error) {
    toast.error(error.response.data.message);
    console.log(error);
  }
};

export const getAllVideos = async (
  dispatch,
  token,
  language,
  genres,
  query,
  curPage,
  resultPerPage
) => {
  try {
    dispatch(setLoading());
    const { data } = await axios.get(
      `/api/video/get-videos?language=${language}&genres=${genres}&keyword=${query}&resultPerPage=${resultPerPage}&currentPage=${curPage}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (data.success) {
      dispatch(setLoading());
      dispatch(
        setVideos({
          videos: data.videos,
          totalVideoCount: data.totalVideoCount,
        })
      );
    }
  } catch (error) {
    dispatch(setLoading());
    toast.error(error.message);
    console.log(error);
  }
};

export const getVideo = async (dispatch, token, id) => {
  try {
    const { data } = await axios.get(`/api/video/get-video/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (data.success) {
      dispatch(setVideo({ video: data.video }));
    }
  } catch (error) {
    toast.error(error.message);
    console.log(error);
  }
};

export const getCategoryVideo = async (dispatch, token, id) => {
  try {
    dispatch(setLoading());
    const { data } = await axios.get(`/api/video/get-video-category/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (data.success) {
      dispatch(setLoading());
      dispatch(setCategoryVideos({ videos_category: data.videos_category }));
    }
  } catch (error) {
    dispatch(setLoading());
    toast.error(error.message);
    console.log(error);
  }
};

export const getAllActors = async (dispatch, token) => {
  try {
    dispatch(setLoading());
    const { data } = await axios.get(`/api/actor/get-actors`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (data.success) {
      dispatch(setLoading());
      // console.log(data)
      dispatch(setActors({ actors: data.actors }));
    }
  } catch (error) {
    dispatch(setLoading());
    toast.error(error.message);
    console.log(error);
  }
};

export const getActor = async (dispatch, token, id) => {
  try {
    const { data } = await axios.get(`/api/actor/get-actor/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (data.success) {
      dispatch(setActor({ actor: data.actor }));
    }
  } catch (error) {
    toast.error(error.message);
    console.log(error);
  }
};

export const getAllDirectors = async (dispatch, token) => {
  try {
    dispatch(setLoading());
    const { data } = await axios.get(`/api/director/get-directors`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (data.success) {
      dispatch(setLoading());
      // console.log(data)
      dispatch(setDirectors({ directors: data.directors }));
    }
  } catch (error) {
    dispatch(setLoading());
    toast.error(error.message);
    console.log(error);
  }
};

export const getDirector = async (dispatch, token, id) => {
  try {
    const { data } = await axios.get(`/api/director/get-director/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (data.success) {
      dispatch(setDirector({ director: data.director }));
    }
  } catch (error) {
    toast.error(error.message);
    console.log(error);
  }
};

export const getCategories = async (dispatch, token) => {
  try {
    dispatch(setLoading());
    const { data } = await axios.get(`/api/category/get-categories`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (data.success) {
      dispatch(setLoading());
      dispatch(setCategories({ categories: data.categories }));
    }
  } catch (error) {
    dispatch(setLoading());
    toast.error(error.message);
    console.log(error);
  }
};

export const getCategory = async (dispatch, token, id) => {
  try {
    const { data } = await axios.get(`/api/category/get-category/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (data.success) {
      dispatch(setCategory({ category: data.category }));
    }
  } catch (error) {
    toast.error(error.message);
    console.log(error);
  }
};

export const getCategory_Video = async (dispatch, token, id) => {
  try {
    const { data } = await axios.get(
      `/api/category/get-category-videos/${id}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (data.success) {
      dispatch(setCategory_videos({ category_videos: data.category_videos }));
    }
  } catch (error) {
    toast.error(error.message);
    console.log(error);
  }
};

export const getQueries = async (
  dispatch,
  token,
  curPage,
  resultPerPage,
  query
) => {
  try {
    dispatch(setLoading());
    const { data } = await axios.get(
      `/api/query/get-queries?keyword=${query}&resultPerPage=${resultPerPage}&currentPage=${curPage}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (data.success) {
      dispatch(setLoading());
      dispatch(
        setQueries({
          queries: data.queries,
          totalQueryCount: data.totalQueryCount,
        })
      );
    }
  } catch (error) {
    dispatch(setLoading());
    toast.error(error.message);
    console.log(error);
  }
};

export const getQuery = async (dispatch, token, id) => {
  try {
    const { data } = await axios.get(`/api/query/get-query/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (data.success) {
      dispatch(setQuery({ query: data.query }));
    }
  } catch (error) {
    toast.error(error.message);
    console.log(error);
  }
};

export const getAllCoupons = async (dispatch, token) => {
  try {
    const { data } = await axios.get(`/api/coupon/get-coupons`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (data.success) {
      // console.log(data)
      dispatch(setCoupons({ coupons: data.coupons }));
    }
  } catch (error) {
    toast.error(error.message);
    console.log(error);
  }
};

export const getCoupon = async (dispatch, token, id) => {
  try {
    const { data } = await axios.get(`/api/coupon/get-coupon/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    // console.log(data.coupon)
    if (data.success) {
      dispatch(setCoupon({ coupon: data.coupon }));
    }
  } catch (error) {
    toast.error(error.message);
    console.log(error);
  }
};

export const getAllPages = async (dispatch, token) => {
  try {
    dispatch(setLoading());
    const { data } = await axios.get(`/api/page/get-pages`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (data.success) {
      dispatch(setLoading());
      // console.log(data)
      dispatch(setPages({ pages: data.pages }));
    }
  } catch (error) {
    dispatch(setLoading());
    toast.error(error.message);
    console.log(error);
  }
};

export const getPage = async (dispatch, token, id) => {
  try {
    const { data } = await axios.get(`/api/page/get-page/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    // console.log(data.coupon)
    if (data.success) {
      dispatch(setPage({ page: data.page }));
    }
  } catch (error) {
    toast.error(error.message);
    console.log(error);
  }
};

export const getHomeData = async (dispatch, token) => {
  try {
    const { data } = await axios.get(`/api/admin/get-home-data`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    // console.log(data.coupon)
    if (data.success) {
      dispatch(
        setHomeData({
          homeData: {
            Users: data.data.users,
            Transaction: data.data.transactions,
            Genres: data.data.genres,
            Language: data.data.languages,
            Category: data.data.categories,
            Videos: data.data.videos,
          },
        })
      );
    }
  } catch (error) {
    toast.error(error.message);
    console.log(error);
  }
};

export const getAllFaqs = async (dispatch, token) => {
  try {
    dispatch(setLoading());
    const { data } = await axios.get(`/api/faq/get-faqs`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (data.success) {
      dispatch(setLoading());
      // console.log(data)
      dispatch(setFaqs({ faqs: data.faqs }));
    }
  } catch (error) {
    dispatch(setLoading());
    toast.error(error.message);
    console.log(error);
  }
};

export const getFaq = async (dispatch, token, id) => {
  try {
    const { data } = await axios.get(`/api/faq/get-faq/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    // console.log(data.coupon)
    if (data.success) {
      dispatch(setFaq({ faq: data.faq }));
    }
  } catch (error) {
    toast.error(error.message);
    console.log(error);
  }
};

export const getAllTrailers = async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/trailer/get-trailers`);
    if (data.success) {
      dispatch(
        setTrailers({
          trailers: data.trailers,
        })
      );
    }
  } catch (error) {
    toast.error(error.message);
    console.log(error);
  }
};

export const getAllCarousels = async (token, dispatch) => {
  try {
    const { data } = await axios.get(`/api/carousel/get-all-carousel`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (data.success) {
      dispatch(
        setCarousels({
          carousels: data.carousels,
        })
      );
    }
  } catch (error) {
    toast.error(error.message);
    console.log(error);
  }
};


export const getAllContacts = async (dispatch, token) => {
  try {
    dispatch(setLoading());
    const { data } = await axios.get(`/api/contact/get-contacts`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (data.success) {
      dispatch(setLoading());
      // console.log(data)
      dispatch(setContacts({ contacts: data.contacts }));
    }
  } catch (error) {
    dispatch(setLoading());
    toast.error(error.message);
    console.log(error);
  }
};

export const getContact = async (dispatch, token, id) => {
  try {
    const { data } = await axios.get(`/api/actor/get-actor/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (data.success) {
      dispatch(setActor({ actor: data.actor }));
    }
  } catch (error) {
    toast.error(error.message);
    console.log(error);
  }
};