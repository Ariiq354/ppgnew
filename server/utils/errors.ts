import { createError } from "h3";

export const InternalServerError = createError({
  statusCode: 500,
  message: "An unexpected error has occurred.",
});

export const ForbiddenError = createError({
  statusCode: 403,
  message: "You do not have permission to perform this action.",
});

export const UnauthorizedError = createError({
  statusCode: 401,
  message: "Authentication is required or has expired.",
});
