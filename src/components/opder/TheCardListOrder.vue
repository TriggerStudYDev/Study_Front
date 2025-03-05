<template>
    <ButtonTransitionOrderPage :card="card">
        <div class="flex flex-col p-4 cursor-pointer">
            <img class="w-[214px] h-[194px]" :src="card.image" alt="Image" loading="lazy">
            <div class="mt-4">
                <h3 class="text-xl font-semibold">{{ card.title }}</h3>
                <div class="flex justify-between items-center mt-3">
                    <span class="flex items-center gap-x-2"><img src="/image/works/Calendar.svg" alt="Calendar">
                        Дедлайн:</span>
                    <span>12.12.2023</span>
                </div>
                <div class="flex justify-between items-center mt-2">
                    <img src="/image/works/Circle.svg" alt="Circle">
                    <span>12 часов</span>
                </div>
                <ProfileForCard class="mt-4" :card="card" />
            </div>
        </div>
    </ButtonTransitionOrderPage>
</template>

<script setup>
import ProfileForCard from '@/ui/ProfileForCard.vue';
import ButtonTransitionOrderPage from '@/ui/ButtonTransitionOrderPage.vue';
defineProps({
    card: {
        type: Object,
        required: true
    }
})
</script>