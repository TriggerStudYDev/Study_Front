<!-- src/widgets/CustomerProfileHeader.vue -->
<template>
    <div v-if="user" class="flex justify-between items-center">
        <div class="flex gap-x-5 items-center">
            <img class="w-[100px]" v-if="user.imageUser" :src="user.imageUser" alt="User Avatar" loading="lazy">
            <div>
                <h2 class="text-2xl font-medium" v-if="user.nameUser">{{ user.nameUser }}</h2>
                <span class="flex gap-x-2 mt-2" v-if="user.rating"><img src="/image/works/star.svg" alt="Star">{{
                    user.rating
                }}</span>
                <div class="flex gap-x-2 mt-2">
                    <span v-for="card in work" :key="card.id"
                        class="px-4 py-1 text-sm bg-[#AFB9BB] rounded-2xl text-black">{{
                            card.meaning }}</span>
                </div>
            </div>
        </div>
        <div class="flex gap-x-4 items-center">
            <button><img src="/image/profile/Danger.svg" alt="Danger"></button>
            <button><img src="/image/profile/heart.svg" alt="heart"></button>
            <button @click="goToCustomerProfileMessage"
                class="px-8 py-3 bg-black text-white rounded-lg text-xl font-medium">Написать</button>
        </div>
    </div>
    <div v-else>
        Загрузка данных пользователя...
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps({
    user: {
        type: Object,
        required: true
    },
    work: {
        type: Array,
        required: true
    }
})

const goToCustomerProfileMessage = () => {
    router.push({
        name: 'customerProfile-messages',
        params: { id: props.user.id }
    })
}
</script>
