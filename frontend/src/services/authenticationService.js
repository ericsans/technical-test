import md5 from "md5";
import httpInstance from "./httpInstance";

export const login = async (email, password) => {
    const { data } =  await httpInstance.post('/login', { email, password: md5(password) });
    localStorage.setItem('token', data.token);
}

export const logout = () => {
    localStorage.removeItem('token');
}

export function getCurrentUser() {
    try {
        return localStorage.getItem('token');
    } catch (ex) {
        return null;
    }
}
  