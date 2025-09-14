<script setup lang="ts">
    import { routerInfo } from '@/router';
import UsersService from '@/services/UserService';
import { useAuthStore } from '@/stores/auth';
import { changePasswordSchema, type ChangePasswordForm } from '@/validations/UserValidations';
    import { toTypedSchema } from '@vee-validate/yup';
    import { useField, useForm } from 'vee-validate';
import { getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';

    const router = useRouter()
    const authStore = useAuthStore()
    const { proxy } = getCurrentInstance()!

    const {handleSubmit, meta, resetForm} = useForm<ChangePasswordForm>({validationSchema: toTypedSchema(changePasswordSchema)})
    const onSubmit = handleSubmit(async (values) => {
        if (!authStore.accessToken || !authStore.isAuthenticated || !authStore.userId){
            router.push(routerInfo.login)
            return
        }

        try {
            const { error } = await UsersService.changePassword(authStore.userId, values, authStore.accessToken)
            if (!error){
                proxy?.$buefy.toast.open({
                    message: 'User password updated successfully.',
                    type: 'is-success',
                    duration: 5000,
                    position: 'is-top',
                    queue: false
                })
                return
            } else {
                proxy?.$buefy.toast.open({
                    message: 'Error updating user password. Please try again.',
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
                message: 'Error updating user password. Please try again.',
                type: 'is-danger',
                duration: 5000,
                position: 'is-top',
                queue: false
            })
            console.error('Login error:', error)
        } finally{
            resetForm()
        }
    })

    const { value: oldPassword, errorMessage: oldPasswordError, handleBlur: blurOldPassword } = useField('oldPassword')
    const { value: newPassword, errorMessage: newPasswordError, handleBlur: blurNewPassword } = useField('newPassword')
    const { value: confirmPassword, errorMessage: confirmPasswordError, handleBlur: blurConfirmPassword } = useField('confirmPassword')

</script>

<template>
    <form @submit.prevent="onSubmit">
        <div class="columns is-vcentered">
            <div class="column is-12">
                <b-field label="Old Password:" :type="oldPasswordError ? 'is-danger' : ''" :message="oldPasswordError">
                    <b-input type="password" v-model="oldPassword" @blur="blurOldPassword"></b-input>
                </b-field>
                <b-field label="New Password:" :type="newPasswordError ? 'is-danger' : ''" :message="newPasswordError">
                    <b-input type="password" v-model="newPassword" @blur="blurNewPassword"></b-input>
                </b-field>
                <b-field label="Confirm Password:" :type="confirmPasswordError ? 'is-danger' : ''" :message="confirmPasswordError">
                    <b-input type="password" v-model="confirmPassword" @blur="blurConfirmPassword"></b-input>
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