<template>
  <div class="container-fluid">
    <header class="d-flex flex-wrap py-3 px-4 mb-4 border-bottom">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <ul class="nav nav-pills gap-2">
        <li class="nav-item">
          <router-link to="/" exact-active-class="active" active-class="active" class="nav-link">
            <i class="fa-solid fa-house" />&nbsp;Accueil
          </router-link>
        </li>
        <li class="nav-item">
          <router-link exact-active-class="active" active-class="active" to="/mypost" class="nav-link">
            A propos
          </router-link>
        </li>
        <li class="nav-item" v-if="jwt">
          <router-link exact-active-class="active" active-class="active" to="/profile" class="nav-link">
            <i class="fa-solid fa-user"></i>&nbsp;Profil
          </router-link>
        </li>
        <li class="nav-item" v-if="!jwt">
          <router-link exact-active-class="active" active-class="active" to="/signin" class="nav-link">
            <i class="fa-solid fa-key"></i>&nbsp;Connexion
          </router-link>
        </li>
        <li class="nav-item" v-else>
          <router-link exact-active-class="active" active-class="active" to="/signin" class="nav-link" @click="logout()">
            &nbsp;Déconnexion
          </router-link>
        </li>
      </ul>
    </header>

    <main class="container main-router-container">
      <router-view />
    </main>
  </div>
</template>

<script>
import { jwtStore } from '@/stores/jwtStore'
import { mapState } from 'pinia';

export default {
  computed: {
    ...mapState(jwtStore, ['jwt']),
  },
  mounted() {
    console.log(this.jwt)
  },
  methods: {
    async logout() {
      try {
        localStorage.removeItem("jwt")
      } catch (e) {
        console.log(e)
        throw Error(`Error while logout${e}`)
      }
    }
  },
}

</script>

<style scoped></style>
