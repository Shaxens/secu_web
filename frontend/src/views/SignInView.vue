<template>
  <div class="container">
    <div class="row">
      <div class="col-6">
        <form class="pb-2" @submit.prevent="login()">
          <div class="form-group pb-3">
            <label for="username">Adresse mail</label>
            <input type="email" class="form-control" id="username" aria-describedby="emailHelp" placeholder="Enter email"
              v-model="username">
          </div>
          <div class="form-group">
            <label for="password">Mot de passe</label>
            <input type="password" class="form-control" id="password" placeholder="Password" v-model="password">
          </div>
          <div class="form-check pb-3">
            <input type="checkbox" class="form-check-input" id="check">
            <label class="form-check-label" for="check">Se souvenir de mon mot de passe</label>
          </div>
          <button type="submit" class="btn btn-primary">Envoyer</button>
        </form>
        <router-link to="/signUp">Vous n'avez pas de compte ?</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { jwtStore } from '../stores/jwtStore';
import { mapActions, mapState } from 'pinia';

export default {
  data() {
    return {
      username: "",
      password: ""
    }
  },
  methods: {
    ...mapActions(jwtStore, ['signIn', 'setAuthorizationHeader']),
    async login() {
      try {
        await this.signIn(this.username, this.password)
        localStorage.setItem("jwt", this.jwt);
        this.setAuthorizationHeader()
        this.$router.push({ path: "/" })
      } catch (e) {
        console.log(e)
        throw Error(`Cannot login to your account${e}`)
      }
    }
  },
  computed: {
    ...mapState(jwtStore, ['jwt'])
  }
}
</script>