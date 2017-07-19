import axios from 'axios'
import qs from 'qs'
import stores from '../vuex/store'

// axios 配置
axios.defaults.timeout = 30000; //请求响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
if (stores.state.user.urlData.loginStatus) {
  axios.defaults.baseURL = stores.state.user.urlData.url;
} else {
  axios.defaults.baseURL = 'http://192.168.20.32:8050/ashx';
}

//POST传参序列化
axios.interceptors.request.use((config) => {
  stores.dispatch('setLoadingState', true)
  // 在发送请求之前做些什么
  if (config.method === 'post') {
    config.data = qs.stringify(config.data);
  }
  return config;
}, (error) => {
  return Promise.reject('错误', error);
});

//返回状态判断
axios.interceptors.response.use((res) => { //配置请求回来的信息 
  stores.dispatch('setLoadingState', false)
  return res;
}, (error) => {
  stores.dispatch('setLoadingState', false)
  return Promise.reject(error);
});

export default axios
