export default defineEventHandler(async (event) => {
  authGuard(event);

  return HttpResponse();
});
