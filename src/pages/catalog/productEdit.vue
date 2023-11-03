<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { catalogApi } from 'shared/api';
import ContentEditor from 'shared/components/elements/ContentEditor.vue';

const route = useRoute();
const tab = ref('main');
const product = ref();

onMounted(async () => {
  product.value = await catalogApi.getProduct(route.params.code);
});
</script>

<template>
  <q-breadcrumbs class="q-ma-xs">
    <q-breadcrumbs-el icon="home" />
    <q-breadcrumbs-el label="Каталог" />
    <q-breadcrumbs-el label="Товар" />
  </q-breadcrumbs>
  <q-page v-if="product">
    <q-card>
      <q-tabs v-model="tab">
        <q-tab name="main" label="Основные параметры" />
        <q-tab name="price" label="Цена" />
        <q-tab name="attributes" label="Атрибуты" />
        <q-tab name="meta" label="SEO-параметры" />
        <q-tab name="categories" label="Категории" />
        <q-tab name="package" label="Упаковка" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated swipeable>
        <q-tab-panel name="main">
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-input
                filled
                v-model="product.name"
                label="Your name *"
                hint="Name and surname"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Please type something']"
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                filled
                type="number"
                v-model="product.age"
                label="Your age *"
                lazy-rules
                :rules="[
                  val => (val !== null && val !== '') || 'Please type your age',
                  val => (val > 0 && val < 100) || 'Please type a real age'
                ]"
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                filled
                type="number"
                v-model="product.age"
                label="Your age *"
                lazy-rules
                :rules="[
                  val => (val !== null && val !== '') || 'Please type your age',
                  val => (val > 0 && val < 100) || 'Please type a real age'
                ]"
              />
            </div>
          </div>

          <ContentEditor v-model="product.description" height="200" />
        </q-tab-panel>

        <q-tab-panel name="price"></q-tab-panel>

        <q-tab-panel name="attributes"></q-tab-panel>

        <q-tab-panel name="meta"></q-tab-panel>

        <q-tab-panel name="categories"></q-tab-panel>

        <q-tab-panel name="package"></q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>
