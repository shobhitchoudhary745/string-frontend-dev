
import axios from "../utils/axiosUtil";
import { setLoading } from "./generalSlice";
import { setUsers } from "./userSlice";

export const getAllUsers = async(dispatch)=>{
    
    try {
        setLoading();
        const {data} = await axios.get("/api/admin/get-all-users")
        if(data.success){
            console.log(data);
            setLoading();
            dispatch(setUsers({users:data.users,userCount:data.userCount,filteredUser:data.filteredUser}));
        }
    } catch (error) {
        console.log(error)
    }

}

