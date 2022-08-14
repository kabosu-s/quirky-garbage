import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'ガラクタ置き場', desc: 'いろいろ試してみているところです。' },
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('../views/Blog.vue'),
    meta: { title: 'ブログ', desc: 'ブログです。' },
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: { title: 'ABOUT', desc: 'ガラクタ置き場です。' },
  },
  {
    path: '/articles/:id',
    name: 'article-detail',
    component: () => import('../views/ArticleDetail.vue'),
    props: true,
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/Contact.vue'),
    meta: { title: 'CONTACT', desc: 'お問い合わせはこちら' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Notfound',
    component: () => import('../views/NotFound.vue'),
    meta: { title: 'Not Found', desc: 'ページが見つかりません' },
  },
];

//ページ遷移時にページ先頭に移動する
const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition;
  } else {
    return { top: 0 }
  }
};

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior,
});

export default router;
