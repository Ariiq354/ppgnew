export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuthStore();

  const { data } = await authClient.useSession(useFetch);
  authStore.user = data.value?.user;
});
