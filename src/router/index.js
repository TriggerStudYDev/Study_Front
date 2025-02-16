import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/account',
    },
    {
      path: '/myBegunOrder',
      component: () => import('@/pages/MyOrdersPages.vue'),
    },
    {
      path: '/listOrders',
      component: () => import('@/pages/ListOrdersPages.vue'),
    },
    {
      name: 'Account',
      path: '/account',
      component: () => import('@/pages/PersonalAccountPages.vue'),
    },
    {
      name: 'communities',
      path: '/communities',
      component: () => import('@/pages/CommunitiesPages.vue'),
    },
    {
      name: 'communities-create',
      path: '/communitiesCreate',
      component: () => import('@/pages/CreateCommunitiesPages.vue'),
    },
    {
      name: 'communities-list',
      path: '/communitiesList',
      component: () => import('@/pages/CommunitiesListPages.vue'),
    },
    {
      name: 'communities-page',
      path: '/communitiesPage/:id',
      component: () => import('@/pages/CommunityDetailedPages.vue'),
      props: true
    },
    {
      name: 'register',
      path: '/register',
      component: () => import('@/pages/RegisterPages.vue'),
    },
    {
      name: 'orderPage',
      path: '/orderPage/:id', 
      component: () => import('@/pages/OrderPages.vue'),
      props: true,
      children: [
        {
          name: 'order-details',
          path: 'order', 
          component: () => import('@/components/OrderPagesOrder.vue'),
          props: true
        },
        {
          name: 'order-examination', 
          path: 'examination',
          component: () => import('@/components/OrderPagesExamination.vue'),
          props: true
        },
        {
          name: 'order-editing', 
          path: 'editing',
          component: () => import('@/components/OrderPagesEditing.vue'),
          props: true
        }
      ]
    },
    {
      name: 'myReviews',
      path: '/myReviews',
      component: () => import('@/pages/MyReviewsPages.vue')
    },
    {
      name: 'customerProfile',
      path: '/customerProfile/:id',
      component: () => import('@/pages/CustomerProfilePages.vue'),
      props: true,
    },
    {
      name: 'customerProfile-messages',
      path: '/messages/:id',
      component: () => import('@/pages/CustomerProfileMessagePages.vue'),
      props: true,
    },
    {
      path: '/adminPanel',
      component: () => import('@/pages/AdminPages.vue'),
      children: [
        {
          path: '',
          component: () => import('@/components/Alllist.vue'),
        },
        {
          path: 'all',
          component: () => import('@/components/Alllist.vue'),
        },
        {
          path: 'postponed',
          component: () => import('@/components/PostponedList.vue')
        },
        {
          path: 'new',
          component: () => import('@/components/NewList.vue')
        }
      ]
    }
  ],

  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
