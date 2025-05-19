<template>
    <div>
        <Form @submit="onSubmit" :validation-schema="schema">
            <div class="mb-3 justify-content-start">
                <label for="document_number" class="form-label">Número de documento</label>
                <Field type="text" class="form-control" id="document_number" name="document_number"
                    placeholder="Número de documento" :value="props.info.document_number"/>
                <ErrorMessage name="document_number" class="text-danger" />
            </div>
            <div class="mb-3">
                <label for="first_name" class="form-label">Primer nombre</label>
                <Field type="text" class="form-control" id="first_name" name="first_name" placeholder="Primer nombre" :value="props.info.first_name"/>
                <ErrorMessage name="first_name" class="text-danger" />
            </div>
            <div class="mb-3">
                <label for="last_name" class="form-label">Apellido</label>
                <Field type="text" class="form-control" id="last_name" name="last_name" placeholder="Apellido" :value="props.info.last_name"/>
                <ErrorMessage name="last_name" class="text-danger" />
            </div>
            <div class="mb-3">
                <label for="addres" class="form-label">Dirección</label>
                <Field type="text" class="form-control" id="addres" name="addres" placeholder="Dirección" :value="props.info.addres"/>
                <ErrorMessage name="addres" class="text-danger" />
            </div>
            <div class="mb-3">
                <label for="birthday" class="form-label">Fecha de nacimiento</label>
                <Field type="date" class="form-control" id="birthday" name="birthday" :value="props.info.birthday"/>
                <ErrorMessage name="birthday" class="text-danger" />
            </div>
            <div class="mb-3">
                <label for="phone_number" class="form-label">Celular</label>
                <Field type="text" class="form-control" id="phone_number" name="phone_number"
                    placeholder="+57 300 000 0000" :value="props.info.phone_number"/>
                <ErrorMessage name="phone_number" class="text-danger" />
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <Field type="email" class="form-control" id="email" name="email" placeholder="@example.com" :value="props.info.email"/>
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
import * as yup from 'yup';
import { Customer } from '../types';

const emit = defineEmits<{
    (e: 'cancel'): void
    (e: 'save'): void
}>();

const props = defineProps<{info: Customer}>()

const schema = yup.object({
    document_number: yup.string().required('El número de documento es requerido'),
    first_name: yup.string().required('El primer nombre es requerido'),
    last_name: yup.string().required('El apellido es requerido'),
    addres: yup.string().required('La dirección es requerida'),
    birthday: yup.date().required('La fecha de nacimiento es requerida'),
    phone_number: yup.string().required('El número de teléfono es requerido'),
    email: yup.string().email('Ingrese un email válido').required('El email es requerido')
});

const onSubmit = (values: any) => {
    console.log('Valores del formulario:', values);
    axios.put(`http://127.0.0.1:8000/api/customers/${props.info.id}`, values)
        .then(() => {
            emit('save')
        })
};
</script>