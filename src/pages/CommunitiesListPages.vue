<template>
    <div class="max-w-[800px] mx-auto">
        <CommunitiesHeader />
        <CommunitiesCard class="mt-8" v-for="card in card" :key="card.id" :card="card" />
    </div>
</template>

<script setup>
import CommunitiesHeader from '@/widgets/CommunitiesHeader.vue';
import CommunitiesCard from '@/widgets/CommunitiesCard.vue';
import { useUserStore } from '@/stores';

const useStore = useUserStore();
const card = useStore.CommunititesCards;
</script>