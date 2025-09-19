<script setup lang="ts">
    import Editor from '@/components/notes/Editor.vue';
    import List from '@/components/notes/List.vue';
    import Search from '@/components/notes/Search.vue';
    import { routerInfo } from '@/router';
    import { NotesService } from '@/services/NotesService';
    import { useAuthStore } from '@/stores/auth';
    import { useUserNotesStore } from '@/stores/userNotes';
    import { getCurrentInstance, onMounted, watch } from 'vue';
    import { useRouter } from 'vue-router';

    const authStore = useAuthStore()
    const userNotesStore = useUserNotesStore()
    const router = useRouter()
    const { proxy } = getCurrentInstance()!

    const findUserNotes = async () =>{
        try{
            if (!authStore.accessToken || !authStore.isAuthenticated || !authStore.userId){
                router.push(routerInfo.login)
                return {data: null, error: null}
            }

            const {data, error} =  await NotesService.findByAuthor(authStore.userId, userNotesStore.query, authStore.accessToken)

            if (data){
                userNotesStore.setNotes(data)
                return
            }

            if (error) {
                proxy?.$buefy.toast.open({
                    message: 'Error to load notes.',
                    type: 'is-danger',
                    duration: 5000,
                    position: 'is-top',
                    queue: false
                })
                console.error('Load notes error:', error)
                return
            }
        }catch (error){
            proxy?.$buefy.toast.open({
                    message: 'Error to load notes.',
                    type: 'is-danger',
                    duration: 5000,
                    position: 'is-top',
                    queue: false
            })
            console.error('Load notes error:', error)
        }
    }

    watch(
        () => userNotesStore.query,
        (_) => findUserNotes(),
        { immediate: true, once: false }
    )

    onMounted(async() => await findUserNotes())

</script>

<template>
    <div class="columns notes">
        <div class="column is-2">
            <div class="columns is-multiline is-mobile">
                <div class="column is-full">
                    <Search />
                </div>
                <div class="column is-full">
                    <List />
                </div>
            </div>
        </div>
        <div class="column is-10">
            <Editor class="notes-editor"/>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @use './../../styles/custom_colors' as *;

    .notes {
        margin-left: 0px;
        margin-right: 0px;
        margin-top: opx;
        height: calc(100% - 70px);
    }

    .bm-menu {
        background-color: white;
        padding-top: 10px;
    }

    .list-item-is-active {
        background-color: $custom-grey-light;
    }

    .notes-editor {
        padding: 0;
        height: calc(100% - 43px);

        .quill {
            height: 100%;
        }
    }
</style>