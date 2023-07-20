<template>
  <div>
    <div class="row mb-5 justify-content-center">
      <div class="col-6">
        <div class="card border-primary mb-4">
          <div class="card-body">
            <div class="row">
              <div class="card-title col-10">
                <h2>{{ post.label }}</h2>
              </div>
            </div>
            <p>{{ post.content }}</p>
            <figcaption class="blockquote-footer">
              {{ post.userId.fullname }}
            </figcaption>
            <hr class="border border-primary border-1 opacity-30">

            <div class="row">
              <div class="form-group">
                <div class="col">
                  <label for="content">Votre commentaire</label>
                  <textarea class="form-control" id="content" rows="3" v-model="post.comments"></textarea>
                </div>
              </div>
              <div class="w-100 justify-content-end d-flex mt-2">
                <router-link :to="`/`" @click="createComments()" class="btn btn-outline-success">
                  Ajouter le commentaire
                </router-link>
                <router-link :to="`/`" class="btn btn-outline-primary ms-2">
                  Annuler
                </router-link>
              </div>
            </div>
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
        content: "",
        userId: {
          fullname: ""
        },
        comments: []
      }
    }
  },
  async beforeMount() {
    try {
      const postId = this.$route.params.id;
      const response = await axios.get(`/getPost/${postId}`)
      this.post = {
        label: response.data.label,
        content: response.data.content,
        userId: {
          fullname: response.data.userId.fullname
        }
      }
    } catch (e) {
      console.error('Erreur lors de la récupération des données du post :', e);
      throw Error(`Error : ${e}`)
    }
  },
  methods: {
    async createComments() {
      try {
        const postId = this.$route.params.id;
        const params = {
          content: this.post.comments
        };
        const response = await axios.post(`/createComments/${postId}`, params);
      } catch (e) {
        console.error(`Erreur lors de la création du commentaire : ${e}`);
        throw Error(`Error : ${e}`);
      }
    }
  },
}
</script>

<style lang="scss" scoped></style>