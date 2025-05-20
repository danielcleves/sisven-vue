<template>
    <div class="container">
        <div class="d-flex justify-content-between align-items-center">
            <h1>Listado de categorías</h1>
            <button v-if="createModal" type="button" class="btn btn-success" @click="createModal.open()">
                <FontAwesomeIcon :icon="faPlus" />
            </button>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(category, index) in categories" :key="index">
                    <th scope="row">{{ category.id }}</th>
                    <td>{{ category.name }}</td>
                    <td>{{ category.description }}</td>
                    <td class="d-flex justify-content-evenly gap-2">
                        <button type="button" class="btn btn-danger" @click="deleteRegister(category.id)">
                            <i class="fa fa-trash" aria-hidden="true"></i>
                            <FontAwesomeIcon :icon="faTrash" />
                        </button>
                        <button v-if="editModal" type="button" class="btn btn-warning" @click="editRegister(category)">
                            <FontAwesomeIcon :icon="faPencil" />
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <Modal title="Crear categoría" ref="createModal">
        <CreateForm @cancel="createModal!.close()" @save="update()" />
    </Modal>
    <Modal title="Editar categoría" ref="editModal">
        <EditForm @cancel="editModal!.close()" @save="update()" :info="infoEdit!"/>
    </Modal>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Category } from '@/categories/types';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTrash, faPencil, faPlus } from '@fortawesome/free-solid-svg-icons'

import Modal from '@/components/Modal.vue';
import CreateForm from '@/categories/components/createForm.vue';
import EditForm from '@/categories/components/editForm.vue';
import { confirmSucess } from '@/util';

const categories = ref<Category[]>([]);

const getCategories = () => {
    axios.get('http://127.0.0.1:8000/api/categories')
        .then((response) => {
            categories.value = response.data;
        })
        .catch((error) => {
            console.error(error);
        });
}

onMounted(() => {
    getCategories()
})

const deleteRegister = (id: number) => {
    axios.delete(`http://127.0.0.1:8000/api/categories/${id}`)
        .then((response) => {
            categories.value = categories.value.filter(category => category.id !== id);
            confirmSucess();
        })
        .catch((error) => {
            console.error(error);
        });
}


const createModal = ref<InstanceType<typeof Modal>>();

const editModal = ref<InstanceType<typeof Modal>>();
const infoEdit = ref<Category>();

const editRegister = (info: Category) => {
    infoEdit.value = info;
    editModal.value!.open()
}
    
const update = () => {
    getCategories()
    createModal.value?.close()
    editModal.value?.close()
}
</script>