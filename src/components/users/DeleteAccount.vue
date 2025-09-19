<script setup lang="ts">
    import { routerInfo } from '@/router';
    import { askYesNo } from '@/services/ModalService';
    import UsersService from '@/services/UserService';
    import { useAuthStore } from '@/stores/auth';
    import { YesNoResponse } from '@/stores/yesNo';
    import { getCurrentInstance } from 'vue';
    import { useRouter } from 'vue-router';

    const authStore = useAuthStore()
    const router = useRouter()
    const { proxy } = getCurrentInstance()!

    const deleteAccount = async () => {
        if (await askYesNo('Are you sure you want to delete your account?') === YesNoResponse.YES) {
            try {
                if (!authStore.accessToken || !authStore.isAuthenticated || !authStore.userId){
                    router.push(routerInfo.login)
                    return
                }
                const {error} = await  UsersService.delete(authStore.accessToken, authStore.userId)
                if (!error){
                    authStore.clearAuth()
                    router.push(routerInfo.home.path)
                    proxy?.$buefy.toast.open({
                        message: 'Account deleted successfully.',
                        type: 'is-success',
                        duration: 5000,
                        position: 'is-top',
                        queue: false
                    })
                    return
                } else {
                    console.error('Login error:', error)
                    proxy?.$buefy.toast.open({
                        message: 'Error logging in user. Please try again.',
                        type: 'is-danger',
                        duration: 5000,
                        position: 'is-top',
                        queue: false
                    })
                    return
                }
            } catch (error) {
                console.error('Login error:', error)
                proxy?.$buefy.toast.open({
                    message: 'Error logging in user. Please try again.',
                    type: 'is-danger',
                    duration: 5000,
                    position: 'is-top',
                    queue: false
                })
            }
        }
    }
</script>

<template>
    <b-button type="is-danger" @click="deleteAccount">Delete account</b-button>
</template>
