<template>
    <div class="container">
        <div class="d-flex justify-content-between align-items-center">
            <h1>Metodos de pago</h1>
            <button v-if="createModal" type="button" class="btn btn-success" @click="createModal.open()">
                <FontAwesomeIcon :icon="faPlus" />
            </button>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Observación</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(paymode, index) in paymodes" :key="index">
                    <th scope="row">{{ paymode.id }}</th>
                    <td>{{ paymode.name }}</td>
                    <td>{{ paymode.observation }}</td>
                    <td class="d-flex justify-content-evenly gap-2">
                        <button type="button" class="btn btn-danger" @click="deleteRegister(paymode.id)">
                            <i class="fa fa-trash" aria-hidden="true"></i>
                            <FontAwesomeIcon :icon="faTrash" />
                        </button>
                        <button v-if="editModal" type="button" class="btn btn-warning" @click="editRegister(paymode)">
                            <FontAwesomeIcon :icon="faPencil" />
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <Modal title="Crear metodo de pago" ref="createModal">
        <CreateForm @cancel="createModal!.close()" @save="update()" />
    </Modal>
    <Modal title="Editar metodo de pago" ref="editModal">
        <EditForm @cancel="editModal!.close()" @save="update()" :info="infoEdit!"/>
    </Modal>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Paymode } from '@/paymodes/types';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTrash, faPencil, faPlus } from '@fortawesome/free-solid-svg-icons'

import Modal from '@/components/Modal.vue';
import CreateForm from '@/paymodes/components/createForm.vue';
import EditForm from '@/paymodes/components/editForm.vue';

const paymodes = ref<Paymode[]>([]);

const getPaymodes = () => {
    axios.get('http://127.0.0.1:8000/api/payModes')
        .then((response) => {
            paymodes.value = response.data;
            console.log(response.data);
        })
        .catch((error) => {
            console.error(error);
        });
}

onMounted(() => {
    getPaymodes()
})

const deleteRegister = (id: number) => {
    axios.delete(`http://127.0.0.1:8000/api/payModes/${id}`)
        .then((response) => {
            paymodes.value = paymodes.value.filter(customer => customer.id !== id);
        })
        .catch((error) => {
            console.error(error);
        });
}


const createModal = ref<InstanceType<typeof Modal>>();

const editModal = ref<InstanceType<typeof Modal>>();
const infoEdit = ref<Paymode>();

const editRegister = (info: Paymode) => {
    infoEdit.value = info;
    editModal.value!.open()
}
    
const update = () => {
    getPaymodes()
    createModal.value?.close()
    editModal.value?.close()
}
</script>