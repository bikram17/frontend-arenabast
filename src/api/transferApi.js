import apiService from "../utils/apiservices";

export const getallTransferUserRequest=()=>apiService.get(`/api/v1/user/release`)