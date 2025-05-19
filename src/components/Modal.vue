<template>
    <div v-if="displayed" class="modal fade show" style="display: block" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header d-flex justify-content-between">
                    <h5 class="modal-title">{{ props.title }}</h5>
                    <span class="fs-2 pointer" @click="displayed = false">&times;</span>
                </div>
                <div class="modal-body text-start">
                    <slot/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface ModalProps {
    title: string;
}

const props = defineProps<ModalProps>();

const displayed = ref(false);

defineExpose({
    open: () => {
        displayed.value = true;
    },
    close: () => {
        displayed.value = false;
    }
});
</script>

<style scoped>
.pointer {
    cursor: pointer;
}
</style>