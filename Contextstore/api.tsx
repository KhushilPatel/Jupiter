import axios from "axios";
 
const api = 'https://jupiter.cmdev.cc';
 
export const logInApi = async (data: any) => {
    return axios.post(`${api}/admin/auth/login`, data)
}
 
export const verifyOtpApi = async (data: any) => {
    return axios.post(`${api}/admin/auth/otp-verify`, data)
}
 
export const logOutApi = async (payload : any) => {
    return axios.post(`${api}/admin/auth/logout`, {}, {
        headers: payload
    })
   
}
 
export const patientsApi = async (payload: any, params: any) => {
    return axios.get(`${api}/admin/patient-user`, {
        headers: payload,
        params: params
    } )
}
export const patientDetailsApi = async (payload: any, id:any) => {
       
    return axios.get(`${api}/admin/patient-user/${id}`, {
        headers: payload,
        params:{
            include: ['creditCard', 'patientUserAddress']
        }
       
    } )
}
 
export const productsApi = async (payload: any,params:any) => {
    return axios.get(`${api}/admin/product`, {
        headers: payload,
        params:params
    } )
}
 
export const productDetailsApi = async (payload: any, id:any) => {
       
    return axios.get(`${api}/admin/product/${id}`, {
        headers: payload,
       
       
    } )
}
 
export const adminUserManagementApi = async (payload: any) => {
    return axios.get(`${api}/admin/admin-user`, {
        headers: payload
    } )
}
 
 
 
export const permissionManagementApi = async (payload: any,params:any) => {
    return axios.get(`${api}/admin-permission-group`, {
        headers: payload,
        params: params
    } )
}
 
export const assessmentManagementApi = async (payload: any, params:any) => {
    return axios.get(`${api}/admin/patient-user/assessment/list`, {
        headers: payload,
        params: params
    } )
}

