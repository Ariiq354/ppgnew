export async function to<T, E = Error>(
  promise: Promise<T>
): Promise<[T, null] | [null, E]> {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    return [null, error as E];
  }
}

export function assertNoErr<T>(label: string, [data, err]: [T | null, any]) {
  if (err) {
    console.error(label, err);
    throw InternalError;
  }
  return data as T;
}
