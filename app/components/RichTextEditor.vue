<script setup lang="ts">
import { useEditor, EditorContent, type JSONContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'

const props = withDefaults(
  defineProps<{
    modelValue: JSONContent | null
  }>(),
  { modelValue: null },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: JSONContent | null): void
}>()

const editor = useEditor({
  content: props.modelValue ?? '',
  extensions: [
    StarterKit,
    Link.configure({
      openOnClick: false,
      autolink: true,
      defaultProtocol: 'https',
    }),
  ],
  onUpdate: ({ editor }) => {
    emit('update:modelValue', editor.getJSON())
  },
})

const setLink = () => {
  if (!editor.value) return

  const previousUrl = editor.value.getAttributes('link').href
  const url = window.prompt('Введите URL', previousUrl || 'https://')

  if (url === null) return

  if (url === '') {
    editor.value.chain().focus().extendMarkRange('link').unsetLink().run()

    return
  }

  editor.value.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
}

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>

<template>
  <div
    v-if="editor"
    class="mt-1 overflow-hidden rounded-md border border-slate-300 bg-white shadow-sm transition focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500"
  >
    <div class="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-slate-50 p-2">
      <button
        type="button"
        title="Жирный"
        class="rounded px-2 py-1 text-sm font-bold text-slate-600 hover:bg-slate-200"
        :class="{
          'bg-indigo-100 text-indigo-700': editor.isActive('bold'),
        }"
        @click="editor.chain().focus().toggleBold().run()"
      >
        B
      </button>

      <button
        type="button"
        title="Курсив"
        class="rounded px-2 py-1 text-sm italic text-slate-600 hover:bg-slate-200"
        :class="{
          'bg-indigo-100 text-indigo-700': editor.isActive('italic'),
        }"
        @click="editor.chain().focus().toggleItalic().run()"
      >
        I
      </button>

      <span class="mx-1 h-5 w-px bg-slate-300" />

      <button
        type="button"
        title="Заголовок 1"
        class="rounded px-2 py-1 text-sm font-bold text-slate-600 hover:bg-slate-200"
        :class="{
          'bg-indigo-100 text-indigo-700': editor.isActive('heading', { level: 1 }),
        }"
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      >
        H1
      </button>

      <button
        type="button"
        title="Заголовок 2"
        class="rounded px-2 py-1 text-sm font-bold text-slate-600 hover:bg-slate-200"
        :class="{
          'bg-indigo-100 text-indigo-700': editor.isActive('heading', { level: 2 }),
        }"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      >
        H2
      </button>

      <button
        type="button"
        title="Заголовок 3"
        class="rounded px-2 py-1 text-sm font-bold text-slate-600 hover:bg-slate-200"
        :class="{
          'bg-indigo-100 text-indigo-700': editor.isActive('heading', { level: 3 }),
        }"
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
      >
        H3
      </button>

      <span class="mx-1 h-5 w-px bg-slate-300" />

      <button
        type="button"
        title="Маркированный список"
        class="rounded px-2 py-1 text-sm text-slate-600 hover:bg-slate-200"
        :class="{
          'bg-indigo-100 text-indigo-700': editor.isActive('bulletList'),
        }"
        @click="editor.chain().focus().toggleBulletList().run()"
      >
        • List
      </button>

      <button
        type="button"
        title="Нумерованный список"
        class="rounded px-2 py-1 text-sm text-slate-600 hover:bg-slate-200"
        :class="{
          'bg-indigo-100 text-indigo-700': editor.isActive('orderedList'),
        }"
        @click="editor.chain().focus().toggleOrderedList().run()"
      >
        1. List
      </button>

      <span class="mx-1 h-5 w-px bg-slate-300" />

      <button
        type="button"
        title="Код"
        class="rounded px-2 py-1 font-mono text-sm text-slate-600 hover:bg-slate-200"
        :class="{
          'bg-indigo-100 text-indigo-700': editor.isActive('code'),
        }"
        @click="editor.chain().focus().toggleCode().run()"
      >
        &lt;/&gt;
      </button>

      <button
        type="button"
        title="Блок кода"
        class="rounded px-2 py-1 font-mono text-sm text-slate-600 hover:bg-slate-200"
        :class="{
          'bg-indigo-100 text-indigo-700': editor.isActive('codeBlock'),
        }"
        @click="editor.chain().focus().toggleCodeBlock().run()"
      >
        Code
      </button>

      <button
        type="button"
        title="Ссылка"
        class="rounded px-2 py-1 text-sm text-slate-600 hover:bg-slate-200"
        :class="{
          'bg-indigo-100 text-indigo-700': editor.isActive('link'),
        }"
        @click="setLink"
      >
        🔗
      </button>

      <span class="mx-1 h-5 w-px bg-slate-300" />

      <button
        type="button"
        title="Очистить форматирование"
        class="rounded px-2 py-1 text-sm text-slate-500 hover:bg-slate-200"
        @click="editor.chain().focus().clearNodes().unsetAllMarks().run()"
      >
        Clear
      </button>
    </div>

    <EditorContent
      :editor="editor"
      class="min-h-[180px] px-3 py-2 text-sm text-slate-700 [&_.ProseMirror]:min-h-[160px] [&_.ProseMirror]:outline-none [&_.ProseMirror_p]:my-2 [&_.ProseMirror_p:first-child]:mt-0 [&_.ProseMirror_p:last-child]:mb-0 [&_.ProseMirror_h1]:my-4 [&_.ProseMirror_h1]:text-2xl [&_.ProseMirror_h1]:font-bold [&_.ProseMirror_h1]:leading-tight [&_.ProseMirror_h2]:my-3 [&_.ProseMirror_h2]:text-xl [&_.ProseMirror_h2]:font-bold [&_.ProseMirror_h3]:my-3 [&_.ProseMirror_h3]:text-lg [&_.ProseMirror_h3]:font-semibold [&_.ProseMirror_ul]:my-2 [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-6 [&_.ProseMirror_ol]:my-2 [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-6 [&_.ProseMirror_li]:my-1 [&_.ProseMirror_code]:rounded [&_.ProseMirror_code]:bg-slate-100 [&_.ProseMirror_code]:px-1 [&_.ProseMirror_code]:py-0.5 [&_.ProseMirror_code]:font-mono [&_.ProseMirror_code]:text-sm [&_.ProseMirror_code]:text-slate-700 [&_.ProseMirror_pre]:my-3 [&_.ProseMirror_pre]:overflow-x-auto [&_.ProseMirror_pre]:rounded-md [&_.ProseMirror_pre]:bg-slate-900 [&_.ProseMirror_pre]:p-3 [&_.ProseMirror_pre]:text-slate-100 [&_.ProseMirror_pre_code]:bg-transparent [&_.ProseMirror_pre_code]:p-0 [&_.ProseMirror_pre_code]:text-inherit [&_.ProseMirror_a]:text-indigo-600 [&_.ProseMirror_a]:underline [&_.ProseMirror_a]:hover:text-indigo-800 [&_.ProseMirror_blockquote]:my-3 [&_.ProseMirror_blockquote]:border-l-4 [&_.ProseMirror_blockquote]:border-slate-300 [&_.ProseMirror_blockquote]:pl-3 [&_.ProseMirror_blockquote]:text-slate-500 [&_.ProseMirror_hr]:my-4 [&_.ProseMirror_hr]:border-slate-200"
    />
  </div>
</template>
