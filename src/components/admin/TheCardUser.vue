<!-- src/widgets/TheCardUser.vue -->
<template>
    <div class="bg-[#8C8C8E14] rounded-2xl cursor-pointer">
        <div class="px-4">
            <div class="flex flex-col items-center mt-10 px-6">
                <img src="/image/avatar/LogoUser.png" alt="Logo">
                <h1 class="mt-2 text-xl font-medium text-center">{{ user.user.first_name + ' ' +
                    user.user.last_name.charAt(0) + '.' || 'Не указан' }}
                </h1>
                <p class="mt-1 text-[#8C8C8E]">{{ user.user.role }}</p>
            </div>
        </div>
        <hr class="h-[1px] w-full bg-[#D9D9D9] mt-[30px]">
        <div class="flex flex-col items-center py-4">
            <div class="flex items-center gap-x-2">
                <img :src="statusLogo" alt="Status">
                <span class="text-sm font-medium">{{ user.status }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStudentCardStore } from '@/stores/useStudentCardStore';


const studentCardStore = useStudentCardStore();


const emit = defineEmits(['open-modal'])

const props = defineProps({
    user: {
        type: Object,
        required: true
    }
})

const statusLogo = computed(() => {
    if (!studentCardStore.studentCard.results) {
        return '/image/state/Unreviewed.svg';
    }

    const status = studentCardStore.studentCard.results.find(user => user.id === props.user.id).status;

    switch (status) {
        case 'Принят':
            return '/image/state/Accepted.svg';
        case 'rejected':
            return '/image/state/Rejected.svg';
        case 'На проверке':
            return '/image/state/Postponed.svg';
        default:
            return '/image/state/Unreviewed.svg';
    }
})
</script>