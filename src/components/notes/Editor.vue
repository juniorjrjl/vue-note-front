<script setup lang="ts">
    import { routerInfo } from '@/router';
    import { NotesService } from '@/services/NotesService';
    import { useAuthStore } from '@/stores/auth';
    import { useUserNotesStore } from '@/stores/userNotes';
    import { getCurrentInstance, onBeforeUnmount, ref, watch } from 'vue';
    import { useRouter } from 'vue-router';
    import Editor from 'primevue/editor';


    const authStore = useAuthStore()
    const userNotesStore = useUserNotesStore()
    const router = useRouter()
    const { proxy } = getCurrentInstance()!
    const body = ref("")
    const timer = ref<ReturnType<typeof setTimeout> | null>(null)
    const readOnly = ref<boolean>(true)
    const key = ref(0)

    watch(
        () => userNotesStore.noteToPersist,
        (note) => {
            if (note?.title){
                body.value = note.body
            }
            readOnly.value = !note?.title
            key.value++
        },
        { immediate: true }
    )

    onBeforeUnmount(() =>{
        if (timer.value){
            clearTimeout(timer.value)
            timer.value = null
        }
    })

    const updateNote = async () =>{
        if (!authStore.accessToken || !authStore.isAuthenticated || !authStore.userId || !userNotesStore.noteToPersist || !userNotesStore.noteToPersist.id){
            router.push(routerInfo.login)
            return
        }

        try {
            const {data, error} = await NotesService.update(
                userNotesStore.noteToPersist?.id, 
                {title: userNotesStore.noteToPersist.title, body: body.value.replace(/(<([^>]+)>)/ig, "").slice(0, 30)}, 
                authStore.userId,
                authStore.accessToken)
            if (data){
                userNotesStore.setNoteToPersist(data)
                userNotesStore.updateNote(data)
                userNotesStore.setSelectedNote(data)

                proxy?.$buefy.toast.open({
                    message: 'Note changes saved.',
                    type: 'is-success',
                    duration: 5000,
                    position: 'is-top',
                    queue: false
                })
                return
            }
            if (error) {
                proxy?.$buefy.toast.open({
                    message: 'Error to save note changes.',
                    type: 'is-danger',
                    duration: 5000,
                    position: 'is-top',
                    queue: false
                })
                console.error('Login error:', error)
                return
            }
        } catch (error) {
            proxy?.$buefy.toast.open({
                message: 'Error to save note changes.',
                type: 'is-danger',
                duration: 5000,
                position: 'is-top',
                queue: false
            })
            console.error('Login error:', error)
        }
    }

    const handleOnChange = (value: string) =>{
        if (timer.value)
            clearTimeout(timer.value)
        
        timer.value = setTimeout(() => updateNote(), 2000)
    }

</script>

<template>
    <Editor :key="key" v-model="body" @value-change="handleOnChange" :readonly="readOnly" editorStyle="height: 320px" />
</template>
