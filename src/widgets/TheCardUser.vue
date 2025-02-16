<!-- src/widgets/TheCardUser.vue -->
<template>
    <div class="p-4 pb-8 bg-[#8C8C8E14] rounded-2xl">
        <img :src="statusLogo" alt="Status">
        <div class="flex flex-col items-center mt-10 px-6">
            <img :src="user.image" alt="Logo">
            <h1 class="mt-2 text-2xl font-semibold">{{ user.name }}</h1>
            <p class="mt-1 text-[#8C8C8E]">{{ user.jobTitle }}</p>
            <button @click="$emit('open-modal', user)" class="mt-14 px-8 py-3 bg-black rounded-lg text-white">
                Просмотреть заявку
            </button>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const emit = defineEmits(['open-modal'])
const props = defineProps({
    user: {
        type: Object,
        required: true
    }
})

const statusLogo = computed(() => {
    switch (props.user.state) {
        case 'Accepted':
            return '/image/state/Accepted.svg';
        case 'rejected':
            return '/image/state/Rejected.svg';
        case 'postponed':
            return '/image/state/Postponed.svg';
        default:
            return '/image/state/Unreviewed.svg';
    }
})
</script>