import { createRouter, createWebHistory } from 'vue-router';
const routes = [
  { path: '/', component: { template: '<div />' } }, // absorbs ""
];
export default createRouter({
  history: createWebHistory(),
  routes,
});
