import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
  'Content-Type': 'application/json',
  },
  withCredentials: true,
});



// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // If the request contains form data, set the appropriate headers
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    console.log('interceptor response', response);
    return response;
  },
  function (error) {
    console.log('interceptor response', error);
    return Promise.reject(error);
  }
);

export const get = (url, params) => instance.get(url, { params });
export const post = (url, data) => instance.post(url, data);
export const put = (url, data) => instance.put(url, data);
export const deleteUser = (url) => instance.delete(url);

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    console.log('interceptor response', response);
    return response;
  },
  function (error) {
    console.log('interceptor response', error);
    return Promise.reject(error);
  }
);
