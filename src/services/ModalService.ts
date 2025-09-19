import { InputModalResponse, useInputModalStore } from "@/stores/inputModal"
import { useYesNoStore, type YesNoResponse } from "@/stores/yesNo"
import { watch } from "vue"

export const askYesNo = (message: string): Promise<YesNoResponse> => {
    const yesNoStore = useYesNoStore()
    yesNoStore.open(message)

    return new Promise((resolve) => {
        const stop = watch(
            () => yesNoStore.event,
            (val) => {
                if (val !== null) {
                    stop()
                    resolve(val)
                }
            }
        )
    })
}

export const requestInput = (message: string): Promise<{ choise: InputModalResponse, value: string | null }> => {
    const inputModalStore = useInputModalStore()
    inputModalStore.open(message)

    return new Promise((resolve) => {
        const stop = watch(
            () => inputModalStore.event,
            (choise) => {
                if (choise !== null) {
                    stop()
                    const value = choise === InputModalResponse.CONFIRM ? inputModalStore.value : null
                    resolve({ choise, value })
                }
            }
        )
    })
}
