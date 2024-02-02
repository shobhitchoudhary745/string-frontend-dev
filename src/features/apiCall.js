import { toast } from "react-toastify";
import axios from "../utils/axiosUtil";
import { setPlan, setPlans } from "./planSlice";
// import { setLoading } from "./generalSlice";
import { setTransactions } from "./transactionSlice";
import { setUser, setUsers } from "./userSlice";
import { setLanguage, setLanguages } from "./languageSlice";
import { setGenre, setGenres } from "./genreSlice";
import { setURL } from "./getURLSlice";
import { setVideo, setVideos } from "./videoSlice";

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
    const { data } = await axios.get(
      `/api/admin/get-all-users?keyword=${query}&resultPerPage=${resultPerPage}&currentPage=${curPage}&plan_name=${plan_name}&plan_type=${plan_type}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (data.success) {
      dispatch(
        setUsers({
          users: data.users,
          userCount: data.userCount,
          filteredUsers: data.filteredUsers,
        })
      );
    }
  } catch (error) {
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
  query
) => {
  try {
    let input_date = null;
    if (date) input_date = new Date(date);
    const { data } = await axios.get(
      `/api/transaction/get-all-transaction?gateway=${gateway}&from=${input_date}&keyword=${query}&resultPerPage=${resultPerPage}&currentPage=${curPage}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (data.success) {
      dispatch(
        setTransactions({
          transactions: data.transactions,
          transactionCount: data.transactionCount,
          filteredTransactions: data.filteredTransactions,
        })
      );
    }
  } catch (error) {
    toast.error(error.message);
    console.log(error);
  }
};

export const getAllPlans = async (dispatch, token) => {
  try {
    const { data } = await axios.get(`/api/plan/get-plans`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (data.success) {
      dispatch(setPlans({ plans: data.plans }));
    }
  } catch (error) {
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
      dispatch(setUser({ user: data.user }));
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

export const downloadAsCsv = async (Model, Filename = "data") => {
  try {
    const { data } = await axios.get(
      `/api/admin/download-as-csv?Model=${Model}&Filename=${Filename}`
    );
    const blob = new Blob([data], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", Filename + ".csv");
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    toast.success("File Downloaded Successfully");
    setTimeout(() => {
      document.body.removeChild(link);
    }, 1000);
    console.log(blob);
  } catch (error) {
    toast.error(error.response.data.message);
    console.log(error);
  }
};

export const getAllVideos = async (
  dispatch,
  token,
  language,
  category,
  query
) => {
  try {
    const { data } = await axios.get(
      `/api/video/get-videos?language=${language}&category=${category}&keyword=${query}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (data.success) {
      // console.log(data)
      dispatch(setVideos({ videos: data.videos }));
    }
  } catch (error) {
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
