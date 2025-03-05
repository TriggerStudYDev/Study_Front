<template>
    <div class="flex flex-col items-center justify-center min-h-screen">
        <h1 class="text-4xl font-semibold mb-4">🎉 Регистрация завершена!</h1>
        <p class="text-lg mb-8">Вы успешно отправили анкету!</p>
        <button class="px-8 py-3 bg-black text-white rounded-lg text-xl font-medium" @click="goToLogin">
            Перейти к входу
        </button>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/useAuthStore';

const router = useRouter();
const authStore = useAuthStore();

const goToLogin = () => {
    authStore.resetRegistration();
    router.push({ name: 'login' });
};
</script>