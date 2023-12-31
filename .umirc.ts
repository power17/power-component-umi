import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'power组件系统',
  },

  routes: [
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        {
          path: '/',
          redirect: '/home',
        },
        {
          name: '',
          path: '/home',
          component: './Home',
        },
        {
          name: '权限演示',
          path: '/access',
          component: './Access',
        },
        {
          name: ' CRUD 示例',
          path: '/table',
          component: './Table',
        },
        {
          name: ' detail 示例',
          path: '/detail',
          component: './Detail',
        },
      ],
    },
  ],
  npmClient: 'pnpm',
});
