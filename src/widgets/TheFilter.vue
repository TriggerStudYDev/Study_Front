<template>
    <div class="flex justify-between">
        <div class="flex items-center">
            <UserLogo v-for="(user) in displayedUsers" :key="user.id" :user="user" />
            <div v-if="remainingUsers > 0" class="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200">
                <span class="text-sm font-medium text-[#AFB9BB]">+{{ remainingUsers }}</span>
            </div>
        </div>
        <div class="flex gap-x-5 ">
            <blockquote>
                <select class="bg-white">
                    <option>Статус</option>
                    <option>Все</option>
                    <option>В работе</option>
                    <option>Отложенные</option>
                </select>
            </blockquote>

            <blockquote>
                <select class="bg-white">
                    <option>Сортировка</option>
                    <option>Приоритет</option>
                    <option>Низкий</option>
                    <option>Средний</option>
                </select>
            </blockquote>
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from '@/stores';
import { computed } from 'vue';

const userStore = useUserStore();
const users = userStore.listUsers
import UserLogo from './UserLogo.vue';

const displayedUsers = computed(() => {
    return users.slice(0, 5)
})

const remainingUsers = computed(() => {
    return users.length - 5 > 0 ? users.length - 5 : 0;
})
</script>