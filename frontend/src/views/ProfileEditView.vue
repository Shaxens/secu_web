<template>
  <div class="container">
    <h1>Edit Profile</h1>
    <div class="row">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <div class="form-group">
              <div class="row">
                <div class="col">
                  <label for="firstname">First Name</label>
                  <input type="text" class="form-control" id="firstname" v-model="user.firstname">
                </div>
                <div class="col">
                  <label for="lastname">Last Name</label>
                  <input type="text" class="form-control" id="lastname" v-model="user.lastname">
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" class="form-control" id="email" v-model="user.username">
            </div>
            <div class="form-group">
              <label for="bio">Bio</label>
              <textarea class="form-control" id="bio" rows="3" v-model="user.bio"></textarea>
            </div>
            <button class="btn btn-primary" @click="saveProfile">Save</button>
            <button class="btn btn-secondary" @click="cancelProfile">Cancel</button>
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
    saveProfile() {
      const jwt = localStorage.getItem('jwt');
      const config = {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      };

      const updatedProfile = {
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        fullname: this.user.fullname,
        bio: this.user.bio
      };

      axios
        .put('/updateUser', updatedProfile, config)
        .then(response => {
          console.log('Profil mis à jour :', response.data);
          this.$router.push({ path: '/profile' });
        })
        .catch(error => {
          console.error('Erreur lors de la mise à jour du profil :', error);
        });
    },
    cancelProfile() {
      this.$router.push({ path: '/profile' });
    }
  }
}
</script>

<style lang="scss" scoped></style>