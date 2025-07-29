import { axiosInstance } from "../config/api";

export const userDataFetch = ()=>{
  return axiosInstance.get(`/auth/user`)
}

export const login = (formData:any)=>{
  return axiosInstance.post(`/auth/login`,formData)
}

export const register = (FormData:any)=>{
  return axiosInstance.post(`/auth/register`,FormData)
}

export const refresh = ()=>{
  return axiosInstance.post(`/auth/refresh`,{},{withCredentials:true})
}

export const createUrl = (FormData:any) =>{
  return axiosInstance.post(`/url`,FormData,{withCredentials:true})
}

export const shortLinks = (id:string)=>{
return axiosInstance.get(`/url/${id}`)
}

export const getUrls = ()=>{
  return axiosInstance.get(`/url`,{withCredentials:true})
}

export const logoutUser = () =>{
  return axiosInstance.get('/auth/logout',{withCredentials:true});
}