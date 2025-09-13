<script setup lang="ts">
import { routerInfo } from '@/router';

</script>

<template>
    <section class="section">
        <div class="container">
            <div class="columns is-vcentered">
                <div class="column is-5">
                    <h1 class="title is-2 has-text-white">
                        Create notes easily and access when you want on the cloud
                    </h1>

                    <h2 class="subtitle is-5 has-text-light">
                        This is a project created with Vue 3 and NestJS, this project is a note manager
                        that allows you to create, edit and delete notes, you can also register and login
                        to access your notes from anywhere.
                    </h2>

                    <h2 class="title mt-5">
                        <RouterLink :to="routerInfo.register.path" class="button is-outlined is-white is-large">
                            <strong>Register for free Now</strong>
                        </RouterLink>
                    </h2>
                </div>
                <div class="column is-6 is-offset-1">
                    <img src="@/assets/presentation.png" alt="presentation" />
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
    @use './../styles/custom_colors' as *;

    .home {
        background-color: $custom-purple;
        height: calc(100% - 70px);
    }
</style>