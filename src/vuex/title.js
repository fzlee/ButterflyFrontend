const title = {
  state: {
    title: {
      content: '',
      base: ''
    }
  },
  mutations: {
    setTitle (state, content) {
      state.title.content = content
      document.title = state.title.content || 'ifconfiger'
    }
  },
  getters: {
    title (state) {
      return state.title.content
    }
  }
}

export default title
