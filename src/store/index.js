import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    location: "",
    pois: [],
    marker: [],
    num: 0,
    page: 1,
    hover: null,
    filter: "checked_all",
  },
  mutations: {
    RESET(state) {
      state.location = "";
      state.pois = [];
      state.marker = [];
      state.num = 0;
      state.page = 1;
      state.filter = "checked_all";
    },
    SET_LOCATION(state, payload) {
      state.location = payload;
    },
    SET_POIS(state, payload) {
      state.pois = payload;
      state.marker = payload;
    },
    SET_NUM(state, payload) {
      state.num = payload;
    },
    ADD_PAGE(state) {
      state.page++
    },
    ADD_POIS(state, payload) {
      state.marker = payload;
      state.pois = state.pois.concat(payload);
    },
    HOVER(state, payload) {
      state.hover = payload;
    },
    SET_FILTER(state, payload) {
      state.filter = payload;
    }
  },
  actions: {
    setLocation(context, payload) {
      context.commit("RESET");
      context.commit("SET_LOCATION", payload);
    },
    getPois: async function (context, payload) {
      if (payload === 1) {
        context.page = payload
      } else {
        context.page = payload
      }

      // let api = `https://restapi.amap.com/v3/place/text?key=8d340ca896004f823883292e0ae2f5bc&keywords=&types=书店&city=${context.state.location}&citylimit=true&children=1&offset=10&page=${context.page}&extensions=all`;
      let api = `https://restapi.amap.com/v3/place/text?key=8d340ca896004f823883292e0ae2f5bc&keywords=&types=博物馆|书店|公园广场|咖啡厅&city=${context.state.location}&citylimit=true&children=1&offset=5&page=${context.page}&extensions=all`;
      let response = await axios.get(api);
      if (response.data.status === "1" && response.data.pois.length) {
        response.data.pois.forEach(item => {
          if (/博物馆|美术馆|科技馆|天文馆/.test(item.type)) {
            item.type = "museum"
          } else if (/图书馆|书店|音像店/.test(item.type)) {
            item.type = "bookshop"
          } else if (/公园广场/.test(item.type)) {
            item.type = "park"
          } else if (/咖啡厅/.test(item.type)) {
            item.type = "cafe"
          }
        })
        if (context.page === 1) {
          context.dispatch("setPois", response.data.pois);
          context.dispatch("setNum", response.data.count);
        } else if (context.page >= 2) {
          context.dispatch("addPois", response.data.pois);
        }
        return "resolve"
      } else {
        return "fail"
      }
    },
    setPois(context, payload) {
      context.commit("SET_POIS", payload);
    },
    setNum(context, payload) {
      context.commit("SET_NUM", payload);
    },
    addPage(context) {
      context.commit("ADD_PAGE")
    },
    addPois(context, payload) {
      context.commit("ADD_POIS", payload);
    },
    hover(context, payload) {
      context.commit("HOVER", payload);
    },
    setFilter(context, payload) {
      context.commit("SET_FILTER", payload)
    }
  },
  modules: {}
})