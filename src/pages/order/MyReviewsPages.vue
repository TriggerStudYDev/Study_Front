<template>
    <div class="max-w-[800px] mx-auto">
        <h1 class="text-4xl font-semibold">Мои отзывы</h1>
        <div class="flex flex-col gap-y-[30px] mt-8">
            <Reviews v-for="reviews in reviews" :key="reviews.id" :reviews="reviews" />
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from '@/stores';
import Reviews from '@/ui/Reviews.vue';

const useStore = useUserStore();
const reviews = useStore.reviews
</script>