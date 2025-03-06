<template>
    <div>
        <div class="grid grid-cols-3 gap-x-[30px]">
            <QuestionnaireCard v-for="card in card" :key="card.id" :card="card" />
        </div>
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
        desctiption: 'ФИО, почта'
    },
    {
        id: 2,
        backgroundImage: '/image/questionnaire/Card_ankety-image-2.png',
        iconImage: '/image/questionnaire/university.svg',
        title: 'Учебная информация',
        desctiption: 'Студенческий, курс, факультет'
    },
    {
        id: 3,
        backgroundImage: '/image/questionnaire/Card_ankety-image-3.png',
        iconImage: '/image/questionnaire/star.svg',
        title: 'Навыки и достижеения',
        desctiption: 'Дисциплины, навыки, портфолио'
    }
]
</script>
