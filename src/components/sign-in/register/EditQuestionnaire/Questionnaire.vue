<!-- src/components/sign-in/register/EditQuestionnaire/Questionnaire.vue -->
<template>
    <div class="flex flex-col items-center">
        <div class="grid grid-cols-3 gap-x-[30px] mt-6">
            <QuestionnaireCard v-for="(card, index) in card" :key="card.id" :card="card"
                :class="`animate-down delay-${index}`" @open-modal="openModal" />
        </div>
        <button
            class="col-span-3 px-8 py-3 text-xl font-medium leading-7 text-white rounded-lg bg-AccentViolet mt-[30%]">Отправить
            на проверку</button>
    </div>
</template>

<script setup>
import QuestionnaireCard from '@/components/sign-in/register/EditQuestionnaire/QuestionnaireCard.vue';

const card = [
    {
        id: 1,
        backgroundImage: '/image/questionnaire/Card_ankety-image-1.png',
        iconImage: '/image/questionnaire/personal.svg',
        title: 'Твои данные',
        desctiption: 'ФИО, почта',
        openModal: 'UserInfo',
    },
    {
        id: 2,
        backgroundImage: '/image/questionnaire/Card_ankety-image-2.png',
        iconImage: '/image/questionnaire/university.svg',
        title: 'Учебная информация',
        desctiption: 'Студенческий, курс, факультет',
        openModal: 'ProfileInfo',
    },
    {
        id: 3,
        backgroundImage: '/image/questionnaire/Card_ankety-image-3.png',
        iconImage: '/image/questionnaire/star.svg',
        title: 'Навыки и достижеения',
        desctiption: 'Дисциплины, навыки, портфолио',
        openModal: 'Skill',
    },
];

// Передача события открытия модального окна
const openModal = (modalName) => {
    emit('open-modal', modalName);
};

const emit = defineEmits(['open-modal']);
</script>

<style scoped>
@keyframes slide-up {
    from {
        transform: translateY(100%);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.animate-down {
    animation: slide-up 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    opacity: 0;
}

.delay-0 {
    animation-delay: 0.2s;
}

.delay-1 {
    animation-delay: 0.4s;
}

.delay-2 {
    animation-delay: 0.6s;
}
</style>