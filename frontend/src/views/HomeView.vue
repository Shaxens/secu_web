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


    <div class="row mb-5" data-masonry='{"percentPosition": true }'>
      <div class="col-6">
        <div class="card border-primary mb-4" v-for="(post, index) in leftFilteredPosts" :key="post.uuid">
          <div class="card-body">
            <div class="card-title">
              <h2>{{ post.label }}</h2>
            </div>
            <p>{{ post.content }}</p>
            <div class="w-100 justify-content-end d-flex">
              <router-link :to="`/viewPost/${post.uuid}`" class="btn btn-outline-primary ms-2">
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
                <li v-for="comment in selectedPost.comments" :key="comment.uuid">
                  {{ comment.content }} - {{ comment.userId.fullname }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="col-6">
        <div class="card border-primary mb-4" v-for="(post, index) in rightFilteredPosts" :key="post.uuid">
          <div class="card-body">
            <div class="card-title">
              <h2>{{ post.label }}</h2>
            </div>
            <p>{{ post.content }}</p>
            <div class="w-100 justify-content-end d-flex">
              <router-link :to="`/viewPost/${post.uuid}`" class="btn btn-outline-primary ms-2">
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
                <li v-for="comment in selectedPost.comments" :key="comment.uuid">
                  {{ comment.content }} - {{ comment.userId && comment.userId.fullname }}
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
      return new Date(b.date) - new Date(a.date);
    },
    async getPost() {
      await axios.get('/')
    },
    async showPostComments(post) {
      try {
        if (this.selectedPost && this.selectedPost.uuid === post.uuid) {
          this.toggleComments(post);
        } else {
          const response = await axios.get(`/getPost/${post.uuid}`);
          this.selectedPost = response.data;
          this.posts.forEach(p => (p.showComments = false));
          post.showComments = true;
        }
      } catch (e) {
        throw Error(`Cannot get post comments: ${e}`);
      }
    },
    toggleComments(post) {
      post.showComments = !post.showComments;
      if (!post.showComments || (this.selectedPost && this.selectedPost.uuid !== post.uuid)) {
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