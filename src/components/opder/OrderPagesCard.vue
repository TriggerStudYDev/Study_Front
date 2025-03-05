<template>
    <div>
        <img class="w-full h-[194px] rounded-2xl bg-auto bg-center bg-no-repeat" :src="card.image" alt="Background">
        <div class="flex justify-between mt-5 items-center">
            <h2 class="text-3xl font-medium">{{ card.title }}</h2>
            <span class="text-2xl font-semibold">{{ card.price }} ₽</span>
        </div>
        <p class="mt-4">{{ card.description }}</p>
        <LineHR />
        <OrderPagesCardDates />
        <LineHR />
        <ProfileForCard :card="card" />
        <LineHR />
        <div class="flex justify-end">
            <button class="px-8 py-3 bg-black text-white text-xl rounded-lg">Начать выполение</button>
        </div>
    </div>
</template>

<script setup>
import OrderPagesCardDates from './OrderPagesCardDates.vue';
import ProfileForCard from '@/ui/ProfileForCard.vue';
import LineHR from '@/ui/LineHR.vue';

const props = defineProps({
    card: {
        type: Object,
        required: true
    }
});
</script>