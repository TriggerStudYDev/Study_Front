<template>
    <div>
        <div>
            <h2 class="text-2xl font-medium">Капитан</h2>
            <div class="flex items-center gap-x-3 mt-5">
                <div class="relative">
                    <img class="w-[60px]" :src="card.imageUser" alt="LogoUser">
                    <span
                        class="flex text-[8px] absolute bottom-0 left-3 px-1.5 py-0.5 bg-white rounded-lg gap-x-0.5"><img
                            src="/image/communities/Star.svg" alt="">{{
                                card.captain[0].rating
                            }}</span>
                </div>
                <div>
                    <h3>{{ card.captain[0].name }}</h3>
                    <span class="text-[#8C8C8E]">{{ card.captain[0].sybject }}</span>
                </div>
            </div>
        </div>
        <div>
            <h2 class="text-2xl font-medium">Команда</h2>
            <div v-for="card in card.team" :key="card.id">

                <div class="flex items-center gap-x-3 mt-5">
                    <div class="relative">
                        <img class="w-[60px]" :src="card.imageUser" alt="LogoUser">
                        <span
                            class="flex text-[8px] absolute bottom-0 left-3 px-1.5 py-0.5 bg-white rounded-lg gap-x-0.5"><img
                                src="/image/communities/Star.svg" alt="">{{
                                    card.rating
                                }}</span>
                    </div>
                    <div>
                        <h3>{{ card.name }}</h3>
                        <span class="text-[#8C8C8E]">{{ card.sybject }}</span>
                    </div>
                </div>
                <LineHR class="my-4" />
            </div>
        </div>
    </div>
</template>

<script setup>
import LineHR from '@/ui/LineHR.vue';
defineProps({
    card: {
        type: Object,
        required: true
    }
})
</script>