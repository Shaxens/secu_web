<template>
  <div class="container">
    <h1>User Profile</h1>
    <div class="row">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ user.fullname }}</h5>
            <p class="card-text">Email: {{ user.username }}</p>
            <p class="card-text">Bio: {{ user.bio }}</p>
            <button class="btn btn-primary" @click="editProfile()">Edit Profile</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios'

export default {
  data() {
    return {
      user: {}
    }
  },
  async mounted() {
    try {
      const jwt = localStorage.getItem("jwt");
      const response = await axios.post('/getUser', { jwt })
      this.user = JSON.parse(response.data);
      return response
    } catch (e) {
      console.error(e)
    }
  },
  methods: {
    editProfile() {
      this.$router.push({ path: '/editProfile' });
    }
  }
}
</script>

<style lang="scss" scoped></style>