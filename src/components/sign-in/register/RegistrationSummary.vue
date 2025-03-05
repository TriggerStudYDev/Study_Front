<!-- src/components/sign-in/register/RegistrationSummary.vue -->
<template>
    <div>
        <div class="grid grid-cols-1 gap-4 mt-8">
            <select v-model="selectDicsipline"
                class="px-6 py-3 border bg-transparent border-[#BFBFBF] rounded-lg text-[#BFBFBF] font-medium focus:outline-none">
                <option value="" disabled>
                    Какие дисциплины вы решаете
                </option>
                <option v-for="forms in descipline" :key="forms.id" :value="forms.id">
                    {{ forms.name }}
                </option>
            </select>
            <input class="px-6 py-3 border border-[#BFBFBF] rounded-lg text-[#BFBFBF] font-medium focus:outline-none"
                type="text" placeholder="О себе" v-model="authStore.data.student_card.about_self">
            <LoadingFilesForRegistration>
                <template #input>
                    <input
                        class="w-full px-6 py-3 border border-[#BFBFBF] rounded-lg text-[#BFBFBF] font-medium focus:outline-none"
                        type="text" :placeholder="!fileSelected ? 'Отзывы заказчиков' : 'Выбран файл: ' + fileName">
                    <span class="text-TeriaryDark text-xs font-medium px-4 mt-1">Подсказка PNG, JPG</span>
                </template>
            </LoadingFilesForRegistration>
            <LoadingFilesForRegistration>
                <template #input>
                    <input
                        class="w-full px-6 py-3 border border-[#BFBFBF] rounded-lg text-[#BFBFBF] font-medium focus:outline-none"
                        type="text" :placeholder="!fileSelected ? 'Портфолио' : 'Выбран файл: ' + fileName">
                    <span class="text-TeriaryDark text-xs font-medium px-4 mt-1">Подсказка PNG, JPG</span>
                </template>
            </LoadingFilesForRegistration>
        </div>
    </div>
</template>

<script setup>
import LoadingFilesForRegistration from '@/ui/LoadingFilesForRegistration.vue';
import { useAuthStore } from '@/stores/useAuthStore';
import { computed, onMounted, ref, watch } from 'vue';
import UserDataService from "@/services/UserDataService";


const authStore = useAuthStore();
const descipline = ref([])
const selectDicsipline = ref('')
const selectedDepartment = computed(() => authStore.selectedDepartment)
const emit = defineEmits(['update:isValid']);

watch([selectDicsipline], () => {
    authStore.data.profile.disciplines = [Number(selectDicsipline.value)];
})

const isFormValid = () => {
    return descipline.value.length > 0;
}

const fetchDiscipline = async () => {
    try {
        await UserDataService.getDisciplines(selectedDepartment.value).then((response) => {
            descipline.value = response.data.results || [];
        });
    } catch (error) {
        console.error('Ошибка загрузки дисциплин:', error);
        descipline.value = [];
    }
}

onMounted(() => {
    fetchDiscipline();
})
</script>