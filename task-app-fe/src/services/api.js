import axios from 'axios';
import { server } from '../data/constants';

export const loginAPI = async (data) => { 
  const res = await axios.post(`${server}/auth/login`, data);
  return res;
}
export const registerAPI = async (data) => { 
    const res = await axios.post(`${server}/auth/register`, data);
    return res;
}
export const searchTask = async (data,token,controller) => {
    const res = await axios.post(`${server}/task/search`,data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        signal : controller.signal
    });
    return res;
}
export const getTasks = async (token) => { 
    const res = await axios.get(`${server}/tasks`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return res;
}
export const getTask = async (id,token) => { 
    const res = await axios.get(`${server}/task/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return res;
}
export const getStatuses = async (token) => { 
    const res = await axios.get(`${server}/status`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return res;
}
export const createTask = async (data,token) => { 
    const res = await axios.post(`${server}/task/create`,data, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        }
    })
    return res;
}
export const updateTask = async (data,token) => { 
   
    const res = await axios.put(`${server}/task/update`,data, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    return res;
}
export const removeTask = async (data,token) => { 
    const res = await axios.post(`${server}/task/remove`,data, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    return res;
}