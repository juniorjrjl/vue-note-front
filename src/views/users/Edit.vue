<script setup lang="ts">
    import ChangePassword from '@/components/users/ChangePassword.vue';
    import DeleteAccount from '@/components/users/DeleteAccount.vue';
    import EditForm from '@/components/users/EditForm.vue';
    import { routerInfo } from '@/router';
    import UsersService from '@/services/UserService';
    import { useAuthStore } from '@/stores/auth';
    import { useCurrentUserStore } from '@/stores/currentUser';
    import { getCurrentInstance, onMounted } from 'vue';
    import { useRouter } from 'vue-router';

    const authStore = useAuthStore()
    const currentUserStore = useCurrentUserStore()
    const router = useRouter()
    const { proxy } = getCurrentInstance()!

    onMounted(async() => {
        try{
            if (!authStore.accessToken || !authStore.isAuthenticated || !authStore.userId){
                router.push(routerInfo.login)
                return
            }

            const {data, error} = await UsersService.findById(authStore.userId, authStore.accessToken)

            if (data){
                currentUserStore.setCurrentUse(data)
            }

            if (error) {
                proxy?.$buefy.toast.open({
                    message: 'Error to load current user.',
                    type: 'is-danger',
                    duration: 5000,
                    position: 'is-top',
                    queue: false
                })
                console.error('Login error:', error)
                return
            }
        }catch (error){
            proxy?.$buefy.toast.open({
                    message: 'Error to load current user.',
                    type: 'is-danger',
                    duration: 5000,
                    position: 'is-top',
                    queue: false
            })
            console.error('Login error:', error)
        }
    })

</script>

<template>
    <section class="section user is-medium">
        <div class="container">
            <div class="columns is-vcentered users-edit">
                <div class="column is-4">
                    <h2 class="title is-5 has-text-grey has-text-Left">User Information</h2>
                    <div class="card">
                        <div class="card-content">
                            <EditForm />
                        </div>
                    </div>
                </div>
                <div class="column is-4 users-edit">
                    <h2 class="title is-5 has-text-grey has-text-Left">Change Password</h2>
                    <div class="card">
                        <div class="card-content">
                            <ChangePassword />
                        </div>
                    </div>
                </div>
                <div class="column is-4 users-edit">
                    <h2 class="title is-5 has-text-grey has-text-Left">Delete Account</h2>
                    <div class="card">
                        <div class="card-content">
                            <DeleteAccount />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
    @use './../../styles/custom_colors' as *;

    .users {
        padding-top: 40px !important;

        .card-content {
            padding: 40px;
        }

        .users-edit {
            .title {
                margin-bottom: 15px;
            }
        }
    }
</style>