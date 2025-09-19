<script setup lang="ts">
    import { ref, watch } from 'vue';
    import New from './New.vue';
    import { useUserNotesStore } from '@/stores/userNotes';

    type Note = {
        id: string;
        title: string;
        body: string
    }

    type NoteColumn = {
        field: string;
        label: string;
        isVisible: boolean;
    }

    const columns: NoteColumn[] = [
        {field: 'title', label: 'Título', isVisible: true},
    ]
    const userNotesStore = useUserNotesStore()
    
    const data = ref<Note[]>([])
    const selected = ref<Note | null>(null)
    const handleSelect = (selectedNote: Note) => {
        if (selectedNote){
            userNotesStore.setNoteToPersist(selectedNote)
        }
    }

    watch(
        () => userNotesStore.selectedNote,
        (note) => {
            if (note){
                selected.value = note
            }
        },
        { immediate: true }
    )

    watch(
        () => userNotesStore.notes,
        (notes) => {
            if (notes && notes.length > 0){
                data.value = notes
            }
        },
        { immediate: true }
    )

</script>

<template>
    <div class="columns is-vcentered">
        <div class="column is-12">
            <b-button type="is-custom-purple">
                <New />
            </b-button>
        </div>
    </div>
        <div class="columns">
            <div class="column is-12">
                <b-table :data="data" focusable selectable v-model:selected="selected" @select="handleSelect">
                    <b-table-column v-for="col in columns" :key="col.field" :field="col.field" :label="col.label" :visible="col.isVisible">
                        <template #default="props">
                            {{ props.row[col.field] }}
                        </template>
                    </b-table-column>
                    <template #empty>
                        <div class="has-text-centered">No Notes</div>
                    </template>
                </b-table>
                <b>Note(s): {{ data.length }}</b>
            </div>
        </div>
</template>