import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null, // signin user
    headerItem: "home",
    sidebarItem: "",
    chatHistories: [],
    callUser: null,
    socketId: null,
    showCallDialog: false
  },
  mutations: {
    setUserInfo(state, value) {
      state.user = value
    },
    setHeaderItem(state, value) {
      state.headerItem = value
    },
    setSidebarItem(state, value) {
      state.sidebarItem = value
    },
    addChatHistory(state, value) {
      state.chatHistories.push(value)
    },
    setCallUser(state, value) {
      state.callUser = value
    },
    setSocketId(state, value) {
      state.socketId = value
    },
    updateCallDialogVisibility(state, value) {
      state.showCallDialog = value
    },
  },
  actions: {
  },
  modules: {
  }
})
