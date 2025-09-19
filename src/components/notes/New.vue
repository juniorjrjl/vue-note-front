<script setup lang="ts">
    import { routerInfo } from '@/router';
    import { requestInput } from '@/services/ModalService';
    import { NotesService } from '@/services/NotesService';
    import { useAuthStore } from '@/stores/auth';
    import { InputModalResponse } from '@/stores/inputModal';
    import { useUserNotesStore } from '@/stores/userNotes';
    import { getCurrentInstance } from 'vue';
    import { useRouter } from 'vue-router';

    const authStore = useAuthStore()
    const userNotesStore = useUserNotesStore()
    const router = useRouter()
    const { proxy } = getCurrentInstance()!

    const onClick = (async() => {
        if (!authStore.accessToken || !authStore.isAuthenticated || !authStore.userId){
            router.push(routerInfo.login)
            return
        }
        const {choise, value} = await requestInput('Enter with note title')
        if (choise === InputModalResponse.CONFIRM){            
            if (!value || value.trim() === '') {
                proxy?.$buefy.toast.open({
                        message: 'To create note you must enter with title.',
                        type: 'is-danger',
                        duration: 5000,
                        position: 'is-top',
                        queue: false
                    })
                return
            }
            try{
                const {data, error} = await NotesService.create({title: value, body: ''}, authStore.userId, authStore.accessToken)

                if (data){
                    userNotesStore.setNoteToPersist(data)
                    userNotesStore.addNote(data)
                    userNotesStore.setSelectedNote(data)
                }

                if (error){
                    console.error('Create note error:', error)
                    proxy?.$buefy.toast.open({
                        message: 'Error to create note.',
                        type: 'is-danger',
                        duration: 5000,
                        position: 'is-top',
                        queue: false
                    })
                }
            } catch(error){
                if (error){
                    console.error('Create note error:', error)
                    proxy?.$buefy.toast.open({
                        message: 'Error to create note.',
                        type: 'is-danger',
                        duration: 5000,
                        position: 'is-top',
                        queue: false
                    })
                }
            }
        }
    })

</script>

<template>
    <b-button type="is-custom-purple">
        <b-icon pack="fas" icon="add" @click="onClick"></b-icon>
    </b-button>
</template>