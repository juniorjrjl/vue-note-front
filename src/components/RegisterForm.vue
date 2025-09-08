<script setup lang="ts">
    import { useForm, useField } from 'vee-validate'
    import { toTypedSchema } from '@vee-validate/yup'
    import { registerSchema, type RegisterForm } from '@/validations/UserValidations'
    import UserService from '@/services/UserService'
    import { useRouter } from 'vue-router'
    import { getCurrentInstance } from 'vue'

    const router = useRouter()
    const { proxy } = getCurrentInstance()!

    const {handleSubmit, meta, resetForm} = useForm<RegisterForm>({
        validationSchema: toTypedSchema(registerSchema)
    })

    const { value: name, errorMessage: nameError, handleBlur: blurName } = useField('name')
    const { value: email, errorMessage: emailError, handleBlur: blurEmail } = useField('email')
    const { value: password, errorMessage: passwordError, handleBlur: blurPassword } = useField('password')
    const { value: confirmPassword, errorMessage: confirmPasswordError, handleBlur: blurConfirmPassword } = useField('confirmPassword')

    const onSubmit = handleSubmit(async (formData) => {
        try {
            const {data, error} = await UserService.register(formData)
            let message = ''
            let type = ''
            if (data){
                message = 'User registered successfully! Please login.'
                type = 'is-success'
                router.push('/login')
            } else if (error) {
                message = 'Error registering user. Please try again.'
                type = 'is-danger'
                console.error('Registration error:', error)
            }
            proxy?.$buefy.toast.open({
                message,
                type,
                duration: 5000,
                position: 'is-top-right',
                queue: false
            })
        } catch (error) {
            console.error('Registration error:', error)
            proxy?.$buefy.toast.open({
                message: 'Error registering user. Please try again.',
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
    <div class="columns is-vcentered">
        <form @submit.prevent="onSubmit">
            <div class="column is-12">
                <b-field label="Name:" :type="nameError ? 'is-danger' : ''" :message="nameError">
                    <b-input v-model="name" @blur="blurName"></b-input>
                </b-field>
                <b-field label="E-mail:" :type="emailError ? 'is-danger' : ''" :message="emailError">
                    <b-input v-model="email" @blur="blurEmail"></b-input>
                </b-field>
                <b-field label="Password:" :type="passwordError ? 'is-danger' : ''" :message="passwordError">
                    <b-input type="password" v-model="password" @blur="blurPassword"></b-input>
                </b-field>
                <b-field label="Confirm Password:" :type="confirmPasswordError ? 'is-danger' : ''" :message="confirmPasswordError">
                    <b-input type="password" v-model="confirmPassword" @blur="blurConfirmPassword"></b-input>
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
                            <b-button type="is-custom-purple" native-type="submit" :disabled="!meta.valid">Register</b-button>
                        </div>
                    </div>

                </b-field>
            </div>
        </form>
    </div>
</template>
