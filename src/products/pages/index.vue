<template>
    <div class="container">
        <div class="d-flex justify-content-between align-items-center">
            <h1>Listado de productos</h1>
            <button v-if="createModal" type="button" class="btn btn-success" @click="createModal.open()">
                <FontAwesomeIcon :icon="faPlus" />
            </button>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Categoría</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(customer, index) in products" :key="index">
                    <th scope="row">{{ customer.id }}</th>
                    <td>{{ customer.name }}</td>
                    <td>{{ customer.price }}</td>
                    <td>{{ customer.stock }}</td>
                    <td>
                        {{categories.find(category => category.id === customer.category_id)?.name}}
                    </td>
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
    <Modal title="Crear producto" ref="createModal">
        <CreateForm @cancel="createModal!.close()" @save="update()" :categories="categories"/>
    </Modal>
    <Modal title="Editar producto" ref="editModal">
        <EditForm @cancel="editModal!.close()" @save="update()" :info="infoEdit!" :categories="categories" />
    </Modal>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Product } from '@/products/types';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTrash, faPencil, faPlus } from '@fortawesome/free-solid-svg-icons'

import Modal from '@/components/Modal.vue';
import CreateForm from '@/products/components/createForm.vue';
import EditForm from '@/products/components/editForm.vue';

const products = ref<Product[]>([]);

const getProducts = () => {
    axios.get('http://127.0.0.1:8000/api/products')
        .then((response) => {
            products.value = response.data;
        })
        .catch((error) => {
            console.error(error);
        });
}

onMounted(() => {
    getProducts()
    getCategories()
})

const deleteRegister = (id: number) => {
    axios.delete(`http://127.0.0.1:8000/api/products/${id}`)
        .then((response) => {
            products.value = products.value.filter(customer => customer.id !== id);
        })
        .catch((error) => {
            console.error(error);
        });
}


const createModal = ref<InstanceType<typeof Modal>>();

const editModal = ref<InstanceType<typeof Modal>>();
const infoEdit = ref<Product>();

const editRegister = (info: Product) => {
    infoEdit.value = info;
    editModal.value!.open()
}
    
const update = () => {
    getProducts()
    createModal.value?.close()
    editModal.value?.close()
}

// Category
import { Category } from '@/categories/types';
import { confirmSucess } from '@/util';

const categories = ref<Category[]>([]);

const getCategories = () => {
    axios.get('http://127.0.0.1:8000/api/categories')
        .then((response) => {
            categories.value = response.data;
            confirmSucess();
        })
        .catch((error) => {
            console.error(error);
        });
}
</script>