import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken, removeToken, getLocalStorage, setLocalStorage,clearLocalStorage } from '@/utils/auth'
import fetch from '@/utils/fetch'
import api from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ticket:getToken(),
    operatorInfo:getLocalStorage('operatorInfo') || {},//系统操作员
    customerInfo:{},//ETC客户
    vehicleInfo:{}//车辆信息
  },
  getters:{
    operatorInfo: (state) => state.operatorInfo,
    customerInfo: (state) => state.customerInfo,
    vehicleInfo:(state) => state.vehicleInfo
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.ticket = token
    },
    SET_OPERATORINFO: (state, operatorInfo) => {
      state.operatorInfo = operatorInfo
    },
    SET_CUSTOMERINFO: (state, customerInfo) => {
      state.customerInfo = customerInfo
    },
    SET_VEHICLEINFO: (state, vehicleInfo) => {
      state.vehicleInfo = vehicleInfo
    },
  },
  actions: {
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        fetch({
          url: api['login'].url || '',
          method: 'post',
          data: {
            method:api['login'].method,
            ...userInfo
          }
        }).then(res => {
          const data = res
          setToken(data.ticket)
          commit('SET_TOKEN', data.ticket);

          setLocalStorage('operatorInfo',data);
          commit('SET_OPERATORINFO',data);

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 设置ETC客户
    setCustomerInfo({ commit },data) {
      commit('SET_CUSTOMERINFO',data)
    },
    setVehicleInfo({ commit },data){
      commit('SET_VEHICLEINFO',data);
    },
    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.ticket).then(() => {

          commit('SET_TOKEN', '')
          commit('SET_OPERATORINFO', {})

          removeToken();
          clearLocalStorage('roles');

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_OPERATORINFO', {})

        removeToken();
        clearLocalStorage('operatorInfo');


        resolve()
      })
    }

  }
})
