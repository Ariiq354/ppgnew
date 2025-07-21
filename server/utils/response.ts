// Overload definitions
export function HttpResponse(): { statusCode: number; message: string };
export function HttpResponse<T>(data: T): {
  statusCode: number;
  message: string;
  data: T;
};
export function HttpResponse<T, K>(
  data: T,
  metadata: K
): { statusCode: number; message: string; data: T; metadata: K };

// Implementation
export function HttpResponse<T, K>(data?: T, metadata?: K) {
  return {
    statusCode: 200,
    message: "Success",
    ...(data !== undefined && { data }),
    ...(metadata !== undefined && { metadata }),
  };
}
