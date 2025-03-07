<!-- src/widgets/LoginUserInformation.vue -->
<template>
    <div class="flex flex-col bg-white rounded-2xl pt-8 px-6 pb-6 w-[542px] slide-up">
        <h2 class="text-[36px] font-semibold">С возвращением!</h2>
        <span class="text-PrimatyDark text-xl mt-2">Рады снова тебя видеть!</span>
        <div class="flex flex-col gap-y-4 mt-8">
            <input class="px-6 py-3 rounded-lg border border-[#BFBFBF] font-medium focus:outline-none" type="text"
                placeholder="Логин*" v-model="authStore.data.user.username">
            <input class="px-6 py-3 rounded-lg border border-[#BFBFBF] font-medium focus:outline-none" type="password"
                placeholder="Пароль" v-model="authStore.data.user.password">
        </div>
        <button class="mt-5 w-full py-3 bg-[#7B44F2] text-white rounded-lg text-xl font-medium leading-7"
            @click="handleLogin" :disabled="!isValid">Войти</button>
        <div class="flex flex-col">
            <button class="mt-2 w-full py-3 text-[#7B44F2] rounded-lg text-xl font-medium leading-7"
                @click="$router.push({ name: 'register' })">Зарегестрироваться</button>
            <button class="text-TeriaryDark font-medium mt-4">Забили пароль?</button>
        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/useAuthStore';
import { computed } from 'vue';

const emit = defineEmits(['toggle-auth']);
const authStore = useAuthStore()

defineProps({
    typeAuth: {
        type: Boolean,
    }
})

const isValid = computed(() => {
    return authStore.data.user.username.trim() !== '' &&
        authStore.data.user.password.trim() !== '';
})



const handleLogin = async () => {
    try {
        if (isValid.value) {
            const result = await authStore.login();
            if (result.success) {
                authStore.checkAuth()
            } else {
                console.error(result.message);
            }
        }
    } catch (error) {
    }


}
</script>