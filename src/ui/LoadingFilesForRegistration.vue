    <template>
        <div>
            <slot name="input">
                <div class="flex flex-col">
                    <input
                        class="px-6 py-3 border border-[#BFBFBF] rounded-lg text-[#BFBFBF] font-medium focus:outline-none"
                        type="text" :placeholder="!fileSelected ? 'Отзывы заказчиков' : 'Выбран файл: ' + fileName">
                    <span class="text-TeriaryDark text-xs font-medium px-4 mt-1">Подсказка PNG, JPG</span>
                </div>
            </slot>
            <slot name="button">
                <input type="file" class="hidden" @change="handleFileChange" accept="image/*,.pdf" ref="fileInput">

            </slot>
            <div class="flex flex-col justify-center items-center p-4 mt-2 cursor-pointer"
                @click="$refs.fileInput.click()">
                <p class="flex items-center gap-x-2 text-center font-medium text-[#8C8C8E]">
                    Добавить файл
                    <img src="/image/auth/plus1.svg">
                </p>
            </div>
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