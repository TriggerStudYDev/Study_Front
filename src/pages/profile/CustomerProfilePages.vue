<!-- src/pages/CustomerProfilePages.vue -->
<template>
    <div class="max-w-[800px] mx-auto">
        <CustomerProfileHeader :work="work" :user="user" />
        <p class="mt-6 text-lgs" v-if="user">{{ user.description }}</p>
        <div class="mt-8 flex justify-end gap-x-4">
            <button @click="previousPage"><img src="/image/works/left.svg" alt="Left"></button>
            <button @click="nextPage"><img src="/image/works/Right.svg" alt="Right"></button>
        </div>
        <div class="grid grid-cols-2 gap-x-[30px] mt-[70px]">
            <Reviews v-for="card in displayedReviews" :key="card.id" :reviews="card" />
        </div>
    </div>
</template>

<script setup>
import CustomerProfileHeader from '@/components/profile/CustomerProfileHeader.vue';
import Reviews from '@/ui/Reviews.vue';
import { useUserStore } from '@/stores';
import { ref, onMounted, computed } from 'vue';

const props = defineProps({
    id: {
        type: String,
        required: true
    }
})
const useStore = useUserStore();
const reviews = useStore.reviews
const user = ref(null);
const currentPage = ref(1);
const pageSize = 2;

const displayedReviews = computed(() => {
    const startIndex = (currentPage.value - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return reviews.slice(startIndex, endIndex);
})

const nextPage = () => {
    if (currentPage.value * pageSize < reviews.length) {
        currentPage.value++;
    }
}

const previousPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
}

const work = [
    {
        id: 1,
        meaning: 'Успешные: 130'
    },
    {
        id: 2,
        meaning: 'Не успешные: 130'
    },
]

onMounted(async () => {
    const store = useUserStore();
    user.value = store.listOrderCards.find(c => c.id === +props.id);
})
</script>