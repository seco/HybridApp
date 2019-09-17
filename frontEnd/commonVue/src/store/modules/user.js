import { getCookie, setCookie } from '../../public/plugins/cookie'
import * as types from './mutation-types'

const state = {
  userName: getCookie('userName') || '',
  userId: getCookie('userId') || ''
}


const mutations = {
  [types.USERINFO] (state, obj) {
    setCookie('userName', obj.userName, 43200)
    setCookie('userId', obj.userId, 43200)
    state.userName = obj.userName
    state.userId = obj.userId
  }
}
const actions = {
  userAction ({commit}, obj) {
    commit(types.USERINFO, obj)
  }
}

export default {
  state,
  actions,
  mutations
}
