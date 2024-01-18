import { toast } from "react-toastify";
import axios from "../utils/axiosUtil";
import { setPlans } from "./planSlice";
// import { setLoading } from "./generalSlice";
import { setTransactions } from "./transactionSlice";
import { setUsers } from "./userSlice";

export const getAllUsers = async (
  dispatch,
  token,
  curPage,
  resultPerPage,
  query,
  setLoading,
  plan_name,
  plan_type,
) => {
  try {
    setLoading(true);
    const { data } = await axios.get(
      `/api/admin/get-all-users?keyword=${query}&resultPerPage=${resultPerPage}&currentPage=${curPage}&plan_name=${plan_name}&plan_type=${plan_type}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (data.success) {
      setLoading(false);
      dispatch(
        setUsers({
          users: data.users,
          userCount: data.userCount,
          filteredUsers: data.filteredUsers,
        })
      );
    }
  } catch (error) {
    setLoading(false);
    toast.error(error.response.data.message)
    console.log(error);
  }
};

export const getAllTransactions = async (
  dispatch,
  token,
  curPage,
  resultPerPage,
  query,
  setLoading
) => {
  try {
    setLoading(true);
    const { data } = await axios.get(
      `/api/transaction/get-all-transaction?gateway=all&keyword=${query}&resultPerPage=${resultPerPage}&currentPage=${curPage}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (data.success) {
      setLoading(false);
      dispatch(
        setTransactions({
          transactions: data.transactions,
          transactionCount: data.transactionCount,
          filteredTransactions: data.filteredTransactions,
        })
      );
    }
  } catch (error) {
    setLoading(false);
    toast.error(error.response.data.message)
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
    toast.error(error.response.data.message)
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