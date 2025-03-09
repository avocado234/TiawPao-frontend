import axios from "axios";

const api = axios.create({
  
  baseURL: "http://172.20.10.3:8000/api/v1", 
  // baseURL: "http://20.187.146.79:8000/api/v1", //Azure
  // baseURL: "http://127.0.0.1:8000/api/v1", //Azure
  // baseURL: "http://192.168.1.145:8000/api/v1", //Azure
  // baseURL: "http://10.64.74.7:8000/api/v1", //Azure
  withCredentials: true,    
  headers: {
    'Access-Control-Allow-Origin': '*',  
    'Accept':'application/json',      
    'Content-Type': 'application/json',
  },
});

// // Interceptor สำหรับเพิ่ม Token (ถ้ามี Authentication)
// api.interceptors.request.use(
//   async (config) => {
//     // ตัวอย่าง: ถ้ามี token ใน localStorage ก็ดึงมาใส่ headers
//     const token = ""; // ใส่โค้ดดึง Token ที่นี่
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

export default api;
