<template>
    <div>
        <Form @submit="onSubmit" :validation-schema="schema">
            <div class="mb-3 justify-content-start">
                <label for="name" class="form-label">Nombre</label>
                <Field type="text" class="form-control" id="name" name="name" placeholder="Nombre"
                    :value="props.info.name" />
                <ErrorMessage name="name" class="text-danger" />
            </div>
            <div class="mb-3">
                <label for="observation" class="form-label">Observación</label>
                <Field type="text" class="form-control" id="observation" name="observation" placeholder="Observación"
                    :value="props.info.observation" />
                <ErrorMessage name="observation" class="text-danger" />
            </div>
            <div class="d-flex justify-content-end gap-2">
                <button type="button" class="btn btn-secondary" @click="emit('cancel')">Cancelar</button>
                <button type="submit" class="btn btn-primary">Guardar</button>
            </div>
        </Form>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { Paymode } from '@/paymodes/types';
import schema from '@/paymodes/schemas'

const emit = defineEmits<{
    (e: 'cancel'): void
    (e: 'save'): void
}>();

const props = defineProps<{ info: Paymode }>()

const onSubmit = (values: any) => {
    console.log('Valores del formulario:', values);
    axios.put(`http://127.0.0.1:8000/api/payModes/${props.info.id}`, values)
        .then(() => {
            emit('save')
        })
};
</script>