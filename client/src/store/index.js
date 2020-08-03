import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    socket: {},
    board: ['', '', '', '', '', '', '', '', ''],
    player: '',
    myPlayer: '',
    roomid: null,
    playing: false
  },
  getters: {
    
  },
  mutations: {
    
  },
  actions: {
    
  },
  modules: {

  }
});
