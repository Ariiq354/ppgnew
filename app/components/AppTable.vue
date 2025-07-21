<script setup lang="ts">
  import type { TableColumn } from "@nuxt/ui";

  defineSlots<{
    [key: string]: (props: any) => any;
  }>();
  const page = defineModel<number>("page");
  const selected = defineModel<Record<string, boolean>>("select");
  const UCheckbox = resolveComponent("UCheckbox");

  const emit = defineEmits(["editClick"]);
  const {
    data,
    action,
    selectable,
    columns,
    enumerate,
    total = 0,
  } = defineProps<{
    data: any[] | undefined;
    columns: TableColumn<any>[];
    loading?: boolean;
    action?: boolean;
    selectable?: boolean;
    enumerate?: boolean;
    total?: number;
    pagination?: boolean;
  }>();

  const newColumns = computed(() => {
    return [
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
      ...(action
        ? [
            {
              header: "Aksi",
              accessorKey: "actions",
            },
          ]
        : []),
    ];
  });
</script>

<template>
  <div class="w-full space-y-4 pb-4">
    <UTable
      v-model:row-selection="selected"
      :data="data"
      :columns="newColumns"
      :loading="loading"
    >
      <template v-for="(_, name) in $slots" :key="name" #[name]="slotData">
        <slot :name="name" v-bind="slotData ?? {}" />
      </template>
      <template #actions-header="{ column }">
        <div class="text-center">{{ column.columnDef.header }}</div>
      </template>
      <template #actions-cell="{ row }">
        <div class="flex justify-center">
          <UButton
            icon="i-heroicons-pencil-16-solid"
            size="xs"
            variant="outline"
            :ui="{ base: 'rounded-full' }"
            square
            aria-label="Edit item"
            @click="emit('editClick', row.original)"
          />
        </div>
      </template>
    </UTable>

    <div v-if="pagination" class="flex justify-center pt-4">
      <UPagination v-model:page="page" :total="total" />
    </div>
  </div>
</template>
