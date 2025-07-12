
import apiService from "../utils/apiservices"

export const loginAdmin=(payload)=>apiService.post(`/api/v1/auth/login`, payload);
