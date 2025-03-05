<template>
    <div class="bg-[#D9D9D9] py-[30px] px-8 rounded-2xl h-full flex flex-col">
        <div class="flex flex-col items-center">
            <div class="flex items-end ml-10">
                <img class="w-[102px]" src="/image/works/user.svg" alt="Logo">
                <p class="flex gap-x-1">8,4 <img src="/image/works/star.svg" alt="star"></p>
            </div>
        </div>
        <h3 class="text-center text-2xl font-semibold mt-3.5">{{ user[0].user.first_name + ' ' + user[0].user.last_name
            || 'Не указан' }}</h3>
        <div class="flex justify-center items-center gap-x-2 mt-2">
            <span v-for="card in work" :key="card.id" class="px-4 py-1 text-sm bg-[#AFB9BB] rounded-2xl text-black">{{
                card.meaning }}</span>
        </div>
        <div class="bg-white inline-flex rounded-2xl mt-9" style="width: fit-content;">
            <button class="px-10 py-2 bg-black rounded-2xl text-white text-xl">Дедлайны</button>
            <button class="px-10 py-2 rounded-2xl text-black text-xl">Входяшие</button>
        </div>
        <div class="flex-grow mt-20">
            <img class="w-full" src="/image/charts/Ellipse16.png" alt="Изображение">
            <h2 class="mt-5 text-xl">У вас еще нет ни одного заказа</h2>
        </div>
        <button @click="$router.push('/listOrders')"
            class="w-full py-3 bg-white rounded-lg text-xl font-medium text-black mt-9">Найти заказы</button>
    </div>
</template>

<script setup>
import { useUserProfileStore } from '@/stores/useUserProfileStore';
import { onMounted, computed } from 'vue';

const useProfile = useUserProfileStore();
const user = computed(() => useProfile.profile);

onMounted(() => {
    useProfile.getProfile();
});


const work = [
    {
        id: 1,
        meaning: 'Активные: 130'
    },
    {
        id: 2,
        meaning: 'Всего: 130'
    },
    {
        id: 3,
        meaning: 'Входящие: 130'
    }
]
</script>