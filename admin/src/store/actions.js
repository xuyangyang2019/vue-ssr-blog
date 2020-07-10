const axios = require("axios")
import api from "./api"

export default {
  // 登陆
  login({ commit, state }, payload) {
    return api.post("/api/login", payload)
  },
  // 获取通知
  getNews({ commit, state }, payload) {
    return api.get("/api/getNews").then((data) => {
      if (data.newsArr && data.newsArr.length) {
        commit("handleNews", data)
      }
      return data
    })
  },
  // 获取技术文章的tag生成导航
  getTagsclass({ commit, state }, payload) {
    return api.get("/api/adminTags", { publish: payload.publish }).then((data) => {
      if (data.tags && data.tags.length) {
        data.tags.forEach((item, index, arr) => {
          if (item.tag === "life") {
            item.tag = "生活"
          }
        })
        state.tagsObj = data
      }
      return data
    })
  },
  // 获取文章
  getArticles({ commit, state }, payload) {
    let params = {}
    if (!payload.tag) {
      params = {
        publish: payload.publish,
        page: payload.page,
      }
    } else {
      params = payload
    }
    return api.get("/api/getAdminArticles", params).then((data) => {
      if (data.length) {
        if (!payload.tag) {
          if (payload.publish === true) {
            state.articles.all = data
          } else {
            state.articles.drafts = data
          }
        } else {
          state.articles.tags = data
        }
      }
      return data
    })
  },
  //获取对应模块的文章总数，为分页按钮个数提供支持
  getArticlesCount({ commit, state }, payload) {
    return api.get("/api/getCount", payload).then((data) => {
      commit("pageArray", data)
    })
  },
  // 获取留言
  getMsgBoard({ commit, state }, payload) {
    return api.get("/api/getAdminBoard", payload).then((data) => {
      if (data.length) {
        state.msgBoard = data
      }
      return data
    })
  },
  // 获取留言数
  getMsgCount({ commit }, payload) {
    return api.get("/api/getMsgCount").then((data) => {
      commit("pageArray", data)
    })
  },
  // 获取评论
  getAdminComments({ commit, state }, payload) {
    return api.get("/api/getAdminComments", payload).then((data) => {
      if (data.length) {
        state.comments = data
      }
      return data
    })
  },
  // 获取评论数
  getCommentsCount({ commit, state }) {
    return api.get("/api/getCommentsCount").then((data) => {
      commit("pageArray", data)
    })
  },
  // 删除文章
  removeArticle({ commit }, payload) {
    return api.delete("/api/deleteArticle", payload)
  },
  // 精准获取文章
  getArticle({ commit, state }, payload) {
    return api.get("/api/getAdminArticle", payload).then((data) => {
      if (data.length) {
        state.articles.only = data
        let _tag = data[0].tag[0]
        if (data[0].publish) {
          state.forLocation = [{ pathName: "allArticles", showName: "已发表文章" }, { pathName: "eachTag", showName: _tag, params: { tag: _tag } }, { pathName: "review", showName: data[0].title, params: { eTag: _tag, articleId: data[0].articleId } }]
        } else {
          state.forLocation = [{ pathName: "draft", showName: "草稿" }, { pathName: "review", showName: data[0].title, params: { eTag: _tag, articleId: data[0].articleId } }]
        }
      }
      return data
    })
  },

  addBoardReply({ commit }, payload) {
    return api.patch("/api/addReply", payload)
  },
  addCommentsReply({ commit }, payload) {
    return api.patch("/api/addComment", payload)
  },
  removeLeavewords({ commit }, payload) {
    return api.delete("/api/removeLeavewords", payload)
  },
  removeComments({ commit }, payload) {
    return api.delete("/api/removeComments", payload)
  },
  reduceLeavewords({ commit }, payload) {
    return api.patch("/api/reduceLeavewords", payload)
  },
  reduceComments({ commit }, payload) {
    return api.patch("/api/reduceComments", payload)
  },
  // 重置密码
  reviseKey({ commit }, payload) {
    return api.patch("/api/reviseKey", payload)
  },
  // 拷贝数据
  copyData: function () {
    return api.get("/api/copyData")
  },
  // 下载数据库
  downloadDb: function () {
    return api.get("/api/downloadSingle")
  },
  // ======================================================
  search({ commmit, state }, payload) {
    return api.get("/api/adminSearch", payload).then((data) => {
      if (data.length) {
        state.articles.search = data
      } else {
        state.articles.search = []
      }
      return data
    })
  },
  saveArticle({ commit }, payload) {
    return api.post("/api/saveArticle", payload)
  },
  updateArticle({ commit }, payload) {
    return api.patch("/api/updata", payload)
  },
  removeNews({ commit, state }, payload) {
    return api.delete("/api/deleteNews", payload)
  },
  confirmToken: function () {
    return api.get("/api/confirmToken")
  }
}
