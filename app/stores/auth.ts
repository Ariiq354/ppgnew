import {
  adminClient,
  inferAdditionalFields,
  usernameClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/vue";
import { useToastError, useToastSuccess } from "~/composables/toast";
import { APIBASE } from "~/utils";
import type { auth } from "~~/server/utils/auth";
import type { bidangEnum } from "~~/shared/enum";
import { ac, rolesDeclaration } from "~~/shared/permission";
import type { TStatement } from "~~/shared/permission";

export const authClient = createAuthClient({
  plugins: [
    inferAdditionalFields<typeof auth>(),
    usernameClient(),
    adminClient({
      ac,
      roles: rolesDeclaration,
    }),
  ],
});

type Wilayah = {
  daerahId: number;
  desaId: number;
  kelompokId: number;
};

type TSignIn = {
  username: string;
  password: string;
  rememberMe: boolean;
};

type TSignUp = {
  daerah: string;
};

export const useAuthStore = defineStore("useAuthStore", () => {
  const user = ref();
  const loading = ref(false);

  function setUser(item: any) {
    user.value = item;
  }

  async function signIn(body: TSignIn) {
    loading.value = true;
    const { error } = await authClient.signIn.username({
      ...body,
    });

    if (error) {
      useToastError("Login Failed", error.message);
    } else {
      const { data } = await authClient.getSession();
      setUser(data?.user);

      await navigateTo("/dashboard");
    }
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
        onSuccess: async () => {
          await navigateTo("/");
        },
      },
    });

    loading.value = false;
  }

  function hasPermission(body: TStatement) {
    const result = authClient.admin.checkRolePermission({
      permission: body,
      role: user.value?.role as (typeof bidangEnum)[number],
    });

    return result;
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

  async function updateWilayah(body: Wilayah) {
    loading.value = true;
    try {
      const res = await $fetch(`${APIBASE}/user/wilayah`, {
        method: "POST",
        body,
      });

      useToastSuccess("Wilayah berhasil diganti", "Selamat Datang");
      reloadNuxtApp({ force: true });
      return res;
    } catch (error: any) {
      useToastError("Change Wilayah Failed", error.data.message);
    } finally {
      loading.value = false;
    }
  }

  return {
    loading,
    signIn,
    signUp,
    user,
    setUser,
    signOut,
    hasPermission,
    updatePassword,
    updateWilayah,
  };
});
