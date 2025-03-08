import { createRouter, createWebHistory } from "vue-router";
import ScenarioEditor from "@/views/ScenarioEditor.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: ScenarioEditor,
    },
  ],
});

export default router;
