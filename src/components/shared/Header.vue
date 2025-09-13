<script setup lang="ts">
    import {ref} from "vue";
    import logoImage from '@/assets/logo.png';
    import { routerInfo } from "@/router";
    import { useAuthStore } from "@/stores/auth";

    const isActive = ref(false)
    const authStore = useAuthStore()
    const logoLink = authStore.isAuthenticated ? routerInfo.notes.path : routerInfo.home.path
</script>

<template>
    <b-navbar :isActive.sync="isActive" type="is-dark" wrapper-class="container">
        <template #brand>
            <b-navbar-item tag="router-link" :to="logoLink">
                <img alt="logo" :src="logoImage"/>
            </b-navbar-item>
        </template>

        <template #end>
            <template v-if="authStore.isAuthenticated">
                <b-navbar-item tag="router-link" :to="routerInfo.userEdit.path">User Edit</b-navbar-item>
                <b-navbar-item tag="router-link" :to="routerInfo.home.path" @click="() => authStore.clearAuth()">Logout</b-navbar-item>
            </template>
            <template v-else>
                <b-navbar-item tag="router-link" :to="routerInfo.register.path">Register</b-navbar-item>
                <b-navbar-item tag="router-link" :to="routerInfo.login.path">Login</b-navbar-item>
            </template>
        </template>
    </b-navbar>
</template>

<style lang="scss" scoped>
@use "../../styles/custom_colors" as *;

nav.navbar {
    height: 70px;
    border-bottom: 1px solid black;

    .navbar-brand {
        img {
            height: 40px;
            margin-top: 15px;
        }
    }
}

.navbar-logged {
    .navbar-menu {
        background-color: $custom-purple;
    }
}
</style>