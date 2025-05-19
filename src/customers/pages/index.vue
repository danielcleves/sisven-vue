<template>
    <div class="container">
        <div class="d-flex justify-content-between align-items-center">
            <h1>Listado de compradores</h1>
            <button v-if="createModal" type="button" class="btn btn-success" @click="createModal.open()">
                <FontAwesomeIcon :icon="faPlus" />
            </button>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th># de documento</th>
                    <th>Primer nombre</th>
                    <th>Apellido</th>
                    <th>Dirección</th>
                    <th>Fecha de nacimiento</th>
                    <th>Celular</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(customer, index) in customers" :key="index">
                    <th scope="row">{{ customer.id }}</th>
                    <td>{{ customer.document_number }}</td>
                    <td>{{ customer.first_name }}</td>
                    <td>{{ customer.last_name }}</td>
                    <td>{{ customer.addres }}</td>
                    <td>{{ customer.birthday }}</td>
                    <td>{{ customer.phone_number }}</td>
                    <td>{{ customer.email }}</td>
                    <td class="d-flex justify-content-evenly gap-2">
                        <button type="button" class="btn btn-danger" @click="deleteRegister(customer.id)">
                            <i class="fa fa-trash" aria-hidden="true"></i>
                            <FontAwesomeIcon :icon="faTrash" />
                        </button>
                        <button v-if="editModal" type="button" class="btn btn-warning" @click="editRegister(customer)">
                            <FontAwesomeIcon :icon="faPencil" />
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <Modal title="Crear comprador" ref="createModal">
        <CreateForm @cancel="createModal!.close()" @save="update()" />
    </Modal>
    <Modal title="Editar comprador" ref="editModal">
        <EditForm @cancel="editModal!.close()" @save="update()" :info="infoEdit!"/>
    </Modal>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Customer } from '@/customers/types';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTrash, faPencil, faPlus } from '@fortawesome/free-solid-svg-icons'

import Modal from '@/components/Modal.vue';
import CreateForm from '@/customers/components/createForm.vue';
import EditForm from '@/customers/components/editForm.vue';

const customers = ref<Customer[]>([]);

const getCustomers = () => {
    axios.get('http://127.0.0.1:8000/api/customers')
        .then((response) => {
            customers.value = response.data;
        })
        .catch((error) => {
            console.error(error);
        });
}

onMounted(() => {
    getCustomers()
})

const deleteRegister = (id: number) => {
    axios.delete(`http://127.0.0.1:8000/api/customers/${id}`)
        .then((response) => {
            customers.value = customers.value.filter(customer => customer.id !== id);
        })
        .catch((error) => {
            console.error(error);
        });
}


const createModal = ref<InstanceType<typeof Modal>>();

const editModal = ref<InstanceType<typeof Modal>>();
const infoEdit = ref<Customer>();

const editRegister = (info: Customer) => {
    infoEdit.value = info;
    editModal.value!.open()
}
    
const update = () => {
    getCustomers()
    createModal.value?.close()
    editModal.value?.close()
}
</script>