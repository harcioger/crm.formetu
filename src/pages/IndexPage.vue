<template>
  <q-page class="row items-center justify-evenly">
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-6">
        <q-input filled v-model="login" label="login *" />
      </div>
      <div class="col-12 col-md-6">
        <q-input filled type="password" v-model="password" label="password *" />
      </div>
    </div>
    <q-btn @click="auth">Login</q-btn>
  </q-page>
</template>

<script lang="ts">
import { Todo, Meta } from 'components/models';
import { defineComponent, ref } from 'vue';
import { catalogApi } from '../shared/api';
import { authApi } from '../shared/api';

export default defineComponent({
  name: 'IndexPage',
  setup() {
    catalogApi.get();
    const todos = ref<Todo[]>([
      {
        id: 1,
        content: 'ct1'
      },
      {
        id: 2,
        content: 'ct2'
      },
      {
        id: 3,
        content: 'ct3'
      },
      {
        id: 4,
        content: 'ct4'
      },
      {
        id: 5,
        content: 'ct5'
      }
    ]);

    const login = ref<string>('');
    const password = ref<string>('');
    const meta = ref<Meta>({
      totalCount: 1200
    });
    const auth = async () => {
      const token = await authApi.login(login.value, password.value);
      console.log(token);
      localStorage.setItem('access_token', token.access_token);
    };
    return { todos, meta, login, password, auth };
  }
});
</script>
