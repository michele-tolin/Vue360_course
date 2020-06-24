import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);
import * as firebase from "firebase/app";
import "firebase/auth";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/directory",
    name: "Directory",
    meta: { requiresAuth: true } /* this grant for subroutes */,
    component: () =>
      import(/* webpackChunkName: "directory" */ "../views/Directory.vue"),
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () =>
          import(/* webpackChunkName: "dashboard" */ "../views/Dashboard.vue")
      },
      {
        path: "details",
        name: "Details",
        component: () =>
          import(/* webpackChunkName: "details" */ "../views/Details.vue")
      }
    ]
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

// Adding a guard for routes that needs authentication
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = firebase.auth().currentUser;
  //console.log("isauthenticated", isAuthenticated);
  if (requiresAuth && !isAuthenticated) {
    next("/");
  } else if (isAuthenticated && to.name === "Home") {
    next("/directory/dashboard");
  } else {
    next();
  }
});
