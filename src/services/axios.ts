import axios from "axios";
import { parseCookies } from "nookies";

const { token } = parseCookies();

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://together.serv/api",
});

export { api };
