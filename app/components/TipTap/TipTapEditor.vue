<script setup lang="ts">
  import StarterKit from "@tiptap/starter-kit";
  import { EditorContent, useEditor } from "@tiptap/vue-3";

  const editorData = defineModel<string>();
  const editor = useEditor({
    extensions: [StarterKit],
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

  const headingItems = ref([
    [
      {
        label: "Heading 1",
        type: "label",
        icon: "i-lucide-heading-1",
      },
      {
        label: "Heading 2",
        type: "label",
        icon: "i-lucide-heading-2",
      },
      {
        label: "Heading 3",
        type: "label",
        icon: "i-lucide-heading-3",
      },
      {
        label: "Heading 4",
        type: "label",
        icon: "i-lucide-heading-4",
      },
    ],
  ]);

  const listItems = ref([
    [
      {
        label: "Bullet List",
        type: "label",
        icon: "i-lucide-list",
      },
      {
        label: "Ordered List",
        type: "label",
        icon: "i-lucide-list-ordered",
      },
      {
        label: "Task List",
        type: "label",
        icon: "i-lucide-list-todo",
      },
    ],
  ]);
</script>

<template>
  <ClientOnly>
    <div class="border-accented flex rounded-t-md border border-b-0 p-1">
      <div class="flex gap-1">
        <UTooltip text="Undo">
          <UButton
            variant="ghost"
            color="neutral"
            size="sm"
            icon="i-lucide-undo"
            class="flex aspect-square items-center justify-center rounded-xl transition-all duration-300"
            :class="{
              'bg-gray-200': editor?.isActive('bulletList'),
            }"
          />
        </UTooltip>
        <UTooltip text="Redo">
          <UButton
            variant="ghost"
            color="neutral"
            size="sm"
            icon="i-lucide-redo"
            class="flex aspect-square items-center justify-center rounded-lg transition-all duration-300"
            :class="{
              'bg-gray-200': editor?.isActive('bulletList'),
            }"
          />
        </UTooltip>
      </div>
      <div class="flex gap-1">
        <UTooltip text="Heading">
          <UDropdownMenu :items="headingItems">
            <UButton
              color="neutral"
              variant="ghost"
              size="sm"
              class="gap-0 rounded-xl"
              trailing-icon="i-lucide-chevron-down"
              icon="i-lucide-heading"
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
              class="gap-0 rounded-xl"
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
            class="flex aspect-square items-center justify-center rounded-xl transition-all duration-300"
            :class="{
              'bg-gray-200': editor?.isActive('bulletList'),
            }"
          />
        </UTooltip>
      </div>
      <div class="flex gap-1">
        <UTooltip text="Bold">
          <UButton
            variant="ghost"
            color="neutral"
            size="sm"
            icon="i-lucide-bold"
            class="flex aspect-square items-center justify-center rounded-xl transition-all duration-300"
          />
        </UTooltip>
        <UTooltip text="Italic">
          <UButton
            variant="ghost"
            color="neutral"
            size="sm"
            icon="i-lucide-italic"
            class="flex aspect-square items-center justify-center rounded-lg transition-all duration-300"
          />
        </UTooltip>
        <UTooltip text="Underline">
          <UButton
            variant="ghost"
            color="neutral"
            size="sm"
            icon="i-lucide-underline"
            class="flex aspect-square items-center justify-center rounded-lg transition-all duration-300"
          />
        </UTooltip>
        <UTooltip text="Strike">
          <UButton
            variant="ghost"
            color="neutral"
            size="sm"
            icon="i-lucide-strikethrough"
            class="flex aspect-square items-center justify-center rounded-lg transition-all duration-300"
          />
        </UTooltip>
        <UTooltip text="Highlight">
          <UButton
            variant="ghost"
            color="neutral"
            size="sm"
            icon="i-lucide-highlighter"
            class="flex aspect-square items-center justify-center rounded-lg transition-all duration-300"
          />
        </UTooltip>
      </div>
      <div class="flex gap-1">
        <UTooltip text="Superscript">
          <UButton
            variant="ghost"
            color="neutral"
            size="sm"
            icon="i-lucide-superscript"
            class="flex aspect-square items-center justify-center rounded-xl transition-all duration-300 [&>span]:-translate-y-0.5"
            :class="{
              'bg-gray-200': editor?.isActive('bulletList'),
            }"
          />
        </UTooltip>
        <UTooltip text="Subscript">
          <UButton
            variant="ghost"
            color="neutral"
            size="sm"
            icon="i-lucide-subscript"
            class="flex aspect-square items-center justify-center rounded-lg transition-all duration-300 [&>span]:translate-y-0.5"
            :class="{
              'bg-gray-200': editor?.isActive('bulletList'),
            }"
          />
        </UTooltip>
      </div>
      <div class="flex gap-1">
        <UTooltip text="Align Left">
          <UButton
            variant="ghost"
            color="neutral"
            size="sm"
            icon="i-lucide-align-left"
            class="flex aspect-square items-center justify-center rounded-xl transition-all duration-300"
            :class="{
              'bg-gray-200': editor?.isActive('bulletList'),
            }"
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
              'bg-gray-200': editor?.isActive('bulletList'),
            }"
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
              'bg-gray-200': editor?.isActive('bulletList'),
            }"
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
              'bg-gray-200': editor?.isActive('bulletList'),
            }"
          />
        </UTooltip>
      </div>
    </div>
    <div class="border-accented flex gap-2 rounded-t-md border border-b-0 p-2">
      <div class="flex shrink-0 gap-1">
        <UTooltip text="Heading">
          <UDropdownMenu :items="headingItems">
            <UButton
              icon="i-lucide-heading"
              color="neutral"
              variant="ghost"
              class="gap-0 rounded-xl"
              size="sm"
              trailing-icon="i-lucide-chevron-down"
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
              class="gap-0 rounded-xl"
              size="sm"
              trailing-icon="i-lucide-chevron-down"
              :ui="{ trailingIcon: 'size-2' }"
            />
          </UDropdownMenu>
        </UTooltip>
        <UTooltip text="Blockquote">
          <UButton
            type="button"
            variant="ghost"
            color="neutral"
            icon="i-lucide-text-quote"
            class="flex aspect-square items-center justify-center rounded-xl transition-all duration-300"
            :class="{
              'bg-gray-200': editor?.isActive('bulletList'),
            }"
            size="sm"
          />
        </UTooltip>
      </div>
      <div class="flex gap-2 px-2">
        <UTooltip text="Bold">
          <button
            type="button"
            class="flex items-center justify-center rounded-lg p-2 transition-all duration-300"
            :class="{
              'bg-gray-200': editor?.isActive('bold'),
            }"
            @click="editor?.chain().focus().toggleBold().run()"
          >
            <UIcon name="i-lucide-bold" />
          </button>
        </UTooltip>
        <UTooltip text="Italic">
          <button
            type="button"
            class="flex items-center justify-center rounded-lg p-2 transition-all duration-300"
            :class="{
              'bg-gray-200': editor?.isActive('italic'),
            }"
            @click="editor?.chain().focus().toggleItalic().run()"
          >
            <UIcon name="i-lucide-italic" />
          </button>
        </UTooltip>
        <UTooltip text="Underline">
          <button
            type="button"
            class="flex items-center justify-center rounded-lg p-2 transition-all duration-300"
            :class="{
              'bg-gray-200': editor?.isActive('underline'),
            }"
            @click="editor?.chain().focus().toggleUnderline().run()"
          >
            <UIcon name="i-lucide-underline" />
          </button>
        </UTooltip>
        <UTooltip text="Strike">
          <button
            type="button"
            class="flex items-center justify-center rounded-lg p-2 transition-all duration-300"
            :class="{
              'bg-gray-200': editor?.isActive('strike'),
            }"
            @click="editor?.chain().focus().toggleStrike().run()"
          >
            <UIcon name="i-lucide-strikethrough" />
          </button>
        </UTooltip>
      </div>
      <div class="flex gap-2 px-2">
        <UTooltip text="Bullet list">
          <button
            type="button"
            class="flex items-center justify-center rounded-lg p-2 transition-all duration-300"
            :class="{
              'bg-gray-200': editor?.isActive('bulletList'),
            }"
            @click="editor?.chain().focus().toggleBulletList().run()"
          >
            <UIcon name="i-lucide-list" />
          </button>
        </UTooltip>
        <UTooltip text="Ordered list">
          <button
            type="button"
            class="flex items-center justify-center rounded-lg p-2 transition-all duration-300"
            :class="{
              'bg-gray-200': editor?.isActive('orderedList'),
            }"
            @click="editor?.chain().focus().toggleOrderedList().run()"
          >
            <UIcon name="i-lucide-list-ordered" />
          </button>
        </UTooltip>
        <UTooltip text="Quote">
          <button
            type="button"
            class="flex items-center justify-center rounded-lg p-2 transition-all duration-300"
            :class="{
              'bg-gray-200': editor?.isActive('blockquote'),
            }"
            @click="editor?.chain().focus().toggleBlockquote().run()"
          >
            <UIcon name="i-lucide-text-quote" />
          </button>
        </UTooltip>
      </div>
      <div class="flex gap-2 pr-2">
        <UTooltip text="Line Break">
          <button
            type="button"
            class="flex items-center justify-center rounded-lg p-2 transition-all duration-300"
            @click="editor?.chain().focus().setHardBreak().run()"
          >
            <UIcon name="i-lucide-wrap-text" />
          </button>
        </UTooltip>
        <UTooltip text="Horizontal Line">
          <button
            type="button"
            class="flex items-center justify-center rounded-lg p-2 transition-all duration-300"
            @click="editor?.chain().focus().setHorizontalRule().run()"
          >
            <UIcon name="i-lucide-minus" />
          </button>
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
