<script setup lang="ts"></script>

<template>
    <div class="columns is-vcentered">
        <div class="column is-12">
            <b-field label="Name:">
                <b-input></b-input>
            </b-field>
            <b-field label="E-mail:">
                <b-input></b-input>
            </b-field>
            <b-field label="Password:">
                <b-input type="password"></b-input>
            </b-field>
            <b-field label="Confirm Password:">
                <b-input type="password"></b-input>
            </b-field>
            <b-field>

                
                <div class="columns is-mobile is-vcentered">
                    <div class="column is-flex is-justify-content-center is-align-items-center">
                        <router-link to="/login" class="button is-white has-text-custom-purple">Login</router-link>
                    </div>
                    <div class="column is-flex is-justify-content-center is-align-items-center">
                        <span class="padding-label has-text-custom-purple is-outlined">or</span>
                    </div>
                    <div class="column is-flex is-justify-content-center is-align-items-center">
                        <b-button type="is-custom-purple">Register</b-button>
                    </div>
                </div>

            </b-field>
        </div>
    </div>
</template>
