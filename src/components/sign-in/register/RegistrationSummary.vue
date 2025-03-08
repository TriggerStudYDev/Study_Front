<!-- src/components/sign-in/register/RegistrationSummary.vue -->
<template>
    <div>
        <div class="grid grid-cols-1 gap-4 mt-8">
            <!-- Заменяем <select multiple> на DisciplineSelector -->
            <div class="flex flex-col">
                <DisciplineSelector v-model="selectDicsipline" :disciplines="descipline"
                    placeholder="Какие дисциплины вы решаете" :error="errors.selectDicsipline" />
                <span v-if="errors.selectDicsipline" class="text-red-500 text-sm">
                    {{ errors.selectDicsipline }}
                </span>
            </div>

            <div class="flex flex-col">
                <textarea
                    class="px-6 py-3 border border-[#BFBFBF] rounded-lg text-[#BFBFBF] font-medium focus:outline-none resize-none"
                    :class="{ 'border-red-500': errors.about_self }" placeholder="О себе"
                    v-model="authStore.data.student_card.about_self" rows="4"></textarea>
                <span v-if="errors.about_self" class="text-red-500 text-sm mt-1">Введите о себе</span>
            </div>

            <LoadingFilesForRegistration fileType="reviews" @file-selected="handleFileSelected" />
            <LoadingFilesForRegistration fileType="portfolio" @file-selected="handleFileSelected" />
        </div>
    </div>
</template>

<script setup>
import LoadingFilesForRegistration from '@/ui/LoadingFilesForRegistration.vue';
import { useAuthStore } from '@/stores/useAuthStore';
import { computed, onMounted, ref } from 'vue';
import UserDataService from "@/services/UserDataService";
import DisciplineSelector from '@/components/sign-in/widgets/DisciplineSelector.vue'; // Импортируем компонент

const authStore = useAuthStore();
const descipline = ref([]);
const selectDicsipline = ref([]); // Теперь это массив
const errors = ref({
    selectDicsipline: '',
    about_self: '',
    reviews: '',
    portfolio: '',
});

const validateForm = () => {
    errors.value = {
        selectDicsipline: selectDicsipline.value.length === 0 ? 'Выберите дисциплину' : '',
        about_self: !authStore.data.student_card.about_self.trim() ? 'Введите о себе' : '',
    };

    return !Object.values(errors.value).some(error => error);
};

defineExpose({ validateForm });

onMounted(() => {
    fetchDiscipline();
});

const handleFileSelected = (files, fileType) => {
    if (fileType === 'reviews') {
        authStore.data.reviews = [...authStore.data.reviews, ...files]; // Добавляем файлы
    } else if (fileType === 'portfolio') {
        authStore.data.portfolio = [...authStore.data.portfolio, ...files];
    }
};

const fetchDiscipline = async () => {
    try {
        await UserDataService.getDisciplines(authStore.selectedDepartment).then((response) => {
            descipline.value = response.data.results || [];
        });
    } catch (error) {
        // console.error('Ошибка загрузки дисциплин:', error);
        descipline.value = [];
    }
};
</script>