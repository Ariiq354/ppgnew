<script setup lang="ts">
  import StarterKit from "@tiptap/starter-kit";
  import { EditorContent, useEditor } from "@tiptap/vue-3";

  const editorData = defineModel<string>();
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class:
          "ring ring-inset ring-accented focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary h-48 p-4 overflow-y-auto prose max-w-none prose-base outline-none rounded-md",
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
      if (editor.value && newValue !== editor.value.getHTML()) {
        editor.value.commands.setContent(String(newValue));
      }
    }
  );
</script>

<template>
  <div
    class="ring-accented mb-2 flex divide-x-1 rounded-md p-2 ring ring-inset"
  >
    <div class="flex gap-2 pl-2">
      <UTooltip text="Heading 1">
        <button
          class="flex items-center justify-center rounded-lg p-2 transition-all duration-300"
          type="button"
          :class="{
            'bg-gray-200': editor?.isActive('heading', {
              level: 1,
            }),
          }"
          @click="editor?.chain().focus().toggleHeading({ level: 1 }).run()"
        >
          <UIcon name="i-lucide-heading-1" />
        </button>
      </UTooltip>
      <UTooltip text="Heading 2">
        <button
          type="button"
          class="flex items-center justify-center rounded-lg p-2 transition-all duration-300"
          :class="{
            'bg-gray-200': editor?.isActive('heading', {
              level: 2,
            }),
          }"
          @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()"
        >
          <UIcon name="i-lucide-heading-2" />
        </button>
      </UTooltip>
      <UTooltip text="Heading 3">
        <button
          type="button"
          class="flex items-center justify-center rounded-lg p-2 transition-all duration-300"
          :class="{
            'bg-gray-200': editor?.isActive('heading', {
              level: 3,
            }),
          }"
          @click="editor?.chain().focus().toggleHeading({ level: 3 }).run()"
        >
          <UIcon name="i-lucide-heading-3" />
        </button>
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
  <ClientOnly>
    <editor-content :editor="editor" />
  </ClientOnly>
</template>

<style>
  .tiptap li p {
    display: inline;
    margin: 0;
  }
</style>
