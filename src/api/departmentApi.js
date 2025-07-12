import apiService from "../utils/apiservices"

export const departmentCreate=(payload)=>apiService.post(`/api/admin/department`, payload);

export const getDepartmentList=(year)=>apiService.get(`/api/admin/department?year=${year}`);

export const  assignStaffList=(depId, year)=>apiService.get(`/api/admin/department/${depId}/assignedStaff?year=${year}`)

export const assignStaff=(depId, payload)=>apiService.post(`/api/admin/department/${depId}/assignstaff`, payload);

export const supperviorAndStaffList=(depId, year)=>apiService.get(`/api/admin/department/${depId}/alreadyassignedlist?year=${year}`)

export const createTeamDepartment=(depId, payload)=>apiService.post(`api/admin/department/${depId}/assignall`, payload)