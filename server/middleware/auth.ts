import type { bidangEnum } from "~~/shared/enum";
import type { UserWithId } from "../utils/auth";

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers,
  });
  event.context.user = session?.user as unknown as UserWithId;

  // Base Protection
  if (event.path.startsWith("/dashboard") && !session?.user) {
    await sendRedirect(event, "/", 302);
  }

  if (session?.user && (event.path === "/" || event.path === "/register")) {
    await sendRedirect(event, "/dashboard", 302);
  }

  // Per Route Protection
  if (event.path.startsWith("/dashboard/pengaturan-user")) {
    const res = await auth.api.userHasPermission({
      body: {
        userId: session?.user.id,
        permission: { menu: ["daftar-user"] },
      },
    });
    if (!res.success) {
      await sendRedirect(event, "/dashboard", 302);
    }
  }

  if (event.path.startsWith("/dashboard/kelompok")) {
    const res = await auth.api.userHasPermission({
      body: {
        userId: session?.user.id,
        permission: { pjp_kelompok: ["view"] },
      },
    });
    if (!res.success) {
      await sendRedirect(event, "/dashboard", 302);
    }
  }

  if (event.path.startsWith("/dashboard/desa")) {
    const res = await auth.api.userHasPermission({
      body: {
        userId: session?.user.id,
        permission: { pjp_desa: ["view"] },
      },
    });
    if (!res.success) {
      await sendRedirect(event, "/dashboard", 302);
    }
  }

  if (session?.user) {
    const routePermissions: {
      route: string;
      bidang: (typeof bidangEnum)[number];
    }[] = [
      { route: "/dashboard/bimbingan", bidang: "bimbingan_konseling" },
      { route: "/dashboard/kegiatan", bidang: "kegiatan_muda_mudi" },
      { route: "/dashboard/kemandirian", bidang: "kemandirian" },
      { route: "/dashboard/keputrian", bidang: "keputrian" },
      { route: "/dashboard/kurikulum", bidang: "kurikulum" },
      { route: "/dashboard/olahraga", bidang: "olahraga_seni" },
      { route: "/dashboard/dana", bidang: "penggalang_dana" },
      { route: "/dashboard/sarana", bidang: "sarana_prasarana" },
      { route: "/dashboard/sekretariat", bidang: "sekretariat" },
      { route: "/dashboard/tahfidz", bidang: "tahfidz" },
      { route: "/dashboard/pendidik", bidang: "tenaga_pendidik" },
    ];

    for (const { route, bidang } of routePermissions) {
      if (event.path.startsWith(route)) {
        const res = await auth.api.userHasPermission({
          body: {
            userId: session?.user.id,
            permission: { [bidang]: ["view"] },
          },
        });
        if (!res.success) {
          await sendRedirect(event, "/dashboard", 302);
        }
      }
    }
  }
});

declare module "h3" {
  interface H3EventContext {
    user: UserWithId | undefined;
  }
}
