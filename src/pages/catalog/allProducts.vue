<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { format } from 'date-fns';
import { catalogApi } from 'shared/api';
import { formatCurrency } from 'shared/utils/formatCurrency';
import CardImages from 'components/products/CardImages.vue';

const tab = ref('simple');
const columns = [
  { label: 'Код товара', name: 'code', field: 'code', align: 'center' },
  { label: '', name: 'has_images', field: 'has_images' },
  { label: 'Название', name: 'name', field: 'name', align: 'left' },
  {
    label: 'РРЦ',
    name: 'price_rrc',
    field: 'price_rrc',
    align: 'center',
    format: val => formatCurrency(val)
  },
  {
    label: 'Цена',
    name: 'price',
    field: 'price',
    align: 'center',
    format: val => formatCurrency(val)
  },
  {
    label: '%',
    name: 'dealer_discount',
    field: 'dealer_discount',
    align: 'center',
    tooltip: 'Дилерская скидка %'
  },
  {
    label: 'ЗЦ',
    name: 'purchase_price',
    field: 'purchase_price',
    align: 'center',
    tooltip: 'Закупочная цена',
    format: val => formatCurrency(val)
  },
  {
    label: 'Изменено',
    name: 'updated_at',
    field: 'updated_at',
    align: 'center',
    format: val => format(new Date(val), 'yyyy-MM-dd HH:mm')
  },
  { label: 'Порядок', name: 'order', field: 'order', align: 'center' },
  { label: 'SEO', name: 'meta_error', field: 'meta_error', align: 'center' },
  { name: 'actions', label: '', field: '', align: 'center', style: 'width: 100px' }
];
const filterItems = [
  { value: 'meta_error', label: 'Ошибки СЕО' },
  { value: 'price_error', label: 'Ошибки цены поставщика' },
  { value: 'dimension_error', label: 'Ошибки ВГХ' },
  { value: 'vendor_empty', label: 'Не указан поставщик' },
  { value: 'brand_empty', label: 'Не указан бренд' },
  { value: 'images_empty', label: 'Нет изображений' }
];
const filter = ref(null);
const products = ref([]);

const savePrice = val => {
  console.log(val);
};
const onEdit = row => {
  console.log(row);
};
const onDelete = row => {
  console.log(row);
};

onMounted(async () => {
  const resp = await catalogApi.get();
  products.value = resp.data;
});
</script>

<template>
  <q-page>
    <q-card class="row items-center justify-between" flat color="white">
      <q-select :options="filterItems" v-model="filter" label="Фильтр"></q-select>
      <q-space></q-space>
      <q-input append-icon="search" label="Поиск" single-line hide-details></q-input>
    </q-card>

    <q-card>
      <q-tabs v-model="tab">
        <q-tab name="simple" label="Простые товары" />
        <q-tab name="secondGrade" label="Товары второго сорта" />
        <q-tab name="set" label="Наборы" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated swipeable>
        <q-tab-panel name="simple">
          <q-table
            class="my-sticky-header-table"
            flat
            bordered
            :rows="products"
            :columns="columns"
            separator="cell"
            wrap-cells
            row-key="name"
            :rows-per-page-options="[50, 100, 200]"
            rows-per-page-label="100"
          >
            <template v-slot:top="props">
              <q-space />
              <q-btn
                flat
                round
                dense
                :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                @click="props.toggleFullscreen"
                class="q-ml-md"
              />
            </template>

            <template v-slot:header-cell="props">
              <q-th :props="props">
                <q-tooltip v-if="props.col.tooltip">
                  {{ props.col.tooltip }}
                </q-tooltip>
                {{ props.col.label }}
              </q-th>
            </template>

            <template v-slot:body-cell-has_images="props">
              <q-td :props="props">
                <CardImages v-if="props.row.has_images" :code="props.row.code" />
              </q-td>
            </template>

            <template v-slot:body-cell-price_rrc="props">
              <q-td :props="props">
                {{ props.row.price_rrc }}
                <q-popup-edit
                  v-model="props.row.price_rrc"
                  v-slot="scope"
                  buttons
                  label-set="Ок"
                  label-cancel="Отмена"
                  @save="savePrice"
                >
                  <q-input
                    type="number"
                    v-model="scope.value"
                    dense
                    autofocus
                    @keyup.enter="scope.set"
                  />
                </q-popup-edit>
              </q-td>
            </template>

            <template v-slot:body-cell-actions="props">
              <q-td :props="props">
                <div class="q-gutter-sm">
                  <q-btn
                    flat
                    round
                    color="primary"
                    icon="edit"
                    size="xs"
                    @click="onEdit(props.row)"
                  ></q-btn>
                  <q-btn
                    flat
                    round
                    color="red"
                    icon="delete"
                    size="xs"
                    @click="onDelete(props.row)"
                  ></q-btn>
                </div>
              </q-td>
            </template>
          </q-table>
        </q-tab-panel>

        <q-tab-panel name="secondGrade"></q-tab-panel>

        <q-tab-panel name="set"></q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<style>
.my-sticky-header-table.fullscreen {
  max-height: 100svh;
}
.my-sticky-header-table .q-table__top,
.my-sticky-header-table .q-table__bottom,
.my-sticky-header-table thead tr:first-child th {
  background-color: #ededed;
}
.my-sticky-header-table thead tr th {
  position: sticky;
  z-index: 1;
}
.my-sticky-header-table thead tr:first-child th {
  top: 0;
}
.my-sticky-header-table.q-table--loading thead tr:last-child th {
  top: 48px;
}
.my-sticky-header-table tbody {
  scroll-margin-top: 48px;
}
</style>
