<template>
    <div class="inset-0 z-50 backface-hidden">
        <div class="max-w-[542px] mx-auto bg-white rounded-3xl p-6 slide-up">
            <div class="flex flex-col justify-center">
                <div class="mt-6">
                    <h2 class="text-[40px] leading-[52px] font-bold text-[#171717]">{{ pageContent[countPages].title
                    }}</h2>
                    <p class="text-[#171717] text-xl mt-2">{{ pageContent[countPages].description }}</p>
                </div>
                <div class="flex flex-col w-full mt-8">
                    <CountPageRegister class="mx-auto" :countPages="countPages" />
                    <component :typeAuth="typeAuth" @toggle-auth="$emit('toggle-auth')" class="mt-8"
                        :is="currentComponent" ref="currentForm" @next-step="nextPage" @prev-step="prevStep"
                        @update:isValid="isValid = $event" @file-selected="handleFileSelected"
                        @open-modal="$emit('open-modal')" />
                </div>
                <div class="flex flex-col mt-10 gap-x-4">
                    <button class="px-8 py-3 text-xl font-medium leading-7 text-white rounded-lg bg-AccentViolet"
                        @click="handleClick">
                        {{ countPages === 3 ? 'Готово' : 'Продолжить' }}
                    </button>
                    <button class="px-8 py-3 mt-2 text-xl font-medium leading-7 bg-white rounded-lg text-AccentViolet"
                        @click="handleClickLogin">{{ countPages === 1 ? 'Войти в аккаунт' : 'Назад' }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import UserInformation from '@/components/sign-in/register/UserInformation.vue';
import StudentСard from '@/components/sign-in/register/StudentСard.vue';
import RegistrationSummary from '@/components/sign-in/register/RegistrationSummary.vue';
import CountPageRegister from '@/ui/CountPageRegister.vue';
import { useAuthStore } from '@/stores/useAuthStore';
import { onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const countPages = ref(1);
const isValid = ref(false);
const authStore = useAuthStore();
const currentForm = ref(null);


const pageContent = {
    1: {
        title: "Круто, что ты с нами!",
        description: "После этого шага тебе нужно будет указать информацию о вузе и добавить портфолио. Дождись проверки анкеты — и ты в деле!"
    },
    2: {
        title: "Расскажи, про ВУЗ!",
        description: "Укажи, где ты учишься, на каком курсе и факультете."
    },
    3: {
        title: "Продемонстрируй свои навыки!",
        description: "Добавь портфолио или отзывы клиентов. Это твой шанс выделиться и привлечь больше заказов."
    }
};

const props = defineProps({
    typeAuth: {
        type: Boolean,
    }
});

const emit = defineEmits(['toggle-auth', 'registration-success']);
emit('registration-success');

const currentComponent = computed(() => {
    switch (countPages.value) {
        case 1:
            return UserInformation;
        case 2:
            return StudentСard;
        case 3:
            return RegistrationSummary;
        default:
            return null;
    }
});

const handleClick = async () => {
    if (currentForm.value) {
        const isFormValid = await currentForm.value.validateForm();
        if (!isFormValid) {
            console.log('Форма содержит ошибки');
            return;
        }
    }

    if (countPages.value === 3) {
        try {
            await authStore.register();
            await authStore.postPhoto();
            if (authStore.student_id) {
                await authStore.submitAll();
            }
            router.push({ name: "sending-questionnaire" })
        } catch (error) {
            console.error("Ошибка:", error);
        }
    } else {
        nextPage();
    }
};

const handleClickLogin = () => {
    if (countPages.value === 1) {
        router.push({ name: 'login' });
    } else {
        prevStep();
    }
};

const handleFileSelected = (file) => {
    authStore.setStudentCardPhoto(file);
};

const nextPage = () => {
    if (countPages.value < 3) {
        countPages.value++;
    }
};

const prevStep = () => {
    if (countPages.value > 1) {
        countPages.value--;
    }
};

onMounted(() => {
    authStore.referralCode();
});
</script>