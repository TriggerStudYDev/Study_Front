<!-- src/widgets/LoginUserInformation.vue -->
<template>
    <div class="flex flex-col justify-center items-center bg-white rounded-2xl p-4">
        <h2 class="text-[36px] font-semibold">С возвращением!</h2>
        <div class="flex flex-col gap-y-4 mt-6">
            <input class="w-[356px] px-6 py-3 bg-[#D9D9D9] rounded-lg text-[#8C8C8E] font-medium focus:outline-none"
                type="text" placeholder="Логин*" v-model="authStore.data.user.username">
            <input class="w-[356px] px-6 py-3 bg-[#D9D9D9] rounded-lg text-[#8C8C8E] font-medium focus:outline-none"
                type="password" placeholder="Пароль" v-model="authStore.data.user.password">
        </div>
        <button class="mt-5 w-full py-3 bg-black text-white rounded-lg text-xl font-medium leading-7"
            @click="handleLogin">Войти</button>
        <div class="flex flex-col gap-y-4">
            <button @click="$router.push({ name: 'register' })">Зарегестрироваться</button>
            <button class="text-[#8C8C8E] text-xl font-medium">Забили пароль?</button>
        </div>
    </div>
</template>

<script setup>
import ForgotThePassword from '@/ui/ForgotThePassword.vue';
import { useAuthStore } from '@/stores/useAuthStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const emit = defineEmits(['toggle-auth']);
const authStore = useAuthStore()

defineProps({
    typeAuth: {
        type: Boolean,
    }
})

const handleLogin = async () => {
    try {
        const result = await authStore.login();
        if (result.success) {
            authStore.checkAuth()
            router.push({ name: 'home' })
        } else {
            console.error(result.message);
        }
    } catch (error) {
    }


}
</script>