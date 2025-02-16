<template>
    <div class="flex gap-x-[30px] cursor-pointer" @click="goToDetailedPage">
        <img :src="card.image" alt="Logo" loading="lazy">
        <div class="w-full">
            <div class="flex items-center justify-between">
                <h3 class="text-3xl font-medium">{{ card.title }}</h3>
                <div class="flex items-center gap-x-3">
                    <span class="flex items-center gap-x-1 text-xl font-medium">{{ card.rating }} <img
                            src="/image/communities/StarGray.svg" alt="StarGray"></span>
                    <button><img src="/image/communities/heart.svg" alt=""></button>
                </div>
            </div>
            <p class="mt-4">{{ card.description }}</p>
            <Statistics :card="card" />
        </div>
    </div>
</template>

<script setup>
import Statistics from '@/ui/StatisticsCommunitiesCard.vue'
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps({
    card: {
        type: Object,
        required: true
    }
})

const goToDetailedPage = () => {
    router.push({
        name: 'communities-page',
        params: { id: props.card.id }
    })
}
</script>