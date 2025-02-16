<template>
    <div class="h-[300px] border border-black p-5 rounded-2xl">
        <div class="flex justify-between items-center">
            <div class="flex gap-x-1">
                <img v-for="starIndex in 5" :key="starIndex"
                    :src="starIndex <= reviews.rating ? '/image/profile/star.svg' : '/image/profile/Star_null.svg'"
                    alt="star">
            </div>
            <span>{{ reviews.data }}</span>
        </div>
        <div class="mt-2">
            <h3 class="text-[#8C8C8E]">{{ reviews.subject }}</h3>
            <h2 class="text-xl">{{ reviews.title }}</h2>
            <p class="mt-4 leading-5">{{ reviews.text }}</p>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    reviews: {
        type: Object,
        required: true
    }
})
</script>