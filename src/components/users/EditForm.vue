<script setup lang="ts">
    import UsersService from '@/services/UserService';
    import { useAuthStore } from '@/stores/auth';
    import { toTypedSchema } from '@vee-validate/yup';
    import { useField, useForm } from 'vee-validate';
    import { getCurrentInstance, watchEffect } from 'vue';
    import { editSchema, type EditForm  } from '@/validations/UserValidations';
    import { useRouter } from 'vue-router';
    import { routerInfo } from '@/router';
    import { useCurrentUserStore } from '@/stores/currentUser';

    const authStore = useAuthStore()
    const currentUserStore = useCurrentUserStore()
    const router = useRouter()
    const { proxy } = getCurrentInstance()!

        const {handleSubmit, meta, resetForm} = useForm<EditForm>({
        validationSchema: toTypedSchema(editSchema)
    })

    watchEffect(() => {
        const {name, email} = currentUserStore.currentUser
        if (name && email){
            resetForm({
                values:{
                    name,
                    email
                }
            })
        }
    })

    const { value: email, errorMessage: emailError, handleBlur: blurEmail } = useField('email')
    const { value: name, errorMessage: nameError, handleBlur: blurName } = useField('name')

    const onSubmit = handleSubmit(async (values) => {
        if (!authStore.accessToken || !authStore.isAuthenticated || !authStore.userId){
            router.push(routerInfo.login)
            return
        }
        try {
            const {data, error} = await UsersService.update(authStore.userId, values, authStore.accessToken)
            if (data){
                proxy?.$buefy.toast.open({
                    message: 'User updated successfully.',
                    type: 'is-success',
                    duration: 5000,
                    position: 'is-top',
                    queue: false
                })
                return
            }
            if (error) {
                proxy?.$buefy.toast.open({
                    message: 'Error updating user. Please try again.',
                    type: 'is-danger',
                    duration: 5000,
                    position: 'is-top',
                    queue: false
                })
                console.error('Login error:', error)
                return
            }
        } catch (error) {
            proxy?.$buefy.toast.open({
                message: 'Error updating user. Please try again.',
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
    <form @submit.prevent="onSubmit">
        <div class="columns is-vcentered">
            <div class="column is-12">
                <b-field label="E-mail:" :type="emailError ? 'is-danger' : ''" :message="emailError">
                    <b-input v-model="email" @blur="blurEmail"></b-input>
                </b-field>
                <b-field label="Name:" :type="nameError ? 'is-danger' : ''" :message="nameError">
                    <b-input type="name" v-model="name" @blur="blurName"></b-input>
                </b-field>
                <b-field>

                    
                    <div class="columns is-mobile is-vcentered">
                        <div class="column is-flex is-justify-content-center is-align-items-center">
                            <b-button type="is-custom-purple" native-type="submit" :disabled="!meta.valid">Update</b-button>
                        </div>
                    </div>

                </b-field>
            </div>
        </div>
    </form>
</template>