// stores/counter.js
import { defineStore } from 'pinia'
import axios from 'axios'


const jwtStore = defineStore('jwtStore', {
  state: () => ({
    jwt: ""
  }),
  actions: {
    async signIn(username, password) {
      const params = { username, password }
      const response = await axios.post('/signIn', params)
      if (response.data != undefined) {
        this.jwt = response.data
      } else {
        console.error("SIGN IN :: Error while signing in")
      }
    },
    async logout() {
      this.jwt = ""
    },
    setAuthorizationHeader() {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.jwt}`
    },
    removeAuthorizationHeader() {
      axios.defaults.headers.common['Authorization'] = ``
    },
  },
})

export { jwtStore }