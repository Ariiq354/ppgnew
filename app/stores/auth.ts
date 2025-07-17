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
  email: string;
  name: string;
  password: string;
  username: string;
};

export const useAuthStore = defineStore("useAuthStore", () => {
  const session = ref<Awaited<ReturnType<typeof authClient.getSession>> | null>(
    null
  );

  async function init() {
    loading.value = true;
    const { data } = await authClient.getSession();
    session.value = data;
    loading.value = false;
  }

  const user = computed(() => session.value?.data?.user);
  const loading = ref(false);

  async function signIn(body: TSignIn) {
    loading.value = true;
    await authClient.signIn.username({
      ...body,
      fetchOptions: {
        onError: (body) => {
          useToastError("Login Failed", body.error.message);
        },
        onSuccess: async () => {
          useToastSuccess("Login Success", "Selamat datang di Berkah Amanah");
          await init();

          window.location.href = "/dashboard";
        },
      },
    });
    loading.value = false;
  }

  async function signUp(body: TSignUp) {
    loading.value = true;
    await authClient.signUp.email({
      ...body,
      fetchOptions: {
        onError: (body) => {
          useToastError("Register Failed", body.error.message);
        },
        onSuccess: async () => {
          useToastSuccess("Register Success", "Silahkan login untuk masuk");
          await navigateTo("/login");
        },
      },
    });
    loading.value = false;
  }

  async function signOut() {
    loading.value = true;
    await authClient.signOut({
      fetchOptions: {
        onError: (body) => {
          useToastError("Logout Failed", body.error.message);
        },
        onSuccess: async () => {
          await init();
          await navigateTo("/");
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

  async function updateUser(body: { name?: string; noTelepon?: string }) {
    loading.value = true;
    await authClient.updateUser({
      ...body,
      fetchOptions: {
        onError: (body) => {
          useToastError("Update Failed", body.error.message);
        },
        onSuccess: () => {
          useToastSuccess("Update Success", "Your profile has been updated");
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
    updateUser,
    session,
  };
});
