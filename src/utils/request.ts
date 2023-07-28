import axios, {AxiosInstance, AxiosError, AxiosResponse, AxiosRequestConfig} from 'axios';
import {manager} from "../store/manager";

const service:AxiosInstance = axios.create({
    baseURL:'./api',
    timeout: 5000
});

service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
            if (!config) {
                config = {};
            }
            //@ts-ignore
            if (!config.headers) {
                //@ts-ignore
                config.headers = {};
            }

            const managerInfo = manager()
          if (managerInfo.token) {
              config.headers['token'] = managerInfo.token
          }
        return config;
    },
    (error: AxiosError) => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.status === 200) {
            return response;
        }else if (response.data.code === '403'){
            const managerInfo = manager()
            managerInfo.setToken('')
        }
        else {
            Promise.reject();
        }
    },
    (error: AxiosError) => {
        console.log(error);
        return Promise.reject();
    }
);

export default service;
