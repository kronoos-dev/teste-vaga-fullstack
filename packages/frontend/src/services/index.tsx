import axios from "axios";

export const urlApplication = import.meta.env.VITE_API_URL

export const api = axios.create({
  baseURL: urlApplication,
});