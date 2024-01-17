import axios from "../utils/axiosUtil";
// import { setLoading } from "./generalSlice";
import { setTransactions } from "./transactionSlice";
import { setUsers } from "./userSlice";

export const getAllUsers = async (
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
      `/api/admin/get-all-users?keyword=${query}&resultPerPage=${resultPerPage}&currentPage=${curPage}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (data.success) {
      //   console.log(data);
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
    console.log(error);
  }
};
