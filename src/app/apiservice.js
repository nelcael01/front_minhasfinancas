import axios from "axios";
import { objects } from './../../node_modules/babel-preset-react-app/node_modules/@babel/preset-react/node_modules/@babel/plugin-transform-react-display-name/node_modules/@babel/core/lib/config/config-descriptors';

const httpClient = axios.create({
  baseURL: 'http://localhost:8080'
})

class ApiService{
  constructor(apiurl){
    this.apiurl = apiurl
  }

  post(url, objeto){
    const requestUrl = `${this.apiurl}${url}`
    return httpClient.post(requestUrl, objeto)
  }

  put(url, objeto){
    const requestUrl = `${this.apiurl}${url}`
    return httpClient.put(requestUrl, objeto)
  }

  delete(url){
    const requestUrl = `${this.apiurl}${url}`
    return httpClient.delete(requestUrl)
  }

  get(url){
    const requestUrl = `${this.apiurl}${url}`
    return httpClient.get(requestUrl)
  }
}

export default ApiService