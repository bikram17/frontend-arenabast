import apiService from "../utils/apiservices";



export const addWalletBalanceToAdmin=(payload)=>apiService.post(`/api/v1/wallet/management/add-cash`, payload);