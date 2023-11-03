<script setup lang="ts">
import { ref } from 'vue';
import { catalogApi } from 'src/shared/api';

interface Image {
  file: string;
  name?: string;
  title?: string;
}

const props = defineProps({
  code: {
    type: Number,
    requred: true
  }
});

const loading = ref<boolean>(false);
const show = ref<boolean>(false);
const images = ref<Array<Image>>([]);
const slide = ref();

const onOpen = async () => {
  if (!props.code) return;

  loading.value = true;

  try {
    images.value = await catalogApi.getProductImages(props.code);
    slide.value = 0;
    show.value = true;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <q-btn
    flat
    round
    color="primary"
    icon="photo_camera"
    size="xs"
    :loading="loading"
    @click="onOpen"
  />
  <q-dialog v-model="show">
    <q-card style="width: 800px">
      <q-card-section>
        <q-carousel animated v-model="slide" arrows navigation infinite>
          <q-carousel-slide
            v-for="(image, index) in images"
            :name="index"
            :key="image.file"
            :img-src="`https://crm.formetu.ru/${image.file}`"
          />
        </q-carousel>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
