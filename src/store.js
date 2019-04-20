import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken, removeToken, getLocalStorage, setLocalStorage,clearLocalStorage } from '@/utils/auth'
import fetch from '@/utils/fetch'
import api from '@/api'
import storage from '@/utils/storage.js'
import axios from 'axios'
Vue.use(Vuex)
// Vue.use(axios)
Vue.prototype.$http = axios
export default new Vuex.Store({
  state: {
    ticket:getToken(),
    operatorInfo:getLocalStorage('operatorInfo') || {},//系统操作员
    customerInfo:{},//ETC客户
    vehicleInfo:{},//车辆信息
    musicList: {'musicData': []},
    theme: 'red',
    isPlaying: false,
    nowPlayIndex: 0,
    showMiniAudio: true,
    commendList: {'commendList': []},
    curTimeNum: 0,
    showPlay: false,
    showAbout: false,
    showLogin: false,
    day: {'musicData': []},
  },
  getters:{
    operatorInfo: (state) => state.operatorInfo,
    customerInfo: (state) => state.customerInfo,
    vehicleInfo:(state) => state.vehicleInfo,
    musicList:(state) => state.musicList,
    theme:(state) => state.theme,
    isPlaying:(state) => state.isPlaying,
    nowPlayIndex:(state) => state.nowPlayIndex,
    showMiniAudio:(state) => state.showMiniAudio,
    commendList:(state) => state.commendList,
    curTimeNum:(state) => state.curTimeNum,
    showPlay:(state) => state.showPlay,
    showAbout:(state) => state.showAbout,
    showLogin:(state) => state.showLogin,
    day:(state) => state.day,
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
    setMusicList: (state, playload) => {
        state.musicList = playload
        storage.saveMusic(playload)
    },
    play: state => {
        state.isPlaying = true

    },
    pause: state => {
        state.isPlaying = false
    },
    clear: state => {
        state.musicList = {'musicData':[]}
        storage.saveMusic({'musicData':[]})
    },
    setPlayIndex: (state, playload) => {
        state.nowPlayIndex = playload
    },
    setShowMiniAudio: (state, playload) => {
        state.showMiniAudio = playload
    },
    setCommendList: (state, playload) => {
        state.commendList = playload
    },
    setCurTimeNum: (state, playload) => {
        state.curTimeNum = playload
    },
    setShowPlay: (state, playload) => {
        state.showPlay = playload
    },
    modifyMusicList: (state, playload) => {
        for (let i = 0, length = state.musicList.musicData.length; i < length; i++) {
            if (state.musicList.musicData[i].id == playload.id) {
                return
            }
        }
        state.musicList.musicData.splice(state.nowPlayIndex + 1, 0, playload)
        state.nowPlayIndex = state.nowPlayIndex + 1
        storage.saveMusic(playload)
    },
    setShowAbout: (state, playload) => {
        state.showAbout = playload
    },
    setShowLogin: (state, playload) => {
        state.showLogin = playload
    },
    setDay: (state, playload) => {
        state.day = playload
    },
    setTheme: (state, playload) => {
        state.theme = playload
    }
  },
  actions: {
    getInitData() {
        return new Promise((resolve, reject) => {
            this.$http.get('http://oyhfe.com:666/music-data')
                .then(res => {
                    resolve(res.data.musicData)
                })
        })
    },
    getInitCommend() {
        return new Promise((resolve, reject) => {
            this.$http.get('http://oyhfe.com:666/commend-list')
                .then(res => {
                    resolve(res.data.commendList)
                })
        })
    },
    getInitDay() {
        return new Promise((resolve, reject) => {
            this.$http.get('http://oyhfe.com:666/day')
                .then(res => {
                    resolve(res.data.day)
                })
        })
    },
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
