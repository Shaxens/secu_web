<template>
  <div class="row mb-5 justify-content-center">
    <h1>Modifier le post : {{ post.label }}</h1>
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
            <button class="btn btn-success me-2 mt-2" @click="editPost">Confirmer</button>
            <router-link to="/mypost" class="btn btn-outline-secondary mt-2">Annuler</router-link>
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
  async beforeMount() {
    try {
      const postId = this.$route.params.id;
      const response = await axios.get(`/getPost/${postId}`)
      this.post = {
        label: response.data.label,
        content: response.data.content
      }
    } catch (e) {
      console.error('Erreur lors de la récupération des données du post :', e);
      throw Error(`Error : ${e}`)
    }
  },
  methods: {
    async editPost() {
      try {
        const postId = this.$route.params.id;
        const updatedPost = {
          label: this.post.label,
          content: this.post.content
        };
        await axios.put(`/editPost/${postId}`, updatedPost);
        this.$router.push({ path: `/mypost` });
      } catch (error) {
        console.error('Erreur lors de la mise à jour du post :', error);
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
