<script setup lang="ts">
import { useYesNoStore, YesNoResponse } from '@/stores/yesNo';
import { ref, watch } from 'vue'

    const yesNoStore = useYesNoStore()
    const isActive = ref(false)

    const emitEvent = (response: YesNoResponse) => yesNoStore.close(response)
    watch(() => yesNoStore.show, (val) => isActive.value = val)
    const onActiveChange = (val: boolean) => {
        if (!val && yesNoStore.show) {
            emitEvent(YesNoResponse.CANCEL)
        }
    }

</script>

<template>
    <b-modal v-model="isActive" :can-cancel="['escape', 'x', 'outside']" @update:modelValue="onActiveChange">
        <form action="">
            <div class="modal-card" >
                <header class="modal-card-head">
                    <p class="modal-card-title">Confirmation</p>
                    <button type="button" class="delete" @click="emitEvent(YesNoResponse.CANCEL)"/>
                </header>
                <section class="modal-card-body">
                    <p class="modal-card-title">{{yesNoStore.title}}</p>
                </section>
                <footer class="modal-card-foot">
                    <b-button label="Yes" @click="emitEvent(YesNoResponse.YES)" />
                    <b-button label="No" type="is-primary" @click="emitEvent(YesNoResponse.NO)" />
                </footer>
            </div>
        </form>
    </b-modal>
</template>