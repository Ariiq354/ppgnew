import type { H3Event } from "h3";

export function authGuard(event: H3Event) {
  if (!event.context.user) {
    throw createError({
      statusCode: 401,
      message: "Unauthenticated",
    });
  }

  return event.context.user;
}

export function adminGuard(event: H3Event) {
  const user = authGuard(event);

  if (user.role !== "admin") {
    throw createError({
      statusCode: 403,
      message: "Unauthorized",
    });
  }

  return event.context.user;
}
