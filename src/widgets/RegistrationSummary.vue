<template>
    <div>
        <div class="flex flex-col gap-y-4">
            <input class="w-[356px] px-6 py-3 bg-[#D9D9D9] rounded-lg text-[#8C8C8E] font-medium focus:outline-none"
                type="text" placeholder="Какие дисциплины решаете?">
            <input class="w-[356px] px-6 py-3 bg-[#D9D9D9] rounded-lg text-[#8C8C8E] font-medium focus:outline-none"
                type="text" placeholder="О себе">
        </div>
    </div>
    <div class="mt-4 flex flex-col gap-y-4">
        <LoadingFilesForRegistration>
            <h4>Поделитесь отзывами ваших заказчиков</h4>
        </LoadingFilesForRegistration>
        <LoadingFilesForRegistration>
            <h4>Прикрепите материалы ваших работ</h4>
        </LoadingFilesForRegistration>
    </div>
</template>

<script setup>
import LoadingFilesForRegistration from '@/ui/LoadingFilesForRegistration.vue';
import { useAuthStore } from '@/stores/auth';
import { watch } from 'vue';

const authStore = useAuthStore();
console.log(authStore.user, authStore.profile, authStore.student_card);

</script>