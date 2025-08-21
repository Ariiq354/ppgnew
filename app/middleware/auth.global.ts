import type { roles } from "~~/shared/permission";

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();
  await authStore.init();

  // Base Protection
  if (to.path.startsWith("/dashboard") && !authStore.user) {
    return navigateTo("/");
  }

  if (authStore.user && (to.path === "/" || to.path === "/register")) {
    return navigateTo("/dashboard");
  }

  // Per Route Protection
  if (
    to.path.startsWith("/dashboard/pengaturan-user") &&
    !authStore.hasPermission({ menu: ["daftar-user"] })
  ) {
    return navigateTo("/dashboard");
  }

  if (authStore.user) {
    const routePermissions: {
      route: string;
      bidang: (typeof roles)[number];
    }[] = [
      { route: "/dashboard/bimbingan", bidang: "bimbingan_konseling" },
      { route: "/dashboard/kegiatan", bidang: "kegiatan_muda_mudi" },
      { route: "/dashboard/kemandirian", bidang: "kemandirian" },
      { route: "/dashboard/keputrian", bidang: "keputrian" },
      { route: "/dashboard/kurikulum", bidang: "kurikulum" },
      { route: "/dashboard/media", bidang: "media_publikasi" },
      { route: "/dashboard/olahraga", bidang: "olahraga_seni" },
      { route: "/dashboard/dana", bidang: "penggalang_dana" },
      { route: "/dashboard/sarana", bidang: "sarana_prasarana" },
      { route: "/dashboard/sekretariat", bidang: "sekretariat" },
      { route: "/dashboard/tahfidz", bidang: "tahfidz" },
      { route: "/dashboard/pendidik", bidang: "tenaga_pendidik" },
    ];

    for (const { route, bidang } of routePermissions) {
      if (
        to.path.startsWith(route) &&
        !authStore.hasPermission({ [bidang]: ["view"] })
      ) {
        return navigateTo("/dashboard");
      }
    }
  }
});
