<!-- src/widgets/UserInformation.vue -->
<template>
    <div class="">
        <div class="grid grid-cols-2 gap-4">
            <input class="px-6 py-3 border border-[#BFBFBF] rounded-lg text-[#BFBFBF] font-medium focus:outline-none"
                type="text" placeholder="Логин*" v-model="auth.username">
            <input class="px-6 py-3 border border-[#BFBFBF] rounded-lg text-[#BFBFBF] font-medium focus:outline-none"
                type="text" placeholder="Фамилия*" v-model="auth.first_name">
            <input class="px-6 py-3 border border-[#BFBFBF] rounded-lg text-[#BFBFBF] font-medium focus:outline-none"
                type="text" placeholder="Имя*" v-model="auth.last_name">
            <input class="px-6 py-3 border border-[#BFBFBF] rounded-lg text-[#BFBFBF] font-medium focus:outline-none"
                type="text" placeholder="Отчество*">
            <input
                class="col-span-2 px-6 py-3 border border-[#BFBFBF] rounded-lg text-[#BFBFBF] font-medium focus:outline-none"
                type="email" placeholder="Email*" v-model="auth.email">
            <input
                class="col-span-2 px-6 py-3 border border-[#BFBFBF] rounded-lg text-[#BFBFBF] font-medium focus:outline-none"
                type="password" placeholder="Пароль" v-model="auth.password">
            <input
                class="col-span-2 px-6 py-3 border border-[#BFBFBF] rounded-lg text-[#BFBFBF] font-medium focus:outline-none"
                type="password" placeholder="Повторите пароль" v-model="passwordRepeat">
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


const props = defineProps({
    typeAuth: {
        type: Boolean,
    }
})

const isFocused = ref({
    username: false,
    first_name: false,
    last_name: false,
    email: false,
    password: false,
    passwordRepeat: false,
});

const handleFocus = (event) => {
    isFocused.value[event.target.id] = true;
};

const handleBlur = (event) => {
    if (!event.target.value) {
        isFocused.value[event.target.id] = false;
    }
};

const isFormValid = computed(() => {
    if (!auth.value) return false;

    return auth.value.username.trim() !== '' &&
        auth.value.last_name.trim() !== '' &&
        auth.value.first_name.trim() !== '' &&
        auth.value.email.trim() !== '' &&
        auth.value.password.trim() !== '' &&
        auth.value.password === passwordRepeat.value
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