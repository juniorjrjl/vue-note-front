<script setup lang="ts">
    import { routerInfo } from '@/router';
    import UsersService from '@/services/UserService';
    import { useAuthStore } from '@/stores/auth';
    import { loginSchema, type LoginForm } from '@/validations/UserValidations';
    import { toTypedSchema } from '@vee-validate/yup';
    import { useField, useForm } from 'vee-validate';
    import { getCurrentInstance } from 'vue';
    import { useRouter } from 'vue-router';

    const authStore = useAuthStore()
    const router = useRouter()
    const { proxy } = getCurrentInstance()!

    const {handleSubmit, meta, resetForm} = useForm<LoginForm>({
        validationSchema: toTypedSchema(loginSchema)
    })

    const { value: email, errorMessage: emailError, handleBlur: blurEmail } = useField('email')
    const { value: password, errorMessage: passwordError, handleBlur: blurPassword } = useField('password')

    const onSubmit = handleSubmit(async (formData) => {
        try {
            const {data, error} = await UsersService.login(formData)
            if (data){
                authStore.setAuth(data)
                await router.push(routerInfo.notes.path)
                return
            }
            
            if (error) {
                proxy?.$buefy.toast.open({
                    message: 'Error logging in user. Please try again.',
                    type: 'is-danger',
                    duration: 5000,
                    position: 'is-top',
                    queue: false
                })
                console.error('Login error:', error)
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
        }finally {
            resetForm()
        }
    })

</script>

<template>
    <form @submit.prevent="onSubmit">
        <div class="columns is-vcentered">
            <div class="column is-12">
                <b-field label="E-mail:" :type="emailError ? 'is-danger' : ''" :message="emailError">
                    <b-input v-model="email" @blur="blurEmail"></b-input>
                </b-field>
                <b-field label="Password:" :type="passwordError ? 'is-danger' : ''" :message="passwordError">
                    <b-input type="password" v-model="password" @blur="blurPassword"></b-input>
                </b-field>
                <b-field>

                    
                    <div class="columns is-mobile is-vcentered">
                        <div class="column is-flex is-justify-content-center is-align-items-center">
                            <router-link to="/register" class="button is-white has-text-custom-purple">Register</router-link>
                        </div>
                        <div class="column is-flex is-justify-content-center is-align-items-center">
                            <span class="padding-label has-text-custom-purple is-outlined">or</span>
                        </div>
                        <div class="column is-flex is-justify-content-center is-align-items-center">
                            <b-button type="is-custom-purple" native-type="submit" :disabled="!meta.valid">Login</b-button>
                        </div>
                    </div>

                </b-field>
            </div>
        </div>
    </form>
</template>
