<!-- src/widgets/LoginUserInformation.vue -->
<template>
    <div class="flex flex-col bg-white rounded-2xl py-12 px-6 w-[542px] slide-up">
        <h2 class="text-[40px] font-bold">С возвращением!</h2>
        <span class="mt-2 text-xl text-PrimatyDark">Рады снова тебя видеть!</span>
        <div class="flex flex-col mt-8 gap-y-4">
            <div class="flex flex-col w-full">
                <input class="px-6 py-3 rounded-lg border border-[#BFBFBF] font-medium focus:outline-none" type="text"
                    placeholder="Логин*" v-model="authStore.data.user.username"
                    :class="{ 'border-red-500': error.username }">
                <span v-if="error.username" class="text-sm text-red-500">{{ error.username }}</span>
            </div>
            <div class="flex flex-col w-full">
                <div class="flex justify-between items-center px-6 py-3 rounded-lg border border-[#BFBFBF]">
                    <input class="font-medium focus:outline-none" :type="VisiblePassword ? 'text' : 'password'"
                        placeholder="Пароль" v-model="authStore.data.user.password"
                        :class="{ 'border-red-500': error.password }">
                    <button type="button" @click="VisiblePassword = !VisiblePassword">
                        <img :src="VisiblePassword
                            ? '/image/profile/EyeOpen.svg'
                            : '/image/profile/EyeClose.svg'" alt="Toggle visibility">
                    </button>
                </div>
                <span v-if="error.password" class="text-sm text-red-500">{{ error.password }}</span>
            </div>
            <div class="flex items-center">
                <input v-model="rememberMe" type="checkbox" id="rememberMe" name="rememberMe"
                    class="w-5 h-5 mr-2 border-TeriaryDark">
                <label for="rememberMe" class="text-sm text-SecondaryDark">Запомнить меня</label>
            </div>
        </div>
        <button class="mt-5 w-full py-3 bg-[#7B44F2] text-white rounded-lg text-xl font-medium leading-7"
            @click="handleLogin">Войти</button>
        <div class="flex flex-col">
            <button class="mt-2 w-full py-3 text-[#7B44F2] rounded-lg text-xl font-medium leading-7"
                @click="$router.push({ name: 'register' })">Зарегистрироваться</button>
            <button class="mt-4 font-medium text-TeriaryDark">Забыли пароль?</button>
        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/useAuthStore';
import { ref } from 'vue';
import Cookies from 'js-cookie';

const emit = defineEmits(['toggle-auth']);
const authStore = useAuthStore()
const error = ref({
    username: '',
    password: '',
});


const VisiblePassword = ref(false);
const rememberMe = ref(false);

const validateForm = () => {
    error.value = {
        username: !authStore.data.user.username.trim() ? 'Введите логин' : '',
        password: !authStore.data.user.password.trim() ? 'Введите пароль' : '',
    }

    return !error.value.username && !error.value.password
}

defineProps({
    typeAuth: {
        type: Boolean,
    }
})

const handleLogin = async () => {
    if (!validateForm()) return;
    try {
        const result = await authStore.login(rememberMe.value);
        if (result.success) {
            authStore.checkAuth()
        } else {
            console.error(result.message);
        }
    } catch (error) {
        console.error(error);
    }


}
</script>