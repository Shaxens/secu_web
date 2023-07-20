<template>
  <div class="row mb-5 justify-content-center">
    <h1>Créer un nouveau post</h1>
    <div class="col-6">
      <div class="card border-primary mb-4">
        <div class="card-body">

          <div class="form-group">
            <div class="row">
              <div class="col">
                <label for="label">Titre du post</label>
                <input type="text" class="form-control" id="label" v-model="post.label">
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="col">
              <label for="content">Contenu du post</label>
              <textarea class="form-control" id="content" rows="3" v-model="post.content"></textarea>
            </div>
          </div>

          <div class="w-100 justify-content-end d-flex">
            <button class="btn btn-primary me-2 mt-2" @click="createPost">Confirmer</button>
            <button class="btn btn-secondary mt-2" @click="cancelPost">Annuler</button>
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
      post: {
        label: "",
        content: ""
      }
    }
  },
  methods: {
    async createPost() {
      try {
        const jwt = localStorage.getItem('jwt');
        const params = {
          label: this.post.label,
          content: this.post.content,
          jwt
        }

        return await axios.post('/createPost', params)
          .then(response => {
            console.log('Post créé :', response.data);
            this.$router.push({ path: '/mypost' });
          })
          .catch(error => {
            console.error('Erreur lors de la création du post :', error);
          });
      } catch (e) {
        console.error(`Error Create Post : ${e}`)
        throw Error(`Error : impossible de créer un nouveau post ${e}`)
      }
    },
    cancelPost() {
      this.$router.push({ path: '/mypost' });
    }
  }
}
</script>

<style lang="scss" scoped></style>