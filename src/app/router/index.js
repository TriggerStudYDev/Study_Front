// src/app/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/useAuthStore";

const authRoutes = [
  {
    path: "/auth",
    component: () => import("@/layout/AuthLayout.vue"),
    children: [
      {
        name: "register",
        path: "register",
        component: () => import("@/pages/sign-in/RegisterForm.vue"),
        meta: { requiresGuest: true, requiresAuthCheck: true },
      },
      {
        name: "login",
        path: "login",
        component: () => import("@/pages/sign-in/AuthorizationForm.vue"),
        meta: { requiresGuest: true, requiresVerificationCheck: true },
      },
    ],
  },
];

const settingProfile = [
  {
    path: "/settingProfile",
    component: () => import("@/layout/ProfileSettingLayout.vue"),
    children: [
      {
        name: "sending-questionnaire",
        path: "sending-questionnaire",
        component: () =>
          import(
            "@/components/sign-in/register/SettignProfile/SendingQuestionnaire.vue"
          ),
        meta: { requiresApproval: true },
      },
      {
        name: "success-questionnaire",
        path: "success-questionnaire",
        component: () =>
          import(
            "@/components/sign-in/register/SettignProfile/SuccessfulQuestionnaire.vue"
          ),
        meta: { requiresApproval: true },
      },
      {
        name: "edit-questionnaire",
        path: "edit-questionnaire",
        component: () => import("@/pages/sign-in/EditQuestionnaire.vue"),
        children: [
          {
            path: "",
            redirect: { name: "questionnaire" },
          },
          {
            name: "feedback",
            path: "feedback",
            component: () =>
              import(
                "@/components/sign-in/register/EditQuestionnaire/FeedBack/Feedback.vue"
              ),
          },
          {
            name: "questionnaire",
            path: "questionnaire",
            component: () =>
              import(
                "@/components/sign-in/register/EditQuestionnaire/Questionnaire.vue"
              ),
          },
          {
            name: "history",
            path: "history",
            component: () =>
              import(
                "@/components/sign-in/register/EditQuestionnaire/History/History.vue"
              ),
          },
        ],
      },
      {
        name: "unshaked-questionnaire",
        path: "unshaked-questionnaire",
        component: () =>
          import(
            "@/components/sign-in/register/SettignProfile/UnshakedQuestionnaire.vue"
          ),
        meta: { requiresRejection: true },
      },
      {
        name: "expectation-questionnaire",
        path: "expectation-questionnaire",
        component: () =>
          import(
            "@/components/sign-in/register/SettignProfile/ExpectationQuestionnaire.vue"
          ),
        meta: { requiresRejection: true },
      },
    ],
  },
];

// const editQuestionnaire = [
//   {
//     path: "/edit-questionnaire",
//     component: () => import("@/pages/sign-in/EditQuestionnaire.vue"),
//     children: [
//       {
//         path: "",
//         redirect: { name: "questionnaire" },
//       },
//       {
//         name: "feedback",
//         path: "feedback",
//         component: () =>
//           import(
//             "@/components/sign-in/register/EditQuestionnaire/feedback.vue"
//           ),
//       },
//       {
//         name: "questionnaire",
//         path: "questionnaire",
//         component: () =>
//           import(
//             "@/components/sign-in/register/EditQuestionnaire/Questionnaire.vue"
//           ),
//       },
//       {
//         name: "history",
//         path: "history",
//         component: () =>
//           import("@/components/sign-in/register/EditQuestionnaire/History.vue"),
//       },
//     ],
//   },
// ];

const adminRoutes = [
  {
    path: "adminPanel",
    meta: { requiresAdmin: true },
    children: [
      {
        path: "",
        component: () => import("@/pages/admin/AdminPages.vue"),
        children: [
          {
            path: "",
            component: () => import("@/components/admin/pages/Alllist.vue"),
          },
          {
            path: "all",
            component: () => import("@/components/admin/pages/Alllist.vue"),
          },
          {
            path: "accepted",
            component: () =>
              import("@/components/admin/pages/AcceptedList.vue"),
          },
          {
            path: "rejectedSb",
            component: () =>
              import("@/components/admin/pages/RejectedbySBList.vue"),
          },
          {
            path: "check",
            component: () =>
              import("@/components/admin/pages/AtTheCheckList.vue"),
          },
          {
            path: "refinement",
            component: () =>
              import("@/components/admin/pages/ForRefinementList.vue"),
          },
          {
            path: "performerRejected",
            component: () =>
              import("@/components/admin/pages/PerformerRejectedList.vue"),
          },
        ],
      },
    ],
  },
];

const orderRoutes = [
  {
    path: "myBegunOrder",
    children: [
      {
        path: "",
        component: () => import("@/pages/order/MyOrdersPages.vue"),
      },
    ],
  },
  {
    path: "/listOrders",
    children: [
      {
        path: "",
        component: () => import("@/pages/order/ListOrdersPages.vue"),
      },
    ],
  },
  {
    path: "/orderPage/:id",
    children: [
      {
        name: "orderPage",
        path: "",
        component: () => import("@/pages/order/OrderPages.vue"),
        props: true,
        children: [
          {
            name: "order-details",
            path: "order",
            component: () => import("@/components/opder/OrderPagesHeader.vue"),
            props: true,
          },
          {
            name: "order-examination",
            path: "examination",
            component: () =>
              import("@/components/opder/ExaminationOrderHeader.vue"),
            props: true,
          },
          {
            name: "order-editing",
            path: "editing",
            component: () => import("@/components/opder/OrderPagesEditing.vue"),
            props: true,
          },
        ],
      },
    ],
  },
  {
    path: "/myReviews",
    children: [
      {
        path: "",
        component: () => import("@/pages/order/MyReviewsPages.vue"),
      },
    ],
  },
];

const profileRoutes = [
  {
    path: "/account",
    children: [
      {
        name: "Account",
        path: "",
        component: () => import("@/pages/profile/PersonalAccountPages.vue"),
      },
    ],
  },
  {
    path: "/customerProfile/:id",
    children: [
      {
        name: "customerProfile",
        path: "",
        component: () => import("@/pages/profile/CustomerProfilePages.vue"),
        props: true,
      },
    ],
  },
  {
    path: "/messages/:id",
    children: [
      {
        name: "customerProfile-messages",
        path: "",
        component: () =>
          import("@/pages/profile/CustomerProfileMessagePages.vue"),
        props: true,
      },
    ],
  },
];

const communitiesRoutes = [
  {
    path: "/communities",
    children: [
      {
        name: "communities",
        path: "",
        component: () => import("@/pages/communities/CommunitiesPages.vue"),
      },
    ],
  },
  {
    path: "/communitiesCreate",
    children: [
      {
        name: "communities-create",
        path: "",
        component: () =>
          import("@/pages/communities/CreateCommunitiesPages.vue"),
      },
    ],
  },
  {
    path: "/communitiesList",
    children: [
      {
        name: "communities-list",
        path: "",
        component: () => import("@/pages/communities/CommunitiesListPages.vue"),
      },
    ],
  },
  {
    path: "/communitiesPage/:id",
    children: [
      {
        name: "communities-page",
        path: "",
        component: () =>
          import("@/pages/communities/CommunityDetailedPages.vue"),
        props: true,
      },
    ],
  },
];

const routes = [
  {
    path: "/",
    component: () => import("@/layout/DefaultLayout.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "home",
        redirect: "/account",
      },
      ...adminRoutes,
      ...orderRoutes,
      ...profileRoutes,
      ...communitiesRoutes,
    ],
  },
  ...authRoutes,
  ...settingProfile,
  {
    path: "/404",
    name: "404",
    component: () => import("@/pages/sign-in/ForbiddenPages.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

const checkRole = (allowedRoles, userRole) => {
  return allowedRoles.includes(userRole);
};

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  authStore.checkAuth();

  if (to.meta.requiresAuth && !authStore.isAuth) {
    next({ name: "login" });
    return;
  }

  if (to.meta.requiresGuest && authStore.isAuth) {
    next({ name: "home" });
    return;
  }

  if (to.name === "register-success" && !authStore.isRegistered) {
    next({ name: "register" });
    return;
  }

  if (
    to.meta.requiresAdmin &&
    !checkRole(["администратор", "проверяющий"], authStore.userRole)
  ) {
    next("/404");
    return;
  }

  next();
});

export default router;
