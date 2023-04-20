import axios from "axios";

let api;

export function createApi() {
    // Here we set the base URL for all requests made to the api
    api = axios.create({
        baseURL: process.env.VUE_APP_BASE_URL + "/api/",
        withCredentials: true,
        headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
        },
    });

    // We set an interceptor for each request to
    // include Bearer token to the request if user is logged in
    api.interceptors.request.use((config) => {
        
      if(localStorage.getItem("isLoggedIn") == "true"){
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${localStorage.getItem("token")}`, //token based auth
        };
      }
  
        return config;
    });

    return api;
}

export function useApi() {
    if (!api) {
        createApi();
    }
    return api;
}
