<script setup lang="ts">
    import { QuillEditor } from '@vueup/vue-quill'

    const toolbarOptions = [
        [{ header: [1, 2] }, { font: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['clean']
    ]

</script>

<template>
    <QuillEditor theme="snow" :toolbars="toolbarOptions" />
</template>

