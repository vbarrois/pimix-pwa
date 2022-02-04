import axios, { AxiosResponse } from "axios";
import _ from "lodash";

export const REST_SERVER = `${location.host.split(":")[0]}:${import.meta.env.VITE_REST_PORT}`

export const request = (
  _url: string,
  _options?: any
): Promise<AxiosResponse> => {
  return axios.get(`http://${REST_SERVER}/${_url}`, _options)
}

export const post = (
  _url: string,
  _data: any,
  _options?: any
): Promise<AxiosResponse> => {
  return axios.post(`http://${REST_SERVER}/${_url}`, _data, _options)
}

export const put = (
  _url: string,
  _data: any,
  _options?: any
): Promise<AxiosResponse> => {
  return axios.put(`http://${REST_SERVER}/${_url}`, _data, _options)
}

export const remove = (
  _url: string,
  _data: any
): Promise<AxiosResponse> => {
  return axios.delete(`http://${REST_SERVER}/${_url}`, {
    data: _data
  })
}
