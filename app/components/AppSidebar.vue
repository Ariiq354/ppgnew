<script setup lang="ts">
  const constantStore = useConstantStore();
  const authStore = useAuthStore();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [
    user,
    sekretariat,
    kurikulum,
    tenaga_pendidik,
    penggalang_dana,
    sarana_prasarana,
    kemandirian,
    keputrian,
    bimbingan_konseling,
    olahraga_seni,
    kegiatan_muda_mudi,
    tahfidz,
    media_publikasi,
    karakter,
    desa_menu,
    kelompok_menu,
  ] = await Promise.all([
    authStore.hasPermission({ menu: ["user"] }),
    authStore.hasPermission({ sekretariat: ["view"] }),
    authStore.hasPermission({ kurikulum: ["view"] }),
    authStore.hasPermission({ tenaga_pendidik: ["view"] }),
    authStore.hasPermission({ penggalang_dana: ["view"] }),
    authStore.hasPermission({ sarana_prasarana: ["view"] }),
    authStore.hasPermission({ kemandirian: ["view"] }),
    authStore.hasPermission({ keputrian: ["view"] }),
    authStore.hasPermission({ bimbingan_konseling: ["view"] }),
    authStore.hasPermission({ olahraga_seni: ["view"] }),
    authStore.hasPermission({ kegiatan_muda_mudi: ["view"] }),
    authStore.hasPermission({ tahfidz: ["view"] }),
    authStore.hasPermission({ media_publikasi: ["view"] }),
    authStore.hasPermission({ karakter: ["view"] }),
    authStore.hasPermission({ karakter: ["view"] }),
    authStore.hasPermission({ karakter: ["view"] }),
  ]);

  const sidebarItems = computed(() => [
    [
      {
        label: "Daerah",
        type: "label",
      },
      {
        label: "Home Dashboard",
        to: "/dashboard",
        icon: "i-heroicons-home",
        onSelect: () => {
          if (!isDesktop.value) {
            constantStore.toggleSidebar();
          }
        },
      },
      {
        label: "Tenaga Pengajar",
        icon: "i-heroicons-users",
        to: "/dashboard/pengajar",
        onSelect: () => {
          if (!isDesktop.value) {
            constantStore.toggleSidebar();
          }
        },
      },
      {
        label: "Generus",
        icon: "i-heroicons-user-group",
        children: [
          {
            label: "Generus",
            to: "/dashboard/generus",
            onSelect: () => {
              if (!isDesktop.value) {
                constantStore.toggleSidebar();
              }
            },
          },
          {
            label: "Kelas 6 & 9",
            to: "/dashboard/kelas69",
            onSelect: () => {
              if (!isDesktop.value) {
                constantStore.toggleSidebar();
              }
            },
          },
        ],
      },
      {
        label: "Program Kerja",
        icon: "i-heroicons-clipboard-document-check",
        to: "/dashboard/proker",
        onSelect: () => {
          if (!isDesktop.value) {
            constantStore.toggleSidebar();
          }
        },
      },
    ],
    [
      {
        label: "Bidang-Bidang",
        type: "label",
      },

      ...(sekretariat
        ? [
            {
              label: "Sekretariat",
              icon: "i-heroicons-envelope",
              children: [
                {
                  label: "Tupoksi",
                  to: "/dashboard/sekretariat-tupoksi",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Proker",
                  to: "/dashboard/sekretariat-proker",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Daftar Pengurus",
                  to: "/dashboard/sekretariat-pengurus",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Musyawarah PPG",
                  children: [
                    {
                      label: "Daftar Musyawarah",
                      to: "/dashboard/sekretariat-musyawarah",
                      onSelect: () => {
                        if (!isDesktop.value) {
                          constantStore.toggleSidebar();
                        }
                      },
                    },
                    {
                      label: "Laporan Musyawarah",
                      to: "/dashboard/sekretariat-laporan",
                      onSelect: () => {
                        if (!isDesktop.value) {
                          constantStore.toggleSidebar();
                        }
                      },
                    },
                    {
                      label: "Summary Musyawarah",
                      to: "/dashboard/sekretariat-summary",
                      onSelect: () => {
                        if (!isDesktop.value) {
                          constantStore.toggleSidebar();
                        }
                      },
                    },
                  ],
                },
                {
                  label: "Absensi",
                  to: "/dashboard/sekretariat-absensi",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Monitoring Kehadiran",
                  to: "/dashboard/sekretariat-monitoring-kehadiran",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Musyawarah Bidang",
                  children: [
                    {
                      label: "Musyawarah",
                      to: "/dashboard/sekretariat-musyawarah-bidang",
                      onSelect: () => {
                        if (!isDesktop.value) {
                          constantStore.toggleSidebar();
                        }
                      },
                    },
                    {
                      label: "Laporan",
                      to: "/dashboard/sekretariat-laporan-bidang",
                      onSelect: () => {
                        if (!isDesktop.value) {
                          constantStore.toggleSidebar();
                        }
                      },
                    },
                  ],
                },
              ],
            },
          ]
        : []),
      ...(kurikulum
        ? [
            {
              label: "Kurikulum",
              icon: "i-heroicons-book-open",
              children: [
                {
                  label: "Tupoksi",
                  to: "/dashboard/kurikulum-tupoksi",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Proker",
                  to: "/dashboard/kurikulum-proker",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Laporan Musyawarah PPG",
                  to: "/dashboard/kurikulum-laporan",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Musyawarah Bidang",
                  children: [
                    {
                      label: "Musyawarah",
                      to: "/dashboard/kurikulum-musyawarah-bidang",
                      onSelect: () => {
                        if (!isDesktop.value) {
                          constantStore.toggleSidebar();
                        }
                      },
                    },
                    {
                      label: "Laporan",
                      to: "/dashboard/kurikulum-laporan-bidang",
                      onSelect: () => {
                        if (!isDesktop.value) {
                          constantStore.toggleSidebar();
                        }
                      },
                    },
                  ],
                },
                {
                  label: "Monitoring Kehadiran",
                  children: [
                    {
                      label: "Daerah",
                      to: "/dashboard/kurikulum-monitoring-kehadiran",
                      onSelect: () => {
                        if (!isDesktop.value) {
                          constantStore.toggleSidebar();
                        }
                      },
                    },
                    {
                      label: "Desa",
                      to: "/dashboard/kurikulum-monitoring-kehadiran-desa",
                      onSelect: () => {
                        if (!isDesktop.value) {
                          constantStore.toggleSidebar();
                        }
                      },
                    },
                    {
                      label: "Kelompok",
                      to: "/dashboard/kurikulum-monitoring-kehadiran-kelompok",
                      onSelect: () => {
                        if (!isDesktop.value) {
                          constantStore.toggleSidebar();
                        }
                      },
                    },
                  ],
                },
              ],
            },
          ]
        : []),
      ...(tenaga_pendidik
        ? [
            {
              label: "Tenaga Pendidik",
              icon: "i-heroicons-academic-cap",
              children: [
                {
                  label: "Tupoksi",
                  to: "/dashboard/pendidik-tupoksi",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Proker",
                  to: "/dashboard/pendidik-proker",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Laporan Musyawarah PPG",
                  to: "/dashboard/pendidik-laporan",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Musyawarah Bidang",
                  children: [
                    {
                      label: "Musyawarah",
                      to: "/dashboard/pendidik-musyawarah-bidang",
                      onSelect: () => {
                        if (!isDesktop.value) {
                          constantStore.toggleSidebar();
                        }
                      },
                    },
                    {
                      label: "Laporan",
                      to: "/dashboard/pendidik-laporan-bidang",
                      onSelect: () => {
                        if (!isDesktop.value) {
                          constantStore.toggleSidebar();
                        }
                      },
                    },
                  ],
                },
              ],
            },
          ]
        : []),
      ...(penggalang_dana
        ? [
            {
              label: "Penggalang Dana",
              icon: "i-heroicons-banknotes",
              children: [
                {
                  label: "Tupoksi",
                  to: "/dashboard/dana-tupoksi",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Proker",
                  to: "/dashboard/dana-proker",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Laporan Musyawarah PPG",
                  to: "/dashboard/dana-laporan",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Musyawarah Bidang",
                  children: [
                    {
                      label: "Musyawarah",
                      to: "/dashboard/dana-musyawarah-bidang",
                      onSelect: () => {
                        if (!isDesktop.value) {
                          constantStore.toggleSidebar();
                        }
                      },
                    },
                    {
                      label: "Laporan",
                      to: "/dashboard/dana-laporan-bidang",
                      onSelect: () => {
                        if (!isDesktop.value) {
                          constantStore.toggleSidebar();
                        }
                      },
                    },
                  ],
                },
              ],
            },
          ]
        : []),
      ...(sarana_prasarana
        ? [
            {
              label: "Sarana Prasarana",
              icon: "i-heroicons-building-office",
              children: [
                {
                  label: "Tupoksi",
                  to: "/dashboard/sarana-tupoksi",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Proker",
                  to: "/dashboard/sarana-proker",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Laporan Musyawarah PPG",
                  to: "/dashboard/sarana-laporan",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Musyawarah Bidang",
                  children: [
                    {
                      label: "Musyawarah",
                      to: "/dashboard/sarana-musyawarah-bidang",
                      onSelect: () => {
                        if (!isDesktop.value) {
                          constantStore.toggleSidebar();
                        }
                      },
                    },
                    {
                      label: "Laporan",
                      to: "/dashboard/sarana-laporan-bidang",
                      onSelect: () => {
                        if (!isDesktop.value) {
                          constantStore.toggleSidebar();
                        }
                      },
                    },
                  ],
                },
              ],
            },
          ]
        : []),
      ...(kemandirian
        ? [
            {
              label: "Kemandirian",
              icon: "i-heroicons-light-bulb",
              children: [
                {
                  label: "Tupoksi",
                  to: "/dashboard/kemandirian-tupoksi",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Proker",
                  to: "/dashboard/kemandirian-proker",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Laporan Musyawarah PPG",
                  to: "/dashboard/kemandirian-laporan",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Musyawarah Bidang",
                  children: [
                    {
                      label: "Musyawarah",
                      to: "/dashboard/kemandirian-musyawarah-bidang",
                      onSelect: () => {
                        if (!isDesktop.value) {
                          constantStore.toggleSidebar();
                        }
                      },
                    },
                    {
                      label: "Laporan",
                      to: "/dashboard/kemandirian-laporan-bidang",
                      onSelect: () => {
                        if (!isDesktop.value) {
                          constantStore.toggleSidebar();
                        }
                      },
                    },
                  ],
                },
                {
                  label: "Daftar Pengusaha",
                  to: "/dashboard/kemandirian-pengusaha",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
              ],
            },
          ]
        : []),
      ...(keputrian
        ? [
            {
              label: "Keputrian",
              icon: "i-heroicons-sparkles",
              children: [
                {
                  label: "Dashboard",
                  to: "/dashboard/keputrian-dashboard",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Tupoksi",
                  to: "/dashboard/keputrian-tupoksi",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Proker",
                  to: "/dashboard/keputrian-proker",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Laporan Musyawarah PPG",
                  to: "/dashboard/keputrian-laporan",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Generus",
                  to: "/dashboard/keputrian-generus",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Daftar Kelas",
                  to: "/dashboard/keputrian-kelas",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Absensi",
                  to: "/dashboard/keputrian-absensi",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Monitoring Kehadiran",
                  to: "/dashboard/keputrian-monitoring-kehadiran",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Musyawarah Bidang",
                  children: [
                    {
                      label: "Musyawarah",
                      to: "/dashboard/keputrian-musyawarah-bidang",
                      onSelect: () => {
                        if (!isDesktop.value) {
                          constantStore.toggleSidebar();
                        }
                      },
                    },
                    {
                      label: "Laporan",
                      to: "/dashboard/keputrian-laporan-bidang",
                      onSelect: () => {
                        if (!isDesktop.value) {
                          constantStore.toggleSidebar();
                        }
                      },
                    },
                  ],
                },
              ],
            },
          ]
        : []),
      ...(bimbingan_konseling
        ? [
            {
              label: "Bimbingan & Konseling",
              icon: "i-heroicons-chat-bubble-bottom-center-text",
              children: [
                {
                  label: "Tupoksi",
                  to: "/dashboard/bimbingan-tupoksi",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Proker",
                  to: "/dashboard/bimbingan-proker",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Laporan Musyawarah PPG",
                  to: "/dashboard/bimbingan-laporan",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Daftar Konseling",
                  to: "/dashboard/bimbingan-generus",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Musyawarah Bidang",
                  children: [
                    {
                      label: "Musyawarah",
                      to: "/dashboard/bimbingan-musyawarah-bidang",
                      onSelect: () => {
                        if (!isDesktop.value) {
                          constantStore.toggleSidebar();
                        }
                      },
                    },
                    {
                      label: "Laporan",
                      to: "/dashboard/bimbingan-laporan-bidang",
                      onSelect: () => {
                        if (!isDesktop.value) {
                          constantStore.toggleSidebar();
                        }
                      },
                    },
                  ],
                },
              ],
            },
          ]
        : []),
      ...(olahraga_seni
        ? [
            {
              label: "Olahraga & Seni",
              icon: "i-heroicons-fire",
              children: [
                {
                  label: "Tupoksi",
                  to: "/dashboard/olahraga-tupoksi",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Proker",
                  to: "/dashboard/olahraga-proker",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Laporan Musyawarah PPG",
                  to: "/dashboard/olahraga-laporan",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Musyawarah Bidang",
                  children: [
                    {
                      label: "Musyawarah",
                      to: "/dashboard/olahraga-musyawarah-bidang",
                      onSelect: () => {
                        if (!isDesktop.value) {
                          constantStore.toggleSidebar();
                        }
                      },
                    },
                    {
                      label: "Laporan",
                      to: "/dashboard/olahraga-laporan-bidang",
                      onSelect: () => {
                        if (!isDesktop.value) {
                          constantStore.toggleSidebar();
                        }
                      },
                    },
                  ],
                },
              ],
            },
          ]
        : []),
      ...(kegiatan_muda_mudi
        ? [
            {
              label: "Kegiatan Muda-Mudi",
              icon: "i-heroicons-users",
              children: [
                {
                  label: "Dashboard",
                  to: "/dashboard/kegiatan-dashboard",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Tupoksi",
                  to: "/dashboard/kegiatan-tupoksi",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Proker",
                  to: "/dashboard/kegiatan-proker",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Laporan Musyawarah PPG",
                  to: "/dashboard/kegiatan-laporan",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Musyawarah Bidang",
                  children: [
                    {
                      label: "Musyawarah",
                      to: "/dashboard/kegiatan-musyawarah-bidang",
                      onSelect: () => {
                        if (!isDesktop.value) {
                          constantStore.toggleSidebar();
                        }
                      },
                    },
                    {
                      label: "Laporan",
                      to: "/dashboard/kegiatan-laporan-bidang",
                      onSelect: () => {
                        if (!isDesktop.value) {
                          constantStore.toggleSidebar();
                        }
                      },
                    },
                  ],
                },
                {
                  label: "Generus",
                  to: "/dashboard/kegiatan-generus",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Daftar Kelas",
                  to: "/dashboard/kegiatan-kelas",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Absensi",
                  to: "/dashboard/kegiatan-absensi",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Monitoring Kehadiran",
                  children: [
                    {
                      label: "Daerah",
                      to: "/dashboard/kegiatan-monitoring-kehadiran",
                      onSelect: () => {
                        if (!isDesktop.value) {
                          constantStore.toggleSidebar();
                        }
                      },
                    },
                    {
                      label: "Desa",
                      to: "/dashboard/kegiatan-monitoring-kehadiran-desa",
                      onSelect: () => {
                        if (!isDesktop.value) {
                          constantStore.toggleSidebar();
                        }
                      },
                    },
                    {
                      label: "Kelompok",
                      to: "/dashboard/kegiatan-monitoring-kehadiran-kelompok",
                      onSelect: () => {
                        if (!isDesktop.value) {
                          constantStore.toggleSidebar();
                        }
                      },
                    },
                  ],
                },
              ],
            },
          ]
        : []),
      ...(tahfidz
        ? [
            {
              label: "Tahfidz",
              icon: "i-heroicons-book-open",
              children: [
                {
                  label: "Dashboard",
                  to: "/dashboard/tahfidz-dashboard",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Tupoksi",
                  to: "/dashboard/tahfidz-tupoksi",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Proker",
                  to: "/dashboard/tahfidz-proker",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Laporan Musyawarah PPG",
                  to: "/dashboard/tahfidz-laporan",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Musyawarah Bidang",
                  children: [
                    {
                      label: "Musyawarah",
                      to: "/dashboard/tahfidz-musyawarah-bidang",
                      onSelect: () => {
                        if (!isDesktop.value) {
                          constantStore.toggleSidebar();
                        }
                      },
                    },
                    {
                      label: "Laporan",
                      to: "/dashboard/tahfidz-laporan-bidang",
                      onSelect: () => {
                        if (!isDesktop.value) {
                          constantStore.toggleSidebar();
                        }
                      },
                    },
                  ],
                },
                {
                  label: "Daftar Tahfidz",
                  to: "/dashboard/tahfidz-generus",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Daftar Kelas",
                  to: "/dashboard/tahfidz-kelas",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Absensi",
                  to: "/dashboard/tahfidz-absensi",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Monitoring Kehadiran",
                  to: "/dashboard/tahfidz-monitoring-kehadiran",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
              ],
            },
          ]
        : []),
      ...(media_publikasi
        ? [
            {
              label: "Media & Publikasi",
              icon: "i-heroicons-camera",
              children: [
                {
                  label: "Proker",
                  to: "/dashboard/media-proker",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Laporan Musyawarah PPG",
                  to: "/dashboard/media-laporan",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Musyawarah Bidang",
                  children: [
                    {
                      label: "Musyawarah",
                      to: "/dashboard/media-musyawarah-bidang",
                      onSelect: () => {
                        if (!isDesktop.value) {
                          constantStore.toggleSidebar();
                        }
                      },
                    },
                    {
                      label: "Laporan",
                      to: "/dashboard/media-laporan-bidang",
                      onSelect: () => {
                        if (!isDesktop.value) {
                          constantStore.toggleSidebar();
                        }
                      },
                    },
                  ],
                },
              ],
            },
          ]
        : []),
      ...(karakter
        ? [
            {
              label: "Karakter",
              icon: "i-heroicons-star",
              children: [
                {
                  label: "Proker",
                  to: "/dashboard/karakter-proker",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Laporan Musyawarah PPG",
                  to: "/dashboard/karakter-laporan",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Musyawarah Bidang",
                  children: [
                    {
                      label: "Musyawarah",
                      to: "/dashboard/karakter-musyawarah-bidang",
                      onSelect: () => {
                        if (!isDesktop.value) {
                          constantStore.toggleSidebar();
                        }
                      },
                    },
                    {
                      label: "Laporan",
                      to: "/dashboard/karakter-laporan-bidang",
                      onSelect: () => {
                        if (!isDesktop.value) {
                          constantStore.toggleSidebar();
                        }
                      },
                    },
                  ],
                },
              ],
            },
          ]
        : []),
      ...(desa_menu
        ? [
            {
              label: "PJP Desa",
              icon: "i-heroicons-user-circle",
              children: [
                {
                  label: "Tupoksi",
                  to: "/dashboard/desa-tupoksi",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Dashboard",
                  to: "/dashboard/desa-dashboard",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Tenaga Pengajar",
                  to: "/dashboard/desa-pengajar",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Generus",
                  to: "/dashboard/desa-generus",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Daftar Kelas",
                  to: "/dashboard/desa-kelas",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Absensi",
                  to: "/dashboard/desa-absensi",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Monitoring Kehadiran",
                  children: [
                    {
                      label: "Desa",
                      to: "/dashboard/desa-monitoring-kehadiran",
                      onSelect: () => {
                        if (!isDesktop.value) {
                          constantStore.toggleSidebar();
                        }
                      },
                    },
                    {
                      label: "Kelompok",
                      to: "/dashboard/desa-monitoring-kehadiran-kelompok",
                      onSelect: () => {
                        if (!isDesktop.value) {
                          constantStore.toggleSidebar();
                        }
                      },
                    },
                  ],
                },
                {
                  label: "Laporan Muslimun",
                  to: "/dashboard/desa-laporan",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
              ],
            },
          ]
        : []),
      ...(kelompok_menu
        ? [
            {
              label: "PJP Kelompok",
              icon: "i-heroicons-user-circle",
              children: [
                {
                  label: "Tupoksi",
                  to: "/dashboard/kelompok-tupoksi",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Dashboard",
                  to: "/dashboard/kelompok-dashboard",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Tenaga Pengajar",
                  to: "/dashboard/kelompok-pengajar",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Generus",
                  to: "/dashboard/kelompok-generus",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Daftar Kelas",
                  to: "/dashboard/kelompok-kelas",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Absensi",
                  to: "/dashboard/kelompok-absensi",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Monitoring Kehadiran",
                  to: "/dashboard/kelompok-monitoring-kehadiran",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Daftar Konseling",
                  to: "/dashboard/kelompok-konseling",
                  onSelect: () => {
                    if (!isDesktop.value) {
                      constantStore.toggleSidebar();
                    }
                  },
                },
                {
                  label: "Musyawarah",
                  children: [
                    {
                      label: "Daftar Muslimun",
                      to: "/dashboard/kelompok-musyawarah",
                      onSelect: () => {
                        if (!isDesktop.value) {
                          constantStore.toggleSidebar();
                        }
                      },
                    },
                    {
                      label: "Laporan Muslimun",
                      to: "/dashboard/kelompok-laporan",
                      onSelect: () => {
                        if (!isDesktop.value) {
                          constantStore.toggleSidebar();
                        }
                      },
                    },
                  ],
                },
                {
                  label: "Pengajian Kelompok",
                  children: [
                    {
                      label: "Daftar Jamaah",
                      to: "/dashboard/kelompok-jamaah",
                      onSelect: () => {
                        if (!isDesktop.value) {
                          constantStore.toggleSidebar();
                        }
                      },
                    },
                    {
                      label: "Daftar Pengajian",
                      to: "/dashboard/kelompok-kelas-kelompok",
                      onSelect: () => {
                        if (!isDesktop.value) {
                          constantStore.toggleSidebar();
                        }
                      },
                    },
                    {
                      label: "Absensi",
                      to: "/dashboard/kelompok-absensi-kelompok",
                      onSelect: () => {
                        if (!isDesktop.value) {
                          constantStore.toggleSidebar();
                        }
                      },
                    },
                    {
                      label: "Monitoring",
                      to: "/dashboard/kelompok-monitoring-kehadiran-kelompok",
                      onSelect: () => {
                        if (!isDesktop.value) {
                          constantStore.toggleSidebar();
                        }
                      },
                    },
                  ],
                },
              ],
            },
          ]
        : []),
    ],
    [
      {
        label: "Pengaturan",
        type: "label",
      },
      {
        label: "Daftar Wilayah",
        icon: "i-heroicons-map",
        to: "/dashboard/pengaturan-wilayah",
        onSelect: () => {
          if (!isDesktop.value) {
            constantStore.toggleSidebar();
          }
        },
      },
      {
        label: "Dokumen",
        icon: "i-heroicons-document-text",
        to: "/dashboard/pengaturan-dokumen",
        onSelect: () => {
          if (!isDesktop.value) {
            constantStore.toggleSidebar();
          }
        },
      },
      ...(user
        ? [
            {
              label: "Daftar User",
              icon: "i-heroicons-user",
              to: "/dashboard/pengaturan-user",
              onSelect: () => {
                if (!isDesktop.value) {
                  constantStore.toggleSidebar();
                }
              },
            },
          ]
        : []),
    ],
  ]);
</script>

<template>
  <aside
    class="fixed top-0 z-20 hidden h-full w-72 overflow-auto border-r border-gray-200 bg-white shadow-xl transition-all duration-200 md:block dark:border-gray-700 dark:bg-gray-900"
    :class="constantStore.sidebarShow ? 'left-0' : '-left-72'"
  >
    <div class="flex items-center justify-center pt-8 pb-6 text-(--ui-primary)">
      <div class="flex items-center text-2xl tracking-widest">
        <NuxtImg src="/ppg.webp" class="h-14 w-14" />
        <span>PPG</span>
      </div>
    </div>
    <ClientOnly>
      <UNavigationMenu
        orientation="vertical"
        :items="sidebarItems"
        class="w-full"
        :ui="{
          label: 'text-sm uppercase text-(--ui-primary) mb-2',
          link: 'text-base py-2',
          root: 'px-4',
          separator: 'h-0',
        }"
      />
    </ClientOnly>
  </aside>
  <ClientOnly>
    <USlideover
      v-if="!isDesktop"
      v-model:open="constantStore.sidebarShow"
      side="left"
      title="Menu"
    >
      <template #body>
        <aside class="overflow-auto">
          <UNavigationMenu
            orientation="vertical"
            :items="sidebarItems"
            class="w-full"
            :ui="{
              label: 'text-sm uppercase text-(--ui-primary) mb-2',
              link: 'text-base py-2',
              separator: 'h-0',
            }"
          />
        </aside>
      </template>
    </USlideover>
  </ClientOnly>
</template>
