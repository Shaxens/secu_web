<template>
  <div class="container">
    <div class="row">
      <div class="col-6">
        <form class="pb-2" @submit.prevent="signUp()">
          <div class="form-group pb-3">
            <label for="username">Adresse mail</label>
            <input type="email" class="form-control" id="username" aria-describedby="emailHelp" placeholder="Enter email"
              v-model="username">
          </div>
          <div class="form-group pb-3">
            <label for="password">Mot de passe</label>
            <input type="password" class="form-control" id="password" placeholder="Password" v-model="password">
          </div>
          <button type="submit" class="btn btn-primary">Envoyer</button>
        </form>
        <router-link to="/signIn">Vous avez déjà un compte ?</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      username: "",
      password: ""
    }
  },
  methods: {
    async signUp() {
      // On extrait le prénom à partir de l'adresse e-mail
      const atIndex = this.username.indexOf("@");
      const firstname = atIndex !== -1 ? this.username.substring(0, atIndex) : "";

      const params = {
        username: this.username,
        password: this.password,
        firstname: firstname,
        lastname: ""
      };

      try {
        return await axios.post('/signUp', params).then(() => {
          this.$router.push({ path: "/signin" }).then(() => {
            this.$router.go();
          });
        });
      } catch (e) {
        throw Error(`Cannot create new account : ${e}`);
      }
    }
  }
}
</script>