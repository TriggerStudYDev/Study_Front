<template>
    <div class="bg-[#D9D9D9] py-5 px-10 flex justify-between items-center">
        <button>
            <router-link class="text-3xl font-semibold text-black uppercase" to="/">Logo</router-link>
        </button>
        <div class="flex gap-x-8" v-if="authStore.isAuth">
            <router-link class="uppercase" to="/myBegunOrder"
                :class="route.path === '/myBegunOrder' ? 'text-[#8C8C8E]' : ''">Мои заказы</router-link>
            <router-link class="uppercase" to="/myReviews"
                :class="route.path === '/myReviews' ? 'text-[#8C8C8E]' : ''">Мои отзывы</router-link>
            <router-link class="uppercase" to="/communities"
                :class="route.path === '/communities' ? 'text-[#8C8C8E]' : ''">Сообщество</router-link>
            <router-link class="uppercase" to="/auction"
                :class="route.path === '/auction' ? 'text-[#8C8C8E]' : ''">Аукцион</router-link>
            <router-link v-if="['администратор', 'проверяющий'].includes(authStore.userRole)" class="uppercase"
                to="/adminPanel" :class="route.path === '/adminPanel' ? 'text-[#8C8C8E]' : ''">
                Admin
            </router-link>
            <button @click="authStore.logout">Выход</button>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/useAuthStore';


const route = useRoute();
const authStore = useAuthStore();
</script>