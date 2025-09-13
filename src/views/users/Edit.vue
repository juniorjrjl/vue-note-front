<script setup lang="ts">
import DeleteAccount from '@/components/users/DeleteAccount.vue';

</script>

<template>
    <section class="section user is-medium">
        <div class="container">
            <div class="columns is-vcentered users-edit">
                <div class="column is-4">
                    <h2 class="title is-5 has-text-grey has-text-Left">User Information</h2>
                    <div class="card">
                        <div class="card-content">
                        </div>
                    </div>
                </div>
                <div class="column is-4 users-edit">
                    <h2 class="title is-5 has-text-grey has-text-Left">Change Password</h2>
                    <div class="card">
                        <div class="card-content">
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

<style scoped></style>