// stores/counter.js
import { defineStore } from 'pinia'
import axios from 'axios'


const postStore = defineStore('postStore', {
  state: () => ({
    post: []
  }),
  actions: {
    async getAllPost() {
      try {
        const response = await axios.get('/getAllPost');
        this.posts = [];
        this.posts = response.data
        this.posts.sort(this.sortByDateDesc);
        return response
      } catch (e) {
        throw Error(`Cannot get all post : ${e}`)
      }
    },
    sortByDateDesc(a, b) {
      return new Date(b.date) - new Date(a.date);
    },
  },
  getters: {
    leftFilteredPosts() {
      return this.posts.filter((_, index) => index % 2 === 0);
    },
    rightFilteredPosts() {
      return this.posts.filter((_, index) => index % 2 !== 0);
    },
  }
})

export { postStore }