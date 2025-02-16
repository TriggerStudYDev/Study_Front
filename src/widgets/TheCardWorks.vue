<template>
    <div class="flex flex-col p-4">
        <img class="w-[353px] h-[194px] rounded-lg" :src="card.image" alt="Background" loading="lazy">
        <div class="mt-4">
            <h5 class="text-xl font-semibold">{{ card.title }}</h5>
            <div class="flex justify-between mt-4">
                <p class="flex flex-col text-xl font-semibold">Начало <span
                        class="text-base text-[#AFB9BB] font-normal">{{ card.DateStart }}</span></p>
                <img src="/image/works/refresh.svg" alt="Refresh" loading="lazy">
                <p class="flex flex-col text-xl font-semibold">Крайний срок <span
                        class="text-base text-[#AFB9BB] font-normal">{{ card.DateEnd
                        }}</span></p>
            </div>
            <ProfileForCard class="mt-4" :card="card" />
            <ButtonTransitionOrderPage :card="card" class="w-full">
                <template #default>
                    <button @click="goToOrderPage"
                        class="mt-8 w-full py-3 bg-black rounded-lg text-xl font-medium text-white">
                        Продолжить
                    </button>
                </template>
            </ButtonTransitionOrderPage>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import ProfileForCard from '@/ui/ProfileForCard.vue';
import ButtonTransitionOrderPage from '@/ui/ButtonTransitionOrderPage.vue';

const router = useRouter();
const props = defineProps({
    card: {
        type: Object,
        required: true
    }
})
</script>