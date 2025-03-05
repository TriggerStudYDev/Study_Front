<template>
    <div class="max-w-[800px] mx-auto">
        <MyOrdersHeader />
        <div class="mt-8 flex justify-end gap-x-4">
            <button @click="previousPage"><img src="/image/works/left.svg" alt="Left"></button>
            <button @click="nextPage"><img src="/image/works/Right.svg" alt="Right"></button>
        </div>
        <div class="grid grid-cols-2 gap-x-8 mt-3.5">
            <TheCardWorks v-for="card in displayedCards" :key="card.id" :card="card" />
        </div>
    </div>
</template>

<script setup>
import TheCardWorks from '@/components/profile/TheCardWorks.vue';
import MyOrdersHeader from '@/components/opder/MyOrdersHeader.vue';
import { useUserStore } from '@/stores';
import { computed, ref } from 'vue';

const userStore = useUserStore();
const cards = userStore.listOrderCards;
const currentPage = ref(1);
const pageSize = 2;

const displayedCards = computed(() => {
    const startIndex = (currentPage.value - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return cards.slice(startIndex, endIndex);
});


const nextPage = () => {
    if (currentPage.value * pageSize < cards.length) {
        currentPage.value++;
    }
}
const previousPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
}
</script>
