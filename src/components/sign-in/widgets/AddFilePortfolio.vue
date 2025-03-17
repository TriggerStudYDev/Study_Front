<!-- src/components/sign-in/widgets/AddFilePortfolio.vue -->
<template>
    <div>
        <input type="file" class="hidden" @change="handleFileChange" accept="image/*,.pdf" ref="fileInput" multiple>
        <slot name="input">
            <div class="flex flex-col" @click="$refs.fileInput.click()">
                <div class="flex items-center justify-between px-6 py-3 border border-[#BFBFBF] rounded-lg">
                    <input class=" text-[#BFBFBF] font-medium focus:outline-none" type="text" :value="inputValue"
                        :placeholder="placeholder" readonly>
                    <button @click="$refs.fileInput.click()"><img src="/image/modal/File_Download.svg" alt=""></button>
                </div>
                <span class="px-4 mt-1 text-xs font-medium text-TeriaryDark">Прикрепи фото студенческого хорошего
                    качества в формате PNG или JPEG</span>
            </div>
        </slot>

    </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore';

const props = defineProps({
    placeholder: { type: String, default: 'Портфолио' },
    fileType: { type: String, required: true },
});

const emit = defineEmits(['file-selected']);
const fileInput = ref(null);
const authStore = useAuthStore();
const fileSelected = ref(false);
const filesCount = ref(0);

const inputValue = computed(() => {
    return fileSelected.value ? `Выбрано файлов: ${filesCount.value}` : '';
});



const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
        // Валидация файлов
        const validFiles = files.filter(file => {
            if (file.size > 5 * 1024 * 1024) {
                alert('Файл слишком большой. Максимальный размер: 5MB');
                return false;
            }
            if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
                alert('Недопустимый формат файла');
                return false;
            }
            return true;
        });

        if (validFiles.length > 0) {
            authStore.setPortfolioPhoto(validFiles);
            fileSelected.value = true;
            filesCount.value = validFiles.length;
        }
    }
    event.target.value
}
</script>