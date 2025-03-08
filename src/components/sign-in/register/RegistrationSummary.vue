<template>
    <div>
        <div class="grid grid-cols-1 gap-4 mt-8">
            <select v-model="selectDicsipline"
                class="px-6 py-3 border bg-transparent border-[#BFBFBF] rounded-lg text-[#BFBFBF] font-medium focus:outline-none">
                <option value="" disabled>Какие дисциплины вы решаете</option>
                <option v-for="forms in descipline" :key="forms.id" :value="forms.id">{{ forms.name }}</option>
            </select>
            <input class="px-6 py-3 border border-[#BFBFBF] rounded-lg text-[#BFBFBF] font-medium focus:outline-none"
                type="text" placeholder="О себе" v-model="authStore.data.student_card.about_self">
            <LoadingFilesForRegistration fileType="reviews" placeholder="Отзывы заказчиков"
                @file-selected="handleFileSelected" />
            <LoadingFilesForRegistration fileType="portfolio" placeholder="Портфолио"
                @file-selected="handleFileSelected" />
        </div>
    </div>
</template>

<script setup>
import LoadingFilesForRegistration from '@/ui/LoadingFilesForRegistration.vue';
import { useAuthStore } from '@/stores/useAuthStore';
import { computed, onMounted, ref } from 'vue';
import UserDataService from "@/services/UserDataService";

const authStore = useAuthStore();
const descipline = ref([]);
const selectDicsipline = ref('');
const errors = ref({
    selectDicsipline: '',
    about_self: '',
    reviews: '',
    portfolio: '',
});

const validateForm = () => {
    errors.value.selectDicsipline = !selectDicsipline.value;
    errors.value.about_self = !authStore.data.student_card.about_self;
    errors.value.reviews = !authStore.data.student_card.reviews;
    errors.value.portfolio = !authStore.data.student_card.portfolio;

    return !Object.values(errors.value).some(error => error);
}

defineExpose({ validateForm });

onMounted(() => {
    fetchDiscipline();
});

const handleFileSelected = (file, fileType) => {
    authStore.data.rewiews[fileType] = file;
    authStore.data.portfolio[fileType] = file;
}

const fetchDiscipline = async () => {
    try {
        await UserDataService.getDisciplines(authStore.selectedDepartment).then((response) => {
            descipline.value = response.data.results || [];
        });
    } catch (error) {
        console.error('Ошибка загрузки дисциплин:', error);
        descipline.value = [];
    }
};
</script>