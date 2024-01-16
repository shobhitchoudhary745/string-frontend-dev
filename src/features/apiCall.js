import axios from "../utils/axiosUtil";
import { setLoading } from "./generalSlice";
import { setTransactions } from "./transactionSlice";
import { setUsers } from "./userSlice";

export const getAllUsers = async (dispatch) => {
  try {
    setLoading();
    const { data } = await axios.get("/api/admin/get-all-users");
    if (data.success) {
    //   console.log(data);
      setLoading();
      dispatch(
        setUsers({
          users: data.users,
          userCount: data.userCount,
          filteredUser: data.filteredUser,
        })
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllTransactions = async (dispatch,token) => {
  try {
    setLoading();
    const { data } = await axios.get("/api/transaction/get-all-transaction?gateway=all",{headers:{
        authorization:`Bearer ${token}`
    }});
    if (data.success) {
    //   console.log(data);
      setLoading();
      dispatch(
        setTransactions({
          transactions: data.transactions,
          usetransactionCount: data.transactionCount,
          filteredTransactions: data.filteredTransactions,
        })
      );
    }
  } catch (error) {
    console.log(error);
  }
};
