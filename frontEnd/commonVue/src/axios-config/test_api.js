import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

axios.defaults.withCredentials = true
let instance = axios.create({
    baseURL: 'http://test.hub-server.heygears.com:23456', //测试环境
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});
window.ajaxSum = 0


// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  window.ajaxSum ++
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  window.ajaxSum --
  return response
}, function (error) {
  // 对响应错误做点什么
  window.ajaxSum --
  return Promise.reject(error)
})

Vue.prototype.$axios = instance

