<template>
  <div class="container d-flex justify-content-center flex-wrap gap-3">

    <div v-for="card in cards" class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">{{ card.title }}</h5>
        <p class="card-text">{{ card.text }}</p>
        <div class="d-flex justify-content-end">
          <router-link :to="card.link">
            <a href="#" class="btn btn-primary">Ir</a>
          </router-link>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
interface Card {
  title: string;
  text: string;
  link: string;
}

const cards: Card[] = [
  {
    title: 'Compradores',
    text: 'Aquí se pueden gestionar los compradores.',
    link: '/customers',
  },
  {
    title: 'Metodos de pago',
    text: 'Aquí se pueden gestionar los metodos de pago.',
    link: '/paymodes',
  },
  {
    title: 'Categorías',
    text: 'Aquí se pueden gestionar las categorías.',
    link: '/categories',
  },
  {
    title: 'Productos',
    text: 'Aquí se pueden gestionar los productos.',
    link: '/products',
  },
];
</script>