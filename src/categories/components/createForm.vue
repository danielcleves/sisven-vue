<template>
    <div>
        <Form @submit="onSubmit" :validation-schema="schema">
            <div class="mb-3 justify-content-start">
                <label for="name" class="form-label">Nombre</label>
                <Field type="text" class="form-control" id="name" name="name"
                    placeholder="Nombre" />
                <ErrorMessage name="name" class="text-danger" />
            </div>
            <div class="mb-3">
                <label for="description" class="form-label">Descripción</label>
                <Field type="text" class="form-control" id="description" name="description" placeholder="Descripción" />
                <ErrorMessage name="description" class="text-danger" />
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
import schema from '@/categories/schemas';
import { confirmSucess } from '@/util';

const emit = defineEmits<{
    (e: 'cancel'): void
    (e: 'save'): void
}>();

const onSubmit = (values: any) => {
    console.log('Valores del formulario:', values);
    axios.post('http://127.0.0.1:8000/api/categories', values)
        .then(() => {
            emit('save')
            confirmSucess();
        })
};
</script>