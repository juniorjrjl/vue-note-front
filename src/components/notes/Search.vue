<script setup lang="ts">
    import { useUserNotesStore } from '@/stores/userNotes';
    import { ref } from 'vue';


    const userNotesStore = useUserNotesStore()
    const query = ref("")
    const onClick = (() => userNotesStore.setQuery(query.value))
    const onInput = ((value: string) => userNotesStore.setQuery(value))

</script>

<template>
    <div class="columns is-vcentered">
        <div class="column is-9">
            <b-input v-model="query" @update:modelValue="onInput"></b-input>
        </div>
        <div class="column is-2">
            <b-button type="is-custom-purple" icon-pack="uil" @click="onClick">
                <b-icon pack="fas" icon="search"></b-icon>
            </b-button>
        </div>
    </div>
</template>