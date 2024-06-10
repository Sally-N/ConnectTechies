import { AllUsers } from "@/Utils/Types&Interfaces/user";
import { AxiosUtility } from "./axiosServie";

/**
 * 
 * @param {AllUsers} data 
 * @returns {Promise<AllUsers>}
 */

const getAllusers = async (
): Promise<AllUsers> => {
    const { data: res } = await AxiosUtility.get<AllUsers>(`/users`)
    console.log(res, 'res');
    return res;
}

const AllUsersServices = {
    getAllusers
}


export default AllUsersServices
