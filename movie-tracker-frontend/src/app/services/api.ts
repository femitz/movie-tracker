import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true
});

// Interceptor para adicionar o token JWT
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Serviços de autenticação
export const auth = {
    login: async (email: string, password: string) => {
        try {
            const response = await api.post('/api/auth/login', { email, password });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Falha no login. Por favor, verifique suas credenciais.');
        }
    },

    register: async (name: string, email: string, password: string) => {
        try {
            const response = await api.post('/api/auth/register', { name, email, password });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Falha no registro. Por favor, tente novamente.');
        }
    },

    logout: () => {
        localStorage.removeItem('token');
    }
};

export default api; 