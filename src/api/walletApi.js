import apiService from "../utils/apiservices";



export const addWalletBalanceToAdmin=(payload)=>apiService.post(`/api/v1/wallet/management/add-cash`, payload);
export const addWalletBalanceToPlayer=()=>apiService.post()
export const adminSelfTransfer=(payload)=>apiService.post(`/api/v1/superadmin/management/self/add-cash`, payload);
export const getWalletBalance=()=>apiService.get(`/api/v1/wallet/me`);