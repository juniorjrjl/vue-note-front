<script setup lang="ts">
import { useInputModalStore, InputModalResponse } from '@/stores/inputModal';
import { ref, watch } from 'vue'

    const inputModal = useInputModalStore()
    const isActive = ref(false)
    const value = ref("")

    const emitEvent = (response: InputModalResponse) => {
        inputModal.close(response)
        inputModal.setValue(value.value)
    }
    watch(() => inputModal.show, (val) => isActive.value = val)
    const onActiveChange = (val: boolean) => {
        if (!val && inputModal.show) {
            inputModal.setValue(value.value)
            emitEvent(InputModalResponse.CANCEL)
        }
    }

</script>

<template>
    <b-modal v-model="isActive" :can-cancel="['escape', 'x', 'outside']" @update:modelValue="onActiveChange">
        <form action="">
            <div class="modal-card" >
                <header class="modal-card-head">
                    <p class="modal-card-title">{{inputModal.title}}</p>
                    <button type="button" class="delete" @click="emitEvent(InputModalResponse.CANCEL)"/>
                </header>
                <section class="modal-card-body">
                    <b-input v-model="value" ></b-input>
                </section>
                <footer class="modal-card-foot">
                    <b-button label="Ok" @click="emitEvent(InputModalResponse.CONFIRM)" />
                    <b-button label="Cancel" type="is-primary" @click="emitEvent(InputModalResponse.CANCEL)" />
                </footer>
            </div>
        </form>
    </b-modal>
</template>