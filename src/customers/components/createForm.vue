<template>
    <div>
        <Form @submit="onSubmit" :validation-schema="schema">
            <div class="mb-3 justify-content-start">
                <label for="document_number" class="form-label">Número de documento</label>
                <Field type="text" class="form-control" id="document_number" name="document_number"
                    placeholder="Número de documento" />
                <ErrorMessage name="document_number" class="text-danger" />
            </div>
            <div class="mb-3">
                <label for="first_name" class="form-label">Primer nombre</label>
                <Field type="text" class="form-control" id="first_name" name="first_name" placeholder="Primer nombre" />
                <ErrorMessage name="first_name" class="text-danger" />
            </div>
            <div class="mb-3">
                <label for="last_name" class="form-label">Apellido</label>
                <Field type="text" class="form-control" id="last_name" name="last_name" placeholder="Apellido" />
                <ErrorMessage name="last_name" class="text-danger" />
            </div>
            <div class="mb-3">
                <label for="addres" class="form-label">Dirección</label>
                <Field type="text" class="form-control" id="addres" name="addres" placeholder="Dirección" />
                <ErrorMessage name="addres" class="text-danger" />
            </div>
            <div class="mb-3">
                <label for="birthday" class="form-label">Fecha de nacimiento</label>
                <Field type="date" class="form-control" id="birthday" name="birthday" />
                <ErrorMessage name="birthday" class="text-danger" />
            </div>
            <div class="mb-3">
                <label for="phone_number" class="form-label">Celular</label>
                <Field type="text" class="form-control" id="phone_number" name="phone_number"
                    placeholder="+57 300 000 0000" />
                <ErrorMessage name="phone_number" class="text-danger" />
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <Field type="email" class="form-control" id="email" name="email" placeholder="@example.com" />
                <ErrorMessage name="email" class="text-danger" />
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
import schema from '@/customers/schemas';
import { confirmSucess } from '@/util';

const emit = defineEmits<{
    (e: 'cancel'): void
    (e: 'save'): void
}>();

const onSubmit = (values: any) => {
    console.log('Valores del formulario:', values);
    axios.post('http://127.0.0.1:8000/api/customers', values)
        .then(() => {
            emit('save')
            confirmSucess();
        })
};
</script>