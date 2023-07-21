<template>
  <div>
    <div class="row mb-5">
      <div class="col-6">
        <h1>Mes posts</h1>
      </div>
      <div class="col-6 justify-content-end align-items-center d-flex">
        <router-link to="/createPost" class="btn btn-primary">Créer un nouveau post</router-link>
      </div>
    </div>

    <div v-if="posts.length === 0" class="text-center">
      <h4>Vous n'avez pas encore créé de post.</h4>
    </div>

    <div class="row mb-5" data-masonry='{"percentPosition": true }'>
      <div class="col-6">
        <div class="card border-primary mb-4" v-for="(post, index) in leftFilteredPosts" :key="post._id">
          <div class="card-body">
            <div class="row">
              <div class="card-title col-10">
                <h2>{{ post.label }}</h2>
              </div>
              <div class="col d-flex justify-content-end align-items-center">
                <button class="btn btn-outline-danger" @click="deletePost(post._id)"><i
                    class="fa-solid fa-xmark"></i></button>
              </div>
            </div>
            <p>{{ post.content }}</p>
            <div class="w-100 justify-content-end d-flex">
              <router-link :to="{ name: 'post-edit', params: { id: post._id } }" class="btn btn-outline-success">
                Modifier
              </router-link>
              <router-link :to="`/viewPost/${post._id}`" class="btn btn-outline-primary ms-2">
                Commenter
              </router-link>
            </div>
            <figcaption class="blockquote-footer">
              {{ post.userId.fullname }}
            </figcaption>
          </div>
        </div>
      </div>

      <div class="col-6">
        <div class="card border-primary mb-4" v-for="(post, index) in rightFilteredPosts" :key="post._id">
          <div class="card-body">
            <div class="row">
              <div class="card-title col-10">
                <h2>{{ post.label }}</h2>
              </div>
              <div class="col d-flex justify-content-end align-items-center">
                <button class="btn btn-outline-danger" @click="deletePost(post._id)"><i
                    class="fa-solid fa-xmark"></i></button>
              </div>
            </div>
            <p>{{ post.content }}</p>
            <div class="w-100 justify-content-end d-flex">
              <router-link :to="{ name: 'post-edit', params: { id: post._id } }" class="btn btn-outline-success">
                Modifier
              </router-link>
              <router-link :to="`/viewPost/${post._id}`" class="btn btn-outline-primary ms-2">
                Commenter
              </router-link>
            </div>
            <figcaption class="blockquote-footer">
              {{ post.userId.fullname }}
            </figcaption>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      posts: []
    };
  },
  mounted() {
    this.getMyPosts();
  },
  methods: {
    async getMyPosts() {
      try {
        const response = await axios.get('/getUserPost');
        this.posts = response.data;
        console.log(response.data)
      } catch (e) {
        console.error('Erreur lors de la récupération des posts :', e);
      }
    },
    async deletePost(id) {
      try {
        const response = await axios.delete(`deletePost/${id}`);
        await this.getMyPosts()
      } catch (e) {
        console.error('Erreur lors de la suppression du post : ', e)
      }
    }
  },
  computed: {
    leftFilteredPosts() {
      return this.posts.filter((_, index) => index % 2 === 0);
    },
    rightFilteredPosts() {
      return this.posts.filter((_, index) => index % 2 !== 0);
    },
  },
}
</script>

<style></style>
