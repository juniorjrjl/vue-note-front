<script setup lang="ts">
    import LoginForm from '@/components/users/LoginForm.vue';
    import logoImage from '@/assets/logo.png';
</script>

<template>
    <section class="section auth is-medium">
        <div class="container">
            <div class="columns is-vcentered">
                <div class="column is-3">

                    <div class="card">
                        <div class="card-content">
                            <section>
                                <div class="columns is-centered">
                                    <div class="column is-12 has-text-centered">
                                        <img :src="logoImage" alt="logo" />
                                    </div>
                                </div>

                                <div class="columns">
                                    <div class="column is-12">
                                        <h2 class="title is-6 has-text-grey has-text-centered">Your notes on the cloud</h2>
                                    </div>
                                </div>

                                <LoginForm />
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
    @use './../../styles/custom_colors' as *;

    .auth {
        background-color: $custom-purple;
        height: calc(100% - 70px);
    }

    .padding-label {
        padding-bottom: calc(0.5em - 1px);
        padding-top: calc(0.5em - 1px);
    }
</style>