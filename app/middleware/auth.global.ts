export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuthStore();
  await authStore.init();
});
