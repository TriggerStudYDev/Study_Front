<!-- src/widgets/UserInformation.vue -->
<template>
    <div class="">
        <div class="grid grid-cols-2 gap-4">
            <input class="px-6 py-3 border border-[#BFBFBF] rounded-lg text-[#BFBFBF] font-medium focus:outline-none"
                :class="{ 'border-red-500': errors.username }" type="text" placeholder="Логин*" v-model="auth.username">
            <input class="px-6 py-3 border border-[#BFBFBF] rounded-lg text-[#BFBFBF] font-medium focus:outline-none"
                :class="{ 'border-red-500': errors.last_name }" type="text" placeholder="Имя*" v-model="auth.last_name">
            <input
                class="col-span-2 px-6 py-3 border border-[#BFBFBF] rounded-lg text-[#BFBFBF] font-medium focus:outline-none"
                :class="{ 'border-red-500': errors.first_name }" type="text" placeholder="Фамилия*"
                v-model="auth.first_name">
            <div class="col-span-2">
                <input
                    class="w-full px-6 py-3 border border-[#BFBFBF] rounded-lg text-[#BFBFBF] font-medium focus:outline-none"
                    :class="{ 'border-red-500': errors.email }" type="email" placeholder="Email*" v-model="auth.email"
                    @input="errors.email = false">
                <span v-if="errors.email" class="text-red-500 text-sm mt-1">Введите корректный email</span>
            </div>
            <div class="col-span-2">
                <input
                    class="w-full px-6 py-3 border border-[#BFBFBF] rounded-lg text-[#BFBFBF] font-medium focus:outline-none"
                    :class="{ 'border-red-500': errors.password }" type="password" placeholder="Пароль*"
                    v-model="auth.password">
                <span v-if="errors.password" class="text-red-500 text-sm mt-1">Введите пароль</span>
            </div>
            <div class="col-span-2">
                <input
                    class="w-full px-6 py-3 border border-[#BFBFBF] rounded-lg text-[#BFBFBF] font-medium focus:outline-none"
                    :class="{ 'border-red-500': errors.password_repeat }" type="password"
                    placeholder="Повторите пароль*" v-model="passwordRepeat">
                <span v-if="errors.password_repeat" class="text-red-500 text-sm mt-1">Пароли не совпадают</span>
            </div>
        </div>
        <div class="mt-4">
            <h3 class="text-PrimaryDark text-2xl font-medium">Укажи удобный способ связи</h3>
            <p class="text-LightDark mt-2 leading-5">Добавь Telegram или ВКонтакте. Мы напишем только в случае вопросов
                по заказу.
                Чем
                больше контактов, тем
                проще связаться!</p>
        </div>
        <div class="flex gap-x-3 mt-4">
            <socialMedia @click="openModal('telegram')">
                <template #image>
                    <img src="/image/auth/telegram.svg" alt="socialMedia">
                </template>
                <template #title>
                    <h4 class="text-[#29A9EB] text-xl font-medium">Telegram</h4>
                </template>
            </socialMedia>
            <socialMedia @click="openModal('vk')">
                <template #image>
                    <img src="/image/auth/vk.svg" alt="socialMedia">
                </template>
                <template #title>
                    <h4 class="text-[#0077FF] text-xl font-medium">ВКонтакте</h4>
                </template>
            </socialMedia>
        </div>
        <BoxingCheckForReg class="mt-4" v-model:isChecked="isAgreementChecked">
            <p class="text-sm">Принимаю <span class="text-AccentViolet">Пользовательское соглашение, политику
                    конфиденциальности
                    и
                    политику
                    использования файлов
                    cookie.</span>
            </p>
        </BoxingCheckForReg>
    </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/useAuthStore';
import { useModalStore } from '@/stores/useModalStore';
import { computed, watchEffect, ref, watch } from 'vue';
import socialMedia from '@/components/sign-in/widgets/SocialMedia.vue';
import BoxingCheckForReg from '@/ui/BoxingCheckForReg.vue';

const emit = defineEmits(['update:isValid', 'next-step', 'prev-step', 'toggle-auth', 'open-modal']);
const authStore = useAuthStore();
const auth = computed(() => authStore.data.user);
const isDataLoaded = ref(false);
const passwordRepeat = ref('');
const isAgreementChecked = ref(false);
const modalStore = useModalStore();
const { openModal } = modalStore;
const errors = ref({
    username: '',
    last_name: '',
    first_name: '',
    email: '',
    password: '',
    password_repeat: '',
    vk_profile: '',
    telegram_username: '',
    boxChecking: '',
})

const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

const validateForm = () => {
    errors.value = {
        username: !auth.value.username.trim() ? 'Введите имя пользователя' : '',
        last_name: !auth.value.last_name.trim() ? 'Введите фамилию' : '',
        first_name: !auth.value.first_name.trim() ? 'Введите имя' : '',
        email: !validateEmail(auth.value.email) ? 'Введите корректный email' : '',
        password: !auth.value.password.trim() ? 'Введите пароль' : '',
        password_repeat: auth.value.password !== passwordRepeat.value ? 'Пароли не совпадают' : '',
        vk_profile: !authStore.data.profile.vk_profile ? 'Введите ссылку на ваш профиль в VK' : '',
        telegram_username: !authStore.data.profile.telegram_username ? 'Введите ваш ник в Telegram' : '',
    }

    return !Object.values(errors.value).some(error => error);
};

defineExpose({ validateForm });


const props = defineProps({
    typeAuth: {
        type: Boolean,
    }
})

const isFormValid = computed(() => {
    if (!auth.value) return false;

    return auth.value.username.trim() !== '' &&
        auth.value.last_name.trim() !== '' &&
        auth.value.first_name.trim() !== '' &&
        auth.value.email.trim() !== '' &&
        auth.value.password.trim() !== '' &&
        auth.value.password === passwordRepeat.value &&
        isAgreementChecked.value &&
        authStore.data.profile.vk_profile !== '' &&
        authStore.data.profile.telegram_username !== '';
});

watchEffect(() => {
    if (isDataLoaded.value) emit('update:isValid', isFormValid.value);
});

watchEffect(() => {
    if (auth.value) {
        isDataLoaded.value = true;
    }
});
watch(isFormValid, (newVal) => {
    emit('update:isValid', Boolean(newVal));
});
</script>

<style scoped>
.floating-label {
    transform: translateY(-0.9rem) scale(0.8);
    padding: 0 4px;
    left: 10px !important;
}
</style>