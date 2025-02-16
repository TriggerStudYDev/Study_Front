<template>
    <div class="flex gap-x-[30px]">
        <div class="max-w-[547px]">
            <img class="w-[547px] h-[228px] rounded-2xl" :src="card.image" alt="Background" loading="lazy">
            <div class="flex justify-between mt-6">
                <h1>{{ card.title }}</h1>
                <button><img src="/image/communities/heart.svg" alt="heart"></button>
            </div>
            <p>{{ card.description }}</p>
            <StatisticsCommunitiesCard :card="card" />
            <CommunitiesPriceCard :card="card" />
            <div>
                <h2 class="text-3xl font-medium mt-5">Описание</h2>
                <p class="mt-4 text-[#8C8C8E]">{{ card.description }}</p>
            </div>
        </div>
        <CommunitiesMemberCard :card="card" />
    </div>
</template>

<script setup>
import StatisticsCommunitiesCard from '@/ui/StatisticsCommunitiesCard.vue';
import CommunitiesPriceCard from '@/components/CommunitiesPriceCard.vue';
import CommunitiesMemberCard from '@/components/CommunitiesMemberCard.vue';

defineProps({
    card: {
        type: Object,
        required: true
    }
})
</script>