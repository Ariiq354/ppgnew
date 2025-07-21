export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();
  await authStore.init();

  // Base Protection
  if (to.path.startsWith("/dashboard") && !authStore.user) {
    return navigateTo("/");
  }

  if (authStore.user && (to.path === "/" || to.path === "/register")) {
    return navigateTo("/dashboard");
  }
});
