import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api'
});

// Automatically attach token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Auth
export const signup = (data) => API.post('/auth/signup', data);
export const login = (data) => API.post('/auth/login', data);

// Subjects
export const getSubjects = () => API.get('/subjects');
export const createSubject = (data) => API.post('/subjects', data);
export const updateSubject = (id, data) => API.put(`/subjects/${id}`, data);
export const deleteSubject = (id) => API.delete(`/subjects/${id}`);

// Plan
export const generatePlan = (data) => API.post('/plan/generate', data);