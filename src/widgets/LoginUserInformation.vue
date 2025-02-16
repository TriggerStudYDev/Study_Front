<!-- src/widgets/LoginUserInformation.vue -->
<template>
    <div class="flex flex-col justify-center items-center">
        <h2 class="text-[36px] font-semibold">С возвращением!</h2>
        <div class="flex flex-col gap-y-4 mt-6">
            <input class="w-[356px] px-6 py-3 bg-[#D9D9D9] rounded-lg text-[#8C8C8E] font-medium focus:outline-none"
                type="text" placeholder="Логин*">
            <input class="w-[356px] px-6 py-3 bg-[#D9D9D9] rounded-lg text-[#8C8C8E] font-medium focus:outline-none"
                type="password" placeholder="Пароль">
        </div>
        <button class="mt-5 w-full py-3 bg-black text-white rounded-lg text-xl font-medium leading-7">Войти</button>
        <div class="flex flex-col gap-y-4">
            <ForgotThePassword :typeAuth="typeAuth" @toggle-auth="$emit('toggle-auth')" />
            <button class="text-[#8C8C8E] text-xl font-medium">Забили пароль?</button>
        </div>
    </div>
</template>

<script setup>
import ForgotThePassword from '@/ui/ForgotThePassword.vue';

const emit = defineEmits(['toggle-auth']);

const props = defineProps({
    typeAuth: {
        type: Boolean,
    }
})
</script>