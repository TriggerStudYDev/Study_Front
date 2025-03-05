<template>
    <div class="">
        <input type="file" class="hidden" @change="handleFileChange" accept="image/*,.pdf" ref="fileInput">
        <div class="px-6 py-3 border bg-transparent border-[#BFBFBF] rounded-lg text-[#BFBFBF] font-medium focus:outline-none cursor-pointer"
            @click="$refs.fileInput.click()">
            <p class=" text-TeriaryDark">
                <span v-if="!fileSelected">Фото студенческого</span>
                <span v-else class="text-TeriaryDark">
                    Выбран файл: {{ fileName }}
                </span>
            </p>
        </div>
        <span class="text-TeriaryDark text-xs font-medium px-4 mt-1">Подсказка PNG, JPG</span>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore';

const authStore = useAuthStore();
const fileInput = ref(null);
const fileSelected = ref(false);
const fileName = ref('');

const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        // Валидация размера файла (пример для 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('Файл слишком большой. Максимальный размер: 5MB');
            return;
        }

        // Валидация типа файла
        const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        if (!allowedTypes.includes(file.type)) {
            alert('Недопустимый формат файла');
            return;
        }

        authStore.setStudentCardPhoto(file);
        fileSelected.value = true;
        fileName.value = file.name;
    }
};
</script>