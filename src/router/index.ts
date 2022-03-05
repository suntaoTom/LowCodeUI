import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  RouteRecordRaw
} from "vue-router";
import Design from "@/views/Design.vue";
import Login from "@/views/Login.vue";
import Home from "@/views/Home.vue";
import Application from "@/views/Application.vue";
import ProjectMembers from "@/views/ProjectMembers.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "/",
    component: Design,
    meta: { hidden: true },
    children: []
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { hidden: true },
    children: []
  },
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    path: "/application",
    name: "Application",
    component: Application,
    children: []
  },
  {
    path: "/project_members",
    name: "ProjectMembers",
    component: ProjectMembers,
    children: []
  },
  {
    path: "/design",
    name: "Design",
    component: Design
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/pc/index.vue")
  }
];

const router: any = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
});

export default router;
