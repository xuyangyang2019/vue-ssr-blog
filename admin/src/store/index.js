import Vue from "vue"
import Vuex from "vuex"
import actions from "./actions"
import mutations from "./mutations"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    toPath: "/admin",
    tagsObj: {},
    redSup: { c: false, m: false, l: false, p: false },
    forLocation: [],
    news: { pvNum: 0, comment: [], msgboard: [], like: [], pv: [] },
    articles: { all: [], drafts: [], tags: [], search: [], only: [] },
    pageArray: [],// 已发表页码数组
    msgBoard: [], // 留言板
    comments: [], // 评论
    // =============================================================
    responser: "",
    viewArticle: {},
    page: 1,
  },
  mutations,
  actions
})
export default store
