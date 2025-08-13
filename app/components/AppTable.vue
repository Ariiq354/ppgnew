<script setup lang="ts">
  import type { DropdownMenuItem, TableColumn } from "@nuxt/ui";

  const slots = useSlots();
  const page = defineModel<number>("page", { default: 1 });
  const rowSelection = ref<Record<string, boolean>>({});

  const UButton = resolveComponent("UButton");
  const UCheckbox = resolveComponent("UCheckbox");
  const UDropdownMenu = resolveComponent("UDropdownMenu");

  const emit = defineEmits(["edit", "view", "delete"]);
  const {
    data,
    viewable,
    deletable,
    editable,
    selectable,
    columns,
    enumerate,
    total = 0,
  } = defineProps<{
    data: any[] | undefined;
    columns: TableColumn<any>[];
    loading?: boolean;
    viewable?: boolean;
    deletable?: boolean;
    editable?: boolean;
    selectable?: boolean;
    enumerate?: boolean;
    total?: number;
    pagination?: boolean;
  }>();

  const newColumns = [
    ...(selectable
      ? [
          {
            id: "select",
            header: ({ table }) =>
              h(UCheckbox, {
                modelValue: table.getIsSomePageRowsSelected()
                  ? "indeterminate"
                  : table.getIsAllPageRowsSelected(),
                "onUpdate:modelValue": (value: boolean | "indeterminate") =>
                  table.toggleAllPageRowsSelected(!!value),
                "aria-label": "Select all",
              }),
            cell: ({ row }) =>
              h(UCheckbox, {
                modelValue: row.getIsSelected(),
                "onUpdate:modelValue": (value: boolean | "indeterminate") =>
                  row.toggleSelected(!!value),
                "aria-label": "Select row",
              }),
          } as TableColumn<any>,
        ]
      : []),
    ...(enumerate
      ? [
          {
            header: "No.",
            cell: (info: any) => info.row.index + 1 + (page.value! - 1) * 10,
          },
        ]
      : []),
    ...columns,
    ...(viewable || deletable || editable
      ? [
          {
            header: "",
            accessorKey: "actions",
            cell: ({ row }) => {
              const items: DropdownMenuItem[] = [
                ...(viewable
                  ? [
                      {
                        label: "View Details",
                        icon: "i-lucide-eye",
                        onSelect() {
                          emit("view", row.original);
                        },
                      } as DropdownMenuItem,
                    ]
                  : []),
                ...(editable
                  ? [
                      {
                        label: "Edit",
                        icon: "i-lucide-square-pen",
                        onSelect() {
                          emit("edit", row.original);
                        },
                      } as DropdownMenuItem,
                    ]
                  : []),
                ...(deletable && (viewable || editable)
                  ? [{ type: "separator" as const } as DropdownMenuItem]
                  : []),
                ...(deletable
                  ? [
                      {
                        label: "Delete",
                        icon: "i-lucide-trash-2",
                        color: "error",
                        onSelect() {
                          emit("delete", row.original.id);
                        },
                      } as DropdownMenuItem,
                    ]
                  : []),
              ];

              return h(
                "div",
                { class: "text-center" },
                h(
                  UDropdownMenu,
                  {
                    items,
                    ui: {
                      content: "w-48",
                    },
                  },
                  () =>
                    h(UButton, {
                      icon: "i-lucide-ellipsis-vertical",
                      variant: "ghost",
                      "aria-label": "Actions dropdown",
                    })
                )
              );
            },
          } as TableColumn<any>,
        ]
      : []),
  ];
</script>

<template>
  <div class="w-full space-y-4 pb-4">
    <div
      v-if="Object.keys(rowSelection).length > 0"
      class="bg-error-50 dark:bg-error-950 mb-4 flex items-center gap-4 rounded-lg px-4 py-3"
    >
      <p class="font-medium">
        {{ Object.keys(rowSelection).length }} items selected
      </p>
      <UButton
        icon="i-lucide-trash-2"
        variant="outline"
        color="error"
        @click="emit('delete')"
      >
        Delete Selected
      </UButton>
    </div>
    <UTable
      v-model:row-selection="rowSelection"
      class="rounded-lg border border-(--ui-border-accented)"
      :data="data"
      :columns="newColumns"
      :loading="loading"
    >
      <template v-for="(_, name) in slots" :key="name" #[name]="slotData">
        <slot :name="name" v-bind="slotData ?? {}" />
      </template>
    </UTable>

    <div class="mt-2 flex items-center justify-between">
      <p
        v-if="data && data.length > 0"
        class="px-2 text-sm text-(--ui-text-muted)"
      >
        Showing {{ (page - 1) * 10 + 1 }} to
        {{ Math.min((page - 1) * 10 + 10, total) }} of {{ total }} items
      </p>
      <div v-if="pagination" class="flex justify-center">
        <UPagination v-model:page="page" :total="total" />
      </div>
    </div>
  </div>
</template>
