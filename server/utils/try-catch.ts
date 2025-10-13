export async function tryCatch<T>(
  label: string,
  promise: Promise<T>
): Promise<T> {
  try {
    return await promise;
  } catch (err) {
    console.error(label, err);
    throw InternalServerError;
  }
}
