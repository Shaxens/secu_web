import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/mypost',
      name: 'my-post',
      component: () => import('../views/UserPostView.vue')
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('../views/SignInView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignUpView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/editProfile',
      name: 'profile-edit',
      component: () => import('../views/ProfileEditView.vue'),
    },
    {
      path: '/viewPost/:id',
      name: 'post-view',
      component: () => import('../views/PostComView.vue'),
    },
    {
      path: '/editPost/:id',
      name: 'post-edit',
      component: () => import('../views/PostEditView.vue'),
    },
    {
      path: '/createPost',
      name: 'post-create',
      component: () => import('../views/PostCreateView.vue'),
    }
  ]
})

export default router
