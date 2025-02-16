<template>
    <div class="max-w-[357px]">
        <slot></slot>
        <input type="file" class="" @change="handlerFileChange">
        <div
            class="flex flex-col justify-center items-center p-8 border-dashed border-2 border-[#8C8C8E] rounded-2xl mt-2">
            <img src="/image/auth/Vector.svg" alt="Download" loading="lazy">
            <p class="text-center font-medium">Перетаскивайте файлы сюда или нажмите, чтобы загрузить.</p>
        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const handlerFileChange = (event) => {
    const file = event.target.files[0];
    authStore.data.student_card.photo = file;
}
</script>