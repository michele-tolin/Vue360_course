import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  //Config page wher you can select something
  {
    path: "/",
    name: "Config",
    component: () =>
      import(/* webpackChunkName: "Config" */ "../views/ConfigPage.vue")
  },
  //Config page wher you can select something
  {
    path: "/quiz/:step*",
    name: "Quiz",
    component: () =>
      import(/* webpackChunkName: "Quiz" */ "../views/QuizPage.vue")
  },
  {
    path: "/halloffame",
    name: "HallOfFame",
    // route level code-splitting
    // this generates a separate chunk (HallOfFame.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "HallOfFame" */ "../views/HallOfFame.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
