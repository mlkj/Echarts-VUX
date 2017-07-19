import * as types from '../types'

const state = { 
    // 设置用户登录信息
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || {},
    // 网址信息与用户登录状态
    urlData: JSON.parse(localStorage.getItem('urlData')) || {loginStatus:false},
    //获取用户信息
    userData: JSON.parse(localStorage.getItem('userData')) || {}
}

const actions = {
    /**
     * 用户登录
     */
    setUserInfo({ commit }, res) {
        localStorage.setItem('userInfo',JSON.stringify(res))
        commit(types.SET_USER_INFO, res)
    },

    /**
     * 退出登录
     */
    setSignOut({ commit }) {
        localStorage.removeItem('userInfo')
        localStorage.removeItem('userData')
        commit(types.SET_USER_INFO, {})
        commit(types.GET_USER_DATA, {})
    },
     /**
     * 请求网址信息
     */
    getUrlData({ commit }, params) {
        localStorage.setItem('urlData', JSON.stringify(params))    
        commit(types.GET_URL_DATA,params)
    
    },
         /**
     * 请求用户信息
     */
    getUserData({ commit }, params) {
        localStorage.setItem('userData', JSON.stringify(params))    
        commit(types.GET_USER_DATA,params)
    
    }
    
}

const getters = {
    getUrlData: state => state.urlData,
    getUserData: state => state.userData,
    userInfo: state => state.userInfo,
    
}

const mutations = {
    [types.SET_USER_INFO](state, res) {
        state.userInfo = res
    },

    [types.GET_URL_DATA](state, res) {
        state.urlData = res
    },
    [types.GET_USER_DATA](state, res) {
        state.userData = res
    }
    
}

export default {
    state,
    actions,
    getters,
    mutations
}