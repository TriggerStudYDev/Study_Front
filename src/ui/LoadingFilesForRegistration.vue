<!-- src/LoadingFilesForRegistration.vue -->
<template>
    <div>
        <slot name="input">
            <div class="flex flex-col">
                <input
                    class="px-6 py-3 border border-[#BFBFBF] rounded-lg text-[#BFBFBF] font-medium focus:outline-none"
                    type="text" :value="inputValue" :placeholder="placeholder" :disabled="true">
                <span class="px-4 mt-1 text-xs font-medium text-TeriaryDark">Подсказка PNG, JPG</span>
            </div>
        </slot>
        <input type="file" class="hidden" @change="handleFileChange" accept="image/*,.pdf" ref="fileInput" multiple>
        <div class="flex flex-col items-center justify-center p-4 mt-2 cursor-pointer" @click="$refs.fileInput.click()">
            <p class="flex items-center gap-x-2 text-center font-medium text-[#8C8C8E]">
                Добавить файл
                <img src="/image/auth/plus1.svg">
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    placeholder: { type: String, default: 'Загрузите файл' },
    fileType: { type: String, required: true },
});

const emit = defineEmits(['file-selected']);
const fileInput = ref(null);
const fileSelected = ref(false);
const fileName = ref('');

const inputValue = computed(() => {
    return fileSelected.value ? `Выбрано файлов: ${fileName.value}` : '';
});

const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
        fileSelected.value = true;
        fileName.value = files.length;
        emit('file-selected', files, props.fileType);
    }
    event.target.value = ''
};
</script>