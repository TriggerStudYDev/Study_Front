<!-- src/components/Alllist.vue -->
<template>
    <div class="grid grid-cols-4 gap-8">
        <CardUser v-for="user in users" :key="user.id" :user="user" @open-modal="openModal(user)" />
    </div>
</template>

<script setup>
import CardUser from '@/widgets/TheCardUser.vue';
import { useUserStore } from '@/stores';

const userStore = useUserStore();
const users = userStore.listUsers;

const emit = defineEmits(['open-modal']);

const openModal = (user) => {
    emit('open-modal', user);
};
</script>