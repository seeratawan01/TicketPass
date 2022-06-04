import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useAuthStore } from "../stores";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/event",
      name: "event",
      redirect: "/event/new",
      component: () => import("../components/EventRoot.vue"),
      children: [
        {
          path: "/event/new",
          name: "create-event",
          component: () => import("../views/CreateEventView.vue"),
        },
        {
          path: "/event/:id",
          name: "view-event",
          component: () => import("../views/EventView.vue"),
        },
      ],
    },
  ],
});

router.beforeEach(async (to) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const privatePages = ["/event/new"];
  const authRequired = privatePages.includes(to.path);
  const auth = useAuthStore();

  if (authRequired && !auth.access_token) {
    auth.returnUrl = to.fullPath;
    return "/login";
  }
});

export default router;
