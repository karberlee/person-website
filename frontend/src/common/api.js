import axios from "axios";
import https from 'https';
import router from '../router';

let http = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  httpsAgent: new https.Agent({  
    rejectUnauthorized: false
  })
});

// Add a request interceptor
http.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
http.interceptors.response.use(
  function (response) {
    const { authorization } = response.headers
    authorization && localStorage.setItem("token", authorization)
    // if (response.data && response.data.err && response.data.err.code == "401" && router.history.current.path != "/login")
    //   router.replace({ path: "/login" + "?redirectTo=" + router.history.current.path.slice(1) });
    return response;
  }, 
  function (error) {
    console.log("api response error:", error)
    const { status } = error.response
    if(status === 401 && !window.location.href.endsWith("/login")) {
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
    return Promise.reject(error.response);
  }
);



export const get = (url, params) => {
  return new Promise((resolve, reject) => {
    http({
      method: "get",
      params: params,
      url: url
    })
      .then(res => {
        resolve(res);
      })
      .catch(response => {
        errorState(response);
        reject(response);
      });
  });
};

export const post = (url, params) => {
  return new Promise((resolve, reject) => {
    http({
      method: "post",
      url: url,
      data: params,
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        resolve(res);
      })
      .catch(response => {
        errorState(response);
        reject(response);
      });
  });
};



function errorState(response) {
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response;
  } else {
    console.log(response);
  }
}