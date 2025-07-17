export function useToastSuccess(
  title: string,
  description: string | undefined
) {
  const toast = useToast();
  toast.add({
    title: title,
    description: description,
    icon: "i-heroicons-check-circle",
    color: "success",
    duration: 3000,
  });
}

export function useToastError(title: string, description: string | undefined) {
  const toast = useToast();
  toast.add({
    title: title,
    description: description,
    icon: "i-heroicons-x-circle",
    color: "error",
    duration: 3000,
  });
}
