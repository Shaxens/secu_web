<template>
  <div>
    <div class="row mb-5">
      <div class="col-6">
        <h1>Tous les posts</h1>
      </div>
      <div class="col-6 justify-content-end align-items-center d-flex">
        <router-link :to="`/createPost`" class="btn btn-primary">Créer un nouveau post</router-link>
      </div>
    </div>

    <div v-if="posts.length === 0" class="text-center">
      <h4>Aucun utilisateur n'a encore créé de post.</h4>
    </div>

    <div class="row mb-5" data-masonry='{"percentPosition": true }'>
      <div class="col-6">
        <div class="card border-primary mb-4" v-for="(post, index) in leftFilteredPosts" :key="post._id">
          <div class="card-body">
            <div class="card-title">
              <h2>{{ post.label }}</h2>
            </div>
            <p>{{ post.content }}</p>
            <div class="w-100 justify-content-end d-flex">
              <router-link :to="`/viewPost/${post._id}`" class="btn btn-outline-primary ms-2">
                Commenter
              </router-link>
            </div>
            <figcaption class="blockquote-footer">
              {{ post.userId.fullname }}
            </figcaption>

            <button class="btn btn-outline-secondary" @click="showPostComments(post)">
              <i class="fa-regular fa-comments"></i>&nbsp;Commentaires
            </button>

            <!-- Afficher les commentaires -->
            <div v-if="post.showComments" class="comments">
              <h3>Commentaires :</h3>
              <ul>
                <li v-for="comment in post.comments" :key="comment._id">
                  {{ comment.content }} - {{ comment.userId.fullname }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="col-6">
        <div class="card border-primary mb-4" v-for="(post, index) in rightFilteredPosts" :key="post._id">
          <div class="card-body">
            <div class="card-title">
              <h2>{{ post.label }}</h2>
            </div>
            <p>{{ post.content }}</p>
            <div class="w-100 justify-content-end d-flex">
              <router-link :to="`/viewPost/${post._id}`" class="btn btn-outline-primary ms-2">
                Commenter
              </router-link>
            </div>
            <figcaption class="blockquote-footer">
              {{ post.userId.fullname }}
            </figcaption>

            <button class="btn btn-outline-secondary" @click="showPostComments(post)">
              <i class="fa-regular fa-comments"></i>&nbsp;Commentaires
            </button>

            <!-- Afficher les commentaires -->
            <div v-if="post.showComments" class="comments">
              <h3>Commentaires :</h3>
              <ul>
                <li v-for="comment in post.comments" :key="comment._id">
                  {{ comment.content }} - {{ comment.userId.fullname }}
                </li>
              </ul>
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
      posts: [],
      selectedPost: null,
      showComments: false,
    }
  },
  async mounted() {
    try {
      const response = await axios.get('/getAllPost');
      console.log(response.data);
      this.posts = response.data.map(post => ({ ...post, showComments: false }));
      this.posts.sort(this.sortByDateDesc);
      return response;
    } catch (e) {
      throw Error(`Cannot get all post : ${e}`);
    }
  },
  methods: {
    sortByDateDesc(a, b) {
      return new Date(b.createdDate) - new Date(a.createdDate);
    },
    async getPost() {
      await axios.get('/')
    },
    async showPostComments(post) {
      try {
        if (this.selectedPost && this.selectedPost._id === post._id) {
          this.toggleComments(post);
        } else {
          const response = await axios.get(`/getPost/${post._id}`);
          const comments = response.data.comments;
          console.log(response.data);
          const selectedPostIndex = this.posts.findIndex((p) => p._id === post._id);
          if (selectedPostIndex !== -1) {
            this.posts[selectedPostIndex].comments = comments;
          }

          this.posts.forEach((p) => (p.showComments = false));
          post.showComments = !post.showComments;

          this.selectedPost = post;
        }
      } catch (e) {
        throw Error(`Cannot get post comments: ${e}`);
      }
    },

    toggleComments(post) {
      post.showComments = !post.showComments;
      if (!post.showComments || (this.selectedPost && this.selectedPost._id !== post._id)) {
        this.selectedPost = null;
      }
    },
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

<style lang="scss" scoped></style>
