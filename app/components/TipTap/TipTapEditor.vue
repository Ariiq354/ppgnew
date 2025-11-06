<script setup lang="ts">
  import type { DropdownMenuItem } from "@nuxt/ui";
  import TextAlign from "@tiptap/extension-text-align";
  import StarterKit from "@tiptap/starter-kit";
  import { EditorContent, useEditor } from "@tiptap/vue-3";

  const editorData = defineModel<string>();
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "border border-accented min-h-48 p-2 prose prose-sm md:prose-base  max-w-none rounded-b-md focus:outline-none border-t-muted",
      },
    },
    content: editorData.value,
    onUpdate: () => {
      editorData.value = editor.value!.getHTML();
    },
  });

  watch(
    () => editorData.value,
    (newValue) => {
      if (editor.value?.isDestroyed || !editor.value?.isEditable) return;
      if (editor.value && newValue !== editor.value.getHTML()) {
        editor.value.commands.setContent(String(newValue));
      }
    }
  );

  onBeforeMount(() => {
    editor.value?.destroy();
  });

  const headingItems = computed<DropdownMenuItem[][]>(() => [
    [
      {
        label: "Heading 1",
        icon: "i-lucide-heading-1",
        onSelect() {
          editor.value?.chain().focus().toggleHeading({ level: 1 }).run();
        },
        class: editor.value?.isActive("heading", { level: 1 })
          ? "text-primary bg-neutral-100"
          : "",
      },
      {
        label: "Heading 2",
        icon: "i-lucide-heading-2",
        onSelect() {
          editor.value?.chain().focus().toggleHeading({ level: 2 }).run();
        },
        class: editor.value?.isActive("heading", { level: 2 })
          ? "text-primary bg-neutral-100"
          : "",
      },
      {
        label: "Heading 3",
        icon: "i-lucide-heading-3",
        onSelect() {
          editor.value?.chain().focus().toggleHeading({ level: 3 }).run();
        },
        class: editor.value?.isActive("heading", { level: 3 })
          ? "text-primary bg-neutral-100"
          : "",
      },
      {
        label: "Heading 4",
        icon: "i-lucide-heading-4",
        onSelect() {
          editor.value?.chain().focus().toggleHeading({ level: 4 }).run();
        },
        class: editor.value?.isActive("heading", { level: 4 })
          ? "text-primary bg-neutral-100"
          : "",
      },
    ],
  ]);

  const headingIcon = computed(() => {
    if (editor.value?.isActive("heading", { level: 1 }))
      return "i-lucide-heading-1";
    if (editor.value?.isActive("heading", { level: 2 }))
      return "i-lucide-heading-2";
    if (editor.value?.isActive("heading", { level: 3 }))
      return "i-lucide-heading-3";
    if (editor.value?.isActive("heading", { level: 4 }))
      return "i-lucide-heading-4";
    return "i-lucide-heading";
  });

  const listItems = computed<DropdownMenuItem[][]>(() => [
    [
      {
        label: "Bullet List",
        icon: "i-lucide-list",
        onSelect() {
          editor.value?.chain().focus().toggleBulletList().run();
        },
        class:
          editor.value?.isActive("bulletList") && "text-primary bg-neutral-100",
      },
      {
        label: "Ordered List",
        icon: "i-lucide-list-ordered",
        onSelect() {
          editor.value?.chain().focus().toggleOrderedList().run();
        },
        class:
          editor.value?.isActive("orderedlist") &&
          "text-primary bg-neutral-100",
      },
      {
        label: "Task List",
        icon: "i-lucide-list-todo",
        onSelect() {
          editor.value?.chain().focus().toggleTaskList().run();
        },
        class:
          editor.value?.isActive("tasklist") && "text-primary bg-neutral-100",
      },
    ],
  ]);

  const listIcon = computed(() => {
    if (editor.value?.isActive("orderedlist")) return "i-lucide-list-ordered";
    if (editor.value?.isActive("tasklist")) return "i-lucide-list-todo";
    return "i-lucide-list";
  });
</script>

<template>
  <ClientOnly>
    <div
      class="border-accented divide-muted flex justify-center divide-x rounded-t-md border border-b-0 p-2"
    >
      <div class="flex gap-1 px-2">
        <UTooltip text="Undo">
          <UButton
            variant="ghost"
            color="neutral"
            size="sm"
            icon="i-lucide-undo"
            class="flex aspect-square items-center justify-center rounded-lg transition-all duration-300"
            @click="editor?.chain().focus().undo().run()"
            :disabled="!editor?.can().chain().focus().undo().run()"
          />
        </UTooltip>
        <UTooltip text="Redo">
          <UButton
            variant="ghost"
            color="neutral"
            size="sm"
            icon="i-lucide-redo"
            class="flex aspect-square items-center justify-center rounded-lg transition-all duration-300"
            @click="editor?.chain().focus().redo().run()"
            :disabled="!editor?.can().chain().focus().redo().run()"
          />
        </UTooltip>
      </div>
      <div class="flex gap-1 px-2">
        <UTooltip text="Heading">
          <UDropdownMenu :items="headingItems">
            <UButton
              color="neutral"
              variant="ghost"
              size="sm"
              class="gap-0 rounded-lg"
              trailing-icon="i-lucide-chevron-down"
              :icon="headingIcon"
              :class="{
                'text-primary bg-neutral-100': editor?.isActive('heading'),
              }"
              :ui="{ trailingIcon: 'size-2' }"
            />
          </UDropdownMenu>
        </UTooltip>
        <UTooltip text="List">
          <UDropdownMenu :items="listItems">
            <UButton
              icon="i-lucide-list"
              color="neutral"
              variant="ghost"
              class="gap-0 rounded-lg"
              size="sm"
              trailing-icon="i-lucide-chevron-down"
              :ui="{ trailingIcon: 'size-2' }"
            />
          </UDropdownMenu>
        </UTooltip>
        <UTooltip text="Blockquote">
          <UButton
            variant="ghost"
            color="neutral"
            size="sm"
            icon="i-lucide-text-quote"
            class="flex aspect-square items-center justify-center rounded-lg transition-all duration-300"
            :class="{
              'text-primary bg-neutral-100': editor?.isActive('blockquote'),
            }"
            @click="editor?.chain().focus().toggleBlockquote().run()"
          />
        </UTooltip>
      </div>
      <div class="flex gap-1 px-2">
        <UTooltip text="Bold">
          <UButton
            variant="ghost"
            color="neutral"
            size="sm"
            icon="i-lucide-bold"
            class="flex aspect-square items-center justify-center rounded-lg transition-all duration-300"
            :class="{
              'text-primary bg-neutral-100': editor?.isActive('bold'),
            }"
            @click="editor?.chain().focus().toggleBold().run()"
          />
        </UTooltip>
        <UTooltip text="Italic">
          <UButton
            variant="ghost"
            color="neutral"
            size="sm"
            icon="i-lucide-italic"
            class="flex aspect-square items-center justify-center rounded-lg transition-all duration-300"
            :class="{
              'text-primary bg-neutral-100': editor?.isActive('italic'),
            }"
            @click="editor?.chain().focus().toggleItalic().run()"
          />
        </UTooltip>
        <UTooltip text="Underline">
          <UButton
            variant="ghost"
            color="neutral"
            size="sm"
            icon="i-lucide-underline"
            class="flex aspect-square items-center justify-center rounded-lg transition-all duration-300"
            :class="{
              'text-primary bg-neutral-100': editor?.isActive('underline'),
            }"
            @click="editor?.chain().focus().toggleUnderline().run()"
          />
        </UTooltip>
        <UTooltip text="Strike">
          <UButton
            variant="ghost"
            color="neutral"
            size="sm"
            icon="i-lucide-strikethrough"
            class="flex aspect-square items-center justify-center rounded-lg transition-all duration-300"
            :class="{
              'text-primary bg-neutral-100': editor?.isActive('strike'),
            }"
            @click="editor?.chain().focus().toggleStrike().run()"
          />
        </UTooltip>
      </div>
      <div class="flex gap-1 px-2">
        <UTooltip text="Align Left">
          <UButton
            variant="ghost"
            color="neutral"
            size="sm"
            icon="i-lucide-align-left"
            class="flex aspect-square items-center justify-center rounded-lg transition-all duration-300"
            :class="{
              'text-primary bg-neutral-100': editor?.isActive({
                textAlign: 'left',
              }),
            }"
            @click="editor?.chain().focus().toggleTextAlign('left').run()"
          />
        </UTooltip>
        <UTooltip text="Align Center">
          <UButton
            variant="ghost"
            color="neutral"
            size="sm"
            icon="i-lucide-align-center"
            class="flex aspect-square items-center justify-center rounded-lg transition-all duration-300"
            :class="{
              'text-primary bg-neutral-100': editor?.isActive({
                textAlign: 'center',
              }),
            }"
            @click="editor?.chain().focus().toggleTextAlign('center').run()"
          />
        </UTooltip>
        <UTooltip text="Align Right">
          <UButton
            variant="ghost"
            color="neutral"
            size="sm"
            icon="i-lucide-align-right"
            class="flex aspect-square items-center justify-center rounded-lg transition-all duration-300"
            :class="{
              'text-primary bg-neutral-100': editor?.isActive({
                textAlign: 'right',
              }),
            }"
            @click="editor?.chain().focus().toggleTextAlign('right').run()"
          />
        </UTooltip>
        <UTooltip text="Align Justify">
          <UButton
            variant="ghost"
            color="neutral"
            size="sm"
            icon="i-lucide-align-justify"
            class="flex aspect-square items-center justify-center rounded-lg transition-all duration-300"
            :class="{
              'text-primary bg-neutral-100': editor?.isActive({
                textAlign: 'justify',
              }),
            }"
            @click="editor?.chain().focus().toggleTextAlign('justify').run()"
          />
        </UTooltip>
      </div>
    </div>
    <editor-content :editor="editor" />
    <template #fallback>
      <USkeleton class="h-48 w-full rounded-md" />
    </template>
  </ClientOnly>
</template>

<style>
  .tiptap li p {
    display: inline;
    margin: 0;
  }
</style>
