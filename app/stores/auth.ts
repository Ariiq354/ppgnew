import {
  adminClient,
  inferAdditionalFields,
  usernameClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/vue";
import { useToastError, useToastSuccess } from "~/composables/toast";
import type { auth } from "~~/server/utils/auth";
import { ac, admin, user } from "~~/shared/permission";
import type { TStatement } from "~~/shared/permission";

const authClient = createAuthClient({
  plugins: [
    inferAdditionalFields<typeof auth>(),
    usernameClient(),
    adminClient({
      ac,
      roles: {
        admin,
        user,
      },
    }),
  ],
});

type TSignIn = {
  username: string;
  password: string;
  rememberMe: boolean;
};

type TSignUp = {
  daerah: string;
};

export const useAuthStore = defineStore("useAuthStore", () => {
  const session = ref<Awaited<ReturnType<typeof authClient.useSession>> | null>(
    null
  );

  const user = computed(() => session.value?.data?.user);
  const loading = ref(false);

  async function init() {
    loading.value = true;
    const data = await authClient.useSession(useFetch);
    session.value = data;
    loading.value = false;
  }

  async function signIn(body: TSignIn) {
    loading.value = true;
    await authClient.signIn.username({
      ...body,
      fetchOptions: {
        onError: (body) => {
          useToastError("Login Failed", body.error.message);
        },
        onSuccess: () => {
          window.location.href = "/dashboard";
        },
      },
    });
    loading.value = false;
  }

  async function signUp(body: TSignUp) {
    loading.value = true;
    try {
      const res = await $fetch(`${APIBASE}/user/register`, {
        method: "POST",
        body,
      });

      useToastSuccess("Register Success", "Silahkan login untuk masuk");
      return res;
    } catch (error: any) {
      useToastError("Register Failed", error.data.message);
    } finally {
      loading.value = false;
    }
  }

  async function signOut() {
    loading.value = true;
    await authClient.signOut({
      fetchOptions: {
        onError: (body) => {
          useToastError("Logout Failed", body.error.message);
        },
        onSuccess: () => {
          window.location.href = "/dashboard";
        },
      },
    });

    loading.value = false;
  }

  async function hasPermission(body: TStatement) {
    const result = await authClient.admin.hasPermission({
      permissions: body,
    });

    return result.data?.success;
  }

  async function updatePassword(newPassword: string, currentPassword: string) {
    loading.value = true;
    await authClient.changePassword({
      newPassword,
      currentPassword,
      fetchOptions: {
        onError: (body) => {
          useToastError("Change Password Failed", body.error.message);
        },
        onSuccess: () => {
          useToastSuccess(
            "Change Password Success",
            "Your password has changed"
          );
        },
      },
    });
    loading.value = false;
  }

  return {
    init,
    loading,
    signIn,
    signUp,
    user,
    signOut,
    hasPermission,
    updatePassword,
    session,
  };
});
