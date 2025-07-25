export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();
  await authStore.init();

  // Base Protection
  if (to.path.startsWith("/dashboard") && !authStore.user) {
    console.log("check");
    return navigateTo("/");
  }

  if (authStore.user && (to.path === "/" || to.path === "/register")) {
    console.log("check2");
    return navigateTo("/dashboard");
  }

  // Per Route Protection
  if (
    authStore.user &&
    to.path.startsWith("/dashboard/pengaturan-user") &&
    !(await authStore.hasPermission({ menu: ["user"] }))
  ) {
    return navigateTo("/dashboard");
  }
});
