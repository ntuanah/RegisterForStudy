import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // 👈 Bổ sung import jwtDecode
import { refreshTokenAPI } from '../service/authService';

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 1. REQUEST INTERCEPTOR: Chủ động kiểm tra hạn Token trước khi gửi
axiosClient.interceptors.request.use(
    async (config) => {
        let token = localStorage.getItem('accessToken');

        if (token) {
            try {
                // Giải mã token để lấy thời gian hết hạn (exp)
                const decodedToken = jwtDecode(token);
                const currentTime = Math.floor(Date.now() / 1000);

                // Nếu thời gian hiện tại đã vượt qua thời gian hết hạn của token
                if (decodedToken.exp < currentTime) {
                    console.log('Token đã hết hạn, tiến hành gọi Refresh Token chủ động...');
                    
                    // Gọi API lấy token mới
                    const res = await refreshTokenAPI();
                    
                    // Lấy token mới từ response (Chú ý khớp với cấu trúc BE của bạn, thường là res.data.result.accessToken)
                    const newAccessToken = res.data.result.accessToken; 
                    
                    // Cập nhật lại localStorage và biến token hiện tại
                    localStorage.setItem('accessToken', newAccessToken);
                    token = newAccessToken; 
                }
            } catch (error) {
                console.log('Lỗi giải mã token hoặc refresh token thất bại:', error);
                // Nếu token bị hỏng (giải mã lỗi) hoặc lấy token mới thất bại -> Xóa luôn
                localStorage.removeItem('accessToken');
            }

            // Gắn token (cũ hoặc mới vừa xin) vào Header
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 2. RESPONSE INTERCEPTOR: Dự phòng bắt lỗi 401 từ Backend
axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Bắt lỗi 401 (Trường hợp Backend chủ động thu hồi token dù chưa hết hạn)
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const res = await refreshTokenAPI();
                const newAccessToken = res.data.result.accessToken;
                
                localStorage.setItem('accessToken', newAccessToken);
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                
                return axiosClient(originalRequest);
            } catch (refreshError) {
                console.log('Refresh token dự phòng thất bại:', refreshError);
                localStorage.removeItem('accessToken');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosClient;