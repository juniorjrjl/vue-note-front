<script setup lang="ts">
    import {ref} from "vue";
    import logoImage from '@/assets/logo.png';

    const isActive = ref(false)
</script>

<template>
    <b-navbar :isActive.sync="isActive" type="is-dark" wrapper-class="container">
        <template #brand>
            <b-navbar-item tag="router-link" to="/">
                <img alt="logo" :src="logoImage"/>
            </b-navbar-item>
        </template>

        <template #end>
            <b-navbar-item tag="router-link" to="/register">Register</b-navbar-item>
            <b-navbar-item tag="router-link" to="/login">Login</b-navbar-item>
        </template>
    </b-navbar>
</template>

<style lang="scss" scoped>
@use "../styles/custom_colors" as *;

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